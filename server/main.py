import uvicorn
from fastapi import FastAPI, Form, UploadFile
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from typing import Union
from datetime import datetime
from time import sleep
import schedule
from threading import Thread
import logging, sys, os, traceback
import pandas as pd
import matplotlib.pyplot as plt
from datamanagement.webuniprotcommunicator import WebUniProtCommunicator
from datamanagement.webuserinputreader import WebUserInputReader
from processors.webprocessor import WebProcessor
from processors.webpantherprocessor import WebPantherProcessor
import asyncio

logger = logging.getLogger('peeling')
#TODO: set level based on verbose option
logger.setLevel(logging.INFO)
#log_handler = logging.FileHandler('../log/log.txt')
log_handler = logging.StreamHandler()
log_handler.setFormatter(logging.Formatter('%(asctime)s | %(levelname)s: %(message)s'))
logger.addHandler(log_handler)
logger.info(f'\n{datetime.now()} Server starts')


uniprot_communicator = WebUniProtCommunicator()

app = FastAPI()

# for CORS, backend server allow these origins to send request and access the response
#TODO change origin to the frontend server orgin when deploy 
origins = ['http://localhost:8000', 'http://localhost:3000'] #8000 for old client, 3000 for react client
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)


coroutine_loop = asyncio.get_running_loop()

######## Background Thread ########
def update_task():
    coro = uniprot_communicator.update_data()
    future = asyncio.run_coroutine_threadsafe(coro, coroutine_loop)
    future.result()
    
def backgroud_update():
    update_task()
    #TODO
    #schedule.every().monday.at("01:00").do(uniprot_communicator.update_data)
    #schedule.every(1).minutes.do(update_task)
    schedule.every(1).days.do(update_task)
    while True:
        #logger.info(f'{datetime.now()} Background update...')
        logger.debug(schedule.get_jobs())
        schedule.run_pending()
        sleep(60)

daemon = Thread(target=backgroud_update, daemon=True, name='background_update')
daemon.start()



######## Main Thread ########

@app.get("/api/format/")
async def getFormats():
    logger.info('"/format/"')
    #To test error handling
    # formats = ['a','b']
    # formats += 1
    # return {'formats': formats}
    try:
        formats = list(plt.gcf().canvas.get_supported_filetypes().keys())
        return {'formats': formats}
    except Exception as e:
        logger.error(e)
        f = open('../log/log.txt','a')
        traceback.print_exc(file=f)
        f.close()
        return {'error': ', '.join(list(e.args))}


@app.post("/api/submit/")
async def handleSubmit(mass_file: UploadFile, controls: int = Form(), replicates: int = Form(), tolerance: Union[int, None] = Form(default=0), plot_format: Union[str, None] = Form(default='png')): # , conditions: Union[int, None] = Form(default=1)
    logger.info('"/submit/"')
    # return  '3cb1ce3f-6d8b-4a8c-b3d2-ab27ef5997ca', 0 #for home
    #return '6a7d5168-8c50-4592-b080-c7f57e5485df' # for work
    #To test error handling
    # start_time = datetime.now()
    # logger.info(f'{start_time} Analysis starts...')
    # user_input_reader = WebUserInputReader(mass_file, controls, replicates, tolerance, plot_format) #
    # processor = WebProcessor(user_input_reader, uniprot_communicator)
    # unique_id, failed_id_mapping = await processor.start()

    # end_time = datetime.now()
    # logger.info(f'{end_time} Analysis finished! time: {end_time - start_time}')
    # return {'resultsId': unique_id, 'failedIdMapping': failed_id_mapping} #failed_id_mapping
    try:
        # return {'resultsId': '111', 'failedIdMapping':0} # to test error handling
        start_time = datetime.now()
        logger.info(f'{start_time} Analysis starts...')
        user_input_reader = WebUserInputReader(mass_file, controls, replicates, tolerance, plot_format) #
        processor = WebProcessor(user_input_reader, uniprot_communicator)
        unique_id, failed_id_mapping = await processor.start()

        end_time = datetime.now()
        logger.info(f'{end_time} Analysis finished! time: {end_time - start_time}')
        return {'resultsId': unique_id, 'failedIdMapping': failed_id_mapping} #failed_id_mapping
    except Exception as e:
        logger.error(e)
        f = open('../log/log.txt','a')
        traceback.print_exc(file=f)
        f.close()
        return {'error': ', '.join(list(e.args))}


@app.get("/api/colnames/{unique_id}")
async def getColNames(unique_id:str):
    logger.info(f'"/colnames/{unique_id}"')
    try:
        response = {}
        path = os.path.join('../results/', unique_id)

        # get list of paths of plots
        plots = os.listdir(path+'/web_plots') 
        col_names = []
        for plot in plots:
            if plot[:3] == 'ROC':
                col_names.append(plot[4: -4])
        response['colNames'] = col_names
        return response
    except Exception as e:
        logger.error(e)
        f = open('../log/log.txt','a')
        traceback.print_exc(file=f)
        f.close()
        return {'error': ', '.join(list(e.args))}


@app.get("/api/heatmap/{unique_id}")
async def getHeatMap(unique_id:str):
    logger.info(f'"/heatmap/{unique_id}"')
    try:
        path = f'../results/{unique_id}/web_plots/Pairwise_Pearson_Correlation_Coefficient.png'
        return FileResponse(path, media_type='image/png')
    except Exception as e:
        logger.error(e)
        f = open('../log/log.txt','a')
        traceback.print_exc(file=f)
        f.close()
        return {'error': ', '.join(list(e.args))}


@app.get("/api/scatter/{unique_id}")
async def getScatterPlot(unique_id:str, x: str, y: str):
    logger.info(f'"/scatter/{unique_id}?x={x},y={y}"')
    try:
        # check if the plot has already been made
        plotTitle = f'Correlation {x} vs {y}'
        plotTitle = plotTitle.replace(" ", "_")
        path = f'../results/{unique_id}/web_plots/{plotTitle}.png'
        if not os.path.exists(path):
            processor = WebProcessor(unique_id, x, y)
            processor.plot_scatter()
        return FileResponse(path)
    except Exception as e:
        logger.error(e)
        f = open('../log/log.txt','a')
        traceback.print_exc(file=f)
        f.close()
        return {'error': ', '.join(list(e.args))}


# @app.get("/api/plotslist/{unique_id}")
# async def getPlotsList(unique_id:str):
#     logger.info(f'"/plotslist/{unique_id}"')
#     try:
#         response = {}
#         path = os.path.join('../results/', unique_id)

#         # get list of paths of plots
#         plots = os.listdir(path+'/web_plots') 
#         ratio_plots = []
#         roc_plots = []
#         for plot in plots:
#             if plot[:3] == 'ROC':
#                 roc_plots.append(plot)
#             elif plot[:7] == 'TPR_FPR':
#                 ratio_plots.append(plot)
#         response['ratioPlots'] = ratio_plots
#         response['rocPlots'] = roc_plots
#         return response
#     except Exception as e:
#         logger.error(e)
#         f = open('../log/log.txt','a')
#         traceback.print_exc(file=f)
#         f.close()
#         return {'error': ', '.join(list(e.args))}


@app.get("/api/plot/{unique_id}/{plot_name}")
async def getRatioPlot(unique_id:str, plot_name: str):
    logger.info(f'"/plot/{unique_id}/{plot_name}"')
    try:
        path = f'../results/{unique_id}/web_plots/{plot_name}'
        return FileResponse(path, media_type='image/png')
    except Exception as e:
        logger.error(e)
        f = open('../log/log.txt','a')
        traceback.print_exc(file=f)
        f.close()
        return {'error': ', '.join(list(e.args))}


@app.get("/api/proteins/{unique_id}")
async def getProteins(unique_id:str):
    logger.info(f'"/proteins/{unique_id}"')
    try:
        with open(f'../results/{unique_id}/results/post-cutoff-proteome.txt', 'r') as f:
                proteins = f.readline()
        proteins = proteins.split(',')
        return {'protein_list': proteins}
    except Exception as e:
        logger.error(e)
        f = open('../log/log.txt','a')
        traceback.print_exc(file=f)
        f.close()
        return {'error': ', '.join(list(e.args))}


# @app.get("/api/proteintable/{unique_id}")
# async def getProteinTable(unique_id:str):
#     logger.info(f'"/proteintable/{unique_id}"')
#     try:
#         path = f'../results/{unique_id}/results/post-cutoff-proteome.tsv'
#         results = pd.read_table(path, sep='\t', header=0)
#         results.set_index('Entry', inplace=True)
#         results = results.to_dict(orient='index')
#         return results
#     except Exception as e:
#         logger.error(e)
#         f = open('../log/log.txt','a')
#         traceback.print_exc(file=f)
#         f.close()
#         return {'error': ', '.join(list(e.args))}


@app.get("/api/proteinsorted/{unique_id}")
async def getProteinSorted(unique_id:str, column:str):
    logger.info(f'"/proteintable/{unique_id}?column={column}"')
    try:
        path = f'../results/{unique_id}/post-cutoff-proteome_with_raw_data.tsv'
        results = pd.read_table(path, sep='\t', header=0)
        kept_columns = results.columns[0] + [column] + ['Gene Names', 'Protein names', 'Organism', 'Length']
        print(kept_columns)
        results = results[kept_columns]
        results.sort_values(by=[column], ascending=False, inplace=True)
        results = results.iloc[:100, :]
        results = results.to_dict(orient='index')
        return results
    except Exception as e:
        logger.error(e)
        f = open('../log/log.txt','a')
        traceback.print_exc(file=f)
        f.close()
        return {'error': ', '.join(list(e.args))}


@app.get("/api/download/{unique_id}")
async def sendResultsTar(unique_id:str):
    logger.info('"/download/"')
    try:
        path = '../results/'+unique_id+'/results.zip'
        return FileResponse(path)
    except Exception as e:
        logger.error(e)
        f = open('../log/log.txt','a')
        traceback.print_exc(file=f)
        f.close()
        return {'error': ', '.join(list(e.args))}


@app.get("/api/organism/")
async def getOrganism():
    logger.info('"/organism/"')
    try:
        panther_processor = WebPantherProcessor(None, None)
        organism_dict = await panther_processor.retrieve_organisms()
        return organism_dict
    except Exception as e:
        logger.error(e)
        f = open('../log/log.txt','a')
        traceback.print_exc(file=f)
        f.close()
        return {'error': ', '.join(list(e.args))}


@app.get("/api/panther/{unique_id}")
async def runPantherEnrich(unique_id:str, organism_id:str):
    logger.info(f'"/panther/{organism_id}"')
    #print(unique_id, organism_id)
    if unique_id is None or organism_id is None:
        logger.error('Unique_id or organism_id is missing')
        return {'error': 'Unique_id or organism_id is missing'}
    
    try:
        panther_processor = WebPantherProcessor(organism_id, unique_id)
        results_dict = await panther_processor.start()
        return results_dict
    except Exception as e:
        logger.error(e)
        f = open('../log/log.txt','a')
        traceback.print_exc(file=f)
        f.close()
        return {'error': ', '.join(list(e.args))}


@app.get("/api/exportcached/")
async def exportCached():
    logger.info('"/exportcached/"')
    try:
        ids = uniprot_communicator.get_ids()
        ids.to_csv('../retrieved_data/latest_ids.tsv', sep='\t', index=False)
    except Exception as e:
        logger.error(e)
        f = open('../log/log.txt','a')
        traceback.print_exc(file=f)
        f.close()
        return {'error': ', '.join(list(e.args))}
        

def main():
    uvicorn.run(app, host="0.0.0.0", port=8000)
