import uvicorn
from fastapi import FastAPI, Form, UploadFile
from fastapi.responses import FileResponse
from typing import Union
from datetime import datetime
from time import sleep
import schedule
from threading import Thread
import logging, sys, os, traceback
import pandas as pd
from datamanagement.webuniprotcommunicator import WebUniProtCommunicator
from datamanagement.webuserinputreader import WebUserInputReader
from processors.webprocessor import WebProcessor


logger = logging.getLogger('peeling')
#TODO: set level based on verbose option
logger.setLevel(logging.INFO)
log_handler = logging.FileHandler('../log.txt')
log_handler.setFormatter(logging.Formatter('%(asctime)s | %(levelname)s: %(message)s'))
logger.addHandler(log_handler)
logger.info(f'\n{datetime.now()} Server starts')


app = FastAPI()
uniprot_communicator = WebUniProtCommunicator()
uniprot_communicator.update_data()


######## Background Thread ########
def backgroud_update():
    #TODO
    #schedule.every().monday.at("01:00").do(uniprot_communicator.update_data)
    schedule.every(1).minutes.do(uniprot_communicator.update_data)
    while True:
        logger.info(f'{datetime.now()} Background update...')
        logger.debug(schedule.get_jobs())
        schedule.run_pending()
        sleep(60)

daemon = Thread(target=backgroud_update, daemon=True, name='background_update')
daemon.start()  


######## Main Thread ########


@app.get("/")
async def root():
    logger.info('"/"')
    return FileResponse('../client_old/index.html')


@app.get("/code.js")
async def sendJs():
    logger.info('"/code.js"')
    return FileResponse('../client_old/code.js')


@app.post("/submit/")
async def handleSubmit(mass_file: UploadFile, controls: int = Form(), replicates: int = Form(), conditions: Union[int, None] = Form(default=1), tolerance: Union[int, None] = Form(default=0)):
    logger.info('"/submit/"')
    #To do: shall we allow user input annotation files?
    try:
        start_time = datetime.now()
        logger.info(f'{start_time} Analysis starts...')
        user_input_reader = WebUserInputReader(mass_file, controls, replicates, conditions, tolerance) 
        processor = WebProcessor(user_input_reader, uniprot_communicator)
        unique_id = await processor.start()

        end_time = datetime.now()
        logger.info(f'{end_time} Analysis finished! time: {end_time - start_time}')
        return unique_id
    except:
        f = open('../log.txt','a')
        traceback.print_exc(file=f)
        f.close()


@app.get("/results/{unique_id}")
def sendResultsInfo(unique_id:str):
    logger.info('"/results/"')
    response = {}
    path = os.path.join('../results/', unique_id)

    # construc protein list from tsv
    protein_df = pd.read_table(path+'/condition1/surface_proteins.tsv', header=0) #TODO
    protein_list = list(protein_df.iloc[:, 0])
    response['proteins'] = ', '.join(protein_list) #TODO is this format convenient for downstream analysis?

    # get list of paths of plots
    plots = os.listdir(path+'/condition1/plots') #TODO
    ratio_plots = []
    roc_plots = []
    for plot in plots:
        if plot[:3] == 'ROC':
            roc_plots.append(plot)
        else:
            ratio_plots.append(plot)
    response['ratioPlots'] = ratio_plots
    response['rocPlots'] = roc_plots
    return response


#@app.get("/results/")


@app.get("/download/{unique_id}")
def sendResultsTar(unique_id:str):
    logger.info('"/download/"')
    path = '../results/'+unique_id+'.tar'
    return FileResponse(path)


def main():
    uvicorn.run(app, host="0.0.0.0", port=8000)
