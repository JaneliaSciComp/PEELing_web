import uvicorn
from fastapi import FastAPI, Form, UploadFile
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from typing import Union
from datetime import datetime, timedelta
from time import sleep
import schedule
from threading import Thread
import logging, os, traceback, shutil
import pandas as pd
import matplotlib.pyplot as plt
from datamanagement.webuniprotcommunicator import WebUniProtCommunicator
from datamanagement.webuserinputreader import WebUserInputReader
from processors.webprocessor import WebProcessor
from processors.webpantherprocessor import WebPantherProcessor
import asyncio

REQUESTES = ['format', 'submit', 'heatmap', 'scatter', 'plot', 'proteins', 'proteinssorted', 'download', 'organism', 'panther', 'cachedpanther', 'exampledata']

#set up logger
logger = logging.getLogger('peeling')
#TODO: set level based on verbose option
logger.setLevel(logging.INFO)
log_handler = logging.FileHandler('../log/log.txt') # to log to a file
# log_handler = logging.StreamHandler() # to log to console
log_handler.setFormatter(logging.Formatter('%(asctime)s | %(levelname)s: %(message)s')) # to print out source code location: %(pathname)s %(lineno)d: 
logger.addHandler(log_handler)
logger.info(f'\n{datetime.now()} Server starts')


uniprot_communicator = WebUniProtCommunicator()

app_usage = {}

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



######## Background Thread ########
coroutine_loop = asyncio.get_running_loop()

def update_and_log_usage():
    coro = uniprot_communicator.update_data()
    future = asyncio.run_coroutine_threadsafe(coro, coroutine_loop)
    future.result()
    log_usage()


def delete_user_results():
    try:
        files = os.listdir('../results')
        logger.info(f'{len(files)} files exist')
        count=0
        for f in files:
            path = f'../results/{f}'
            modify_time = os.path.getmtime(path)
            modify_time = datetime.fromtimestamp(modify_time)
            exist_time = datetime.now() - modify_time
            logger.debug(path)
            logger.debug(exist_time > timedelta(days=1)) 
            if exist_time > timedelta(days=1):
                shutil.rmtree(path, ignore_errors=True)
                count += 1
        logger.info(f'{count} files deleted')
    except Exception as e:
        logger.error(e)
        f = open('../log/log.txt','a')
        traceback.print_exc(file=f)
        f.close()


def log_usage():
    global app_usage
    file_path = '../log/app_usage.txt'
    # write column name
    if not os.path.exists(file_path):
        with open(file_path, 'w') as f:
            f.write('time\t')
            for col in REQUESTES:
                f.write(col+'\t')
            f.write('\n')

    # write request count for current period
    with open(file_path, 'a') as f: 
        f.write(str(datetime.now())+'\t')
        for col in REQUESTES:
            if col in app_usage:
                f.write(str(app_usage[col])+'\t')
            else:
                f.write('0\t')
        f.write('\n')
    
    logger.info('App usage writren')
    #refresh app_usage
    app_usage = {}

    
def backgroud_tasks():
    update_and_log_usage()
    #TODO
    #schedule.every().monday.at("01:00").do(uniprot_communicator.update_data)
    #schedule.every(2).minutes.do(update_and_log_usage)
    schedule.every(1).days.do(update_and_log_usage)
    while True:
        #logger.debug(f'while')
        delete_user_results()
        logger.debug(schedule.get_jobs())
        schedule.run_pending()
        #logger.debug(f'start sleep')
        sleep(600) #TODO
        #logger.debug(f'after sleep')


daemon = Thread(target=backgroud_tasks, daemon=True, name='background_update')
daemon.start()



######## Main Thread ########
def log_request(req):
    if req not in app_usage:
        app_usage[req] = 1
    else:
        app_usage[req] = app_usage[req] + 1


def error_handler(err):
    logger.error(err)
    f = open('../log/log.txt','a')
    traceback.print_exc(file=f)
    f.close()
    return {'error': ', '.join(list(err.args))}


@app.get("/api/format")
async def getFormats():
    logger.info('"/format"')
    log_request('format')

    try:
        formats = list(plt.gcf().canvas.get_supported_filetypes().keys())
        return {'formats': formats}
    except Exception as e:
        return error_handler(e)


@app.post("/api/submit")
async def handleSubmit(mass_file: UploadFile, controls: int = Form(), replicates: int = Form(), tolerance: Union[int, None] = Form(default=0), plot_format: Union[str, None] = Form(default='png')): # , conditions: Union[int, None] = Form(default=1)
    logger.info('"/submit"')
    log_request('submit')
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
        unique_id, failed_id_mapping, columns = await processor.start()
        end_time = datetime.now()
        logger.info(f'{end_time} Analysis finished! time: {end_time - start_time}')
        return {'resultsId': unique_id, 'failedIdMapping': failed_id_mapping, 'colNames': columns} 
    except Exception as e:
        return error_handler(e)


@app.get("/api/heatmap/{unique_id}")
async def getHeatMap(unique_id:str):
    logger.info(f'"/heatmap/{unique_id}"')
    log_request('heatmap')

    try:
        path = f'../results/{unique_id}/web_plots/Pairwise_Pearson_Correlation_Coefficient.jpeg'
        return FileResponse(path)
    except Exception as e:
        return error_handler(e)


@app.get("/api/scatter/{unique_id}")
async def getScatterPlot(unique_id:str, x: Union[str, None], y: Union[str, None]):
    logger.info(f'"/scatter/{unique_id}?x={x},y={y}"')
    log_request('scatter')

    try:
        # check if the plot has already been made
        plotTitle = f'Correlation {x} vs {y}'
        plotTitle = plotTitle.replace(" ", "_")
        path = f'../results/{unique_id}/web_plots/{plotTitle}.jpeg'
        if not os.path.exists(path):
            processor = WebProcessor(unique_id, x, y)
            processor.plot_scatter()
        return FileResponse(path)
    except Exception as e:
        return error_handler(e)


@app.get("/api/plot/{unique_id}/{plot_name}")
async def getRatioPlot(unique_id:str, plot_name: str):
    logger.info(f'"/plot/{unique_id}/{plot_name}"')
    log_request('plot')

    try:
        path = f'../results/{unique_id}/web_plots/{plot_name}'
        return FileResponse(path, media_type='image/jpeg')
    except Exception as e:
        return error_handler(e)


@app.get("/api/proteins/{unique_id}")
async def getProteins(unique_id:str):
    logger.info(f'"/proteins/{unique_id}"')
    log_request('proteins')

    try:
        with open(f'../results/{unique_id}/results/post-cutoff-proteome.txt', 'r') as f:
                proteins = f.readline()
        proteins = proteins.split(',')
        return {'protein_list': proteins}
    except Exception as e:
        return error_handler(e)


@app.get("/api/proteinssorted/{unique_id}/{column}")
async def getProteinSorted(unique_id:str, column:str):
    logger.info(f'"/proteinssorted/{unique_id}/{column}"')
    log_request('proteinssorted')
    
    try:
        path = f'../results/{unique_id}/post-cutoff-proteome_with_raw_data.tsv'
        results = pd.read_table(path, sep='\t', header=0)
        kept_columns = [results.columns[0]] + [column] + ['Gene Names', 'Protein names', 'Organism', 'Length']
        results = results[kept_columns]
        results.sort_values(by=[column], ascending=False, inplace=True)
        results = results.iloc[:100, :]
        results = results.fillna('No data')
        # results = results.to_dict(orient='index')
        results = results.values.tolist()
        return results
    except Exception as e:
        return error_handler(e)


@app.get("/api/download/{unique_id}")
async def sendResultsTar(unique_id:str):
    logger.info('"/download/"')
    log_request('download')

    try:
        path = '../results/'+unique_id+'/results'
        shutil.make_archive(path, 'zip', root_dir=path)
        return FileResponse(path+'.zip')
    except Exception as e:
        return error_handler(e)


@app.get("/api/organism")
async def getOrganism():
    logger.info('"/organism/"')
    log_request('organism')

    try:
        panther_processor = WebPantherProcessor(None, None)
        organism_dict = await panther_processor.retrieve_organisms()
        return organism_dict
    except Exception as e:
        return error_handler(e)


@app.get("/api/panther/{unique_id}")
async def getPantherEnrich(unique_id:str, organism_id:str):
    logger.info(f'"/panther/{organism_id}"')
    log_request('panther')

    try:
        results = {}
        #check if the analysis is already done
        done = True
        for param in ['Panther_GO_Slim_Cellular_Component', 'Panther_GO_Slim_Biological_Process','Reactome_Pathway']:
            path = f'../results/{unique_id}/results/post-cutoff-proteome_{organism_id}_{param}.tsv'
            if os.path.exists(path):
                df = pd.read_table(path, sep='\t', header=0)
                results[param] = df.values.tolist()
            else:
                done = False
                break
        
        # if not done, reach out to Panther
        if not done:
            panther_processor = WebPantherProcessor(organism_id, unique_id)
            results = await panther_processor.start()
        
        return results
    except Exception as e:
        return error_handler(e)


@app.get("/api/cachedpanther/{unique_id}")
async def getCachedPanther(unique_id:str, organism_id:str):
    logger.info(f'"/cachedpanther/"')
    log_request('cachedpanther')

    try:
        results = {}
        for param in ['Panther_GO_Slim_Cellular_Component', 'Panther_GO_Slim_Biological_Process','Reactome_Pathway']:
            path = f'../results/{unique_id}/results/post-cutoff-proteome_{organism_id}_{param}.tsv'
            if os.path.exists(path):
                df = pd.read_table(path, sep='\t', header=0)
                results[param] = df.values.tolist()
            else:
                return {'noResults': True}
        return results
    except Exception as e:
        return error_handler(e)


@app.get("/api/exportcached")
async def exportCached():
    logger.info('"/exportcached"')
    try:
        ids = uniprot_communicator.get_ids()
        ids.to_csv('../retrieved_data/latest_ids.tsv', sep='\t', index=False)
    except Exception as e:
        return error_handler(e)


@app.get("/api/exampledata")
async def exportCached():
    logger.info('"/exampledata"')
    log_request('exampledata')
    try:
        path = '../retrieved_data/Tutorial_PMID36220098_P15-Data_2-Ctrl_2-Rep_Mouse.tsv'
        return FileResponse(path)
    except Exception as e:
        return error_handler(e)

# def main():
#     uvicorn.run(app, host="0.0.0.0", port=8000)
