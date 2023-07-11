import os
from csv import reader
from io import StringIO
from typing import Union
from datetime import datetime, timedelta
from time import sleep
import logging
import traceback
import shutil
import asyncio
from threading import Thread

from fastapi import FastAPI, Form, UploadFile, File, BackgroundTasks
from fastapi.responses import FileResponse
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
import schedule
import pandas as pd
import matplotlib.pyplot as plt
from peeling.webuniprotcommunicator import WebUniProtCommunicator
from peeling.webuserinputreader import WebUserInputReader
from peeling.webprocessor import WebProcessor
from peeling.webpantherprocessor import WebPantherProcessor
from peeling.cellular_compartments import cellular_compartments

REQUESTES = [
    'format', 'submit', 'heatmap', 'scatter', 'plot', 'proteins',
    'proteinssorted', 'download', 'organism', 'panther',
    'cachedpanther', 'exampledata'
]

#set up logger
logger = logging.getLogger('peeling')
logger.setLevel(logging.INFO)

log_handler = logging.FileHandler('../log/log.txt')
# log_handler = logging.StreamHandler()
# to print out source code location: %(pathname)s %(lineno)d:
log_handler.setFormatter(logging.Formatter('%(asctime)s | %(levelname)s: %(message)s'))
logger.addHandler(log_handler)

debug = os.getenv("PEELING_DEBUG", 0)
if debug == '1':
    logger.setLevel(logging.DEBUG)
    logger.debug('debug mode enabled')

logger.info(f'\n{datetime.now()} Server starts')


app_usage = {}
track_update = 0

app = FastAPI()

# for CORS, backend server allow these origins to send request and access the response
#TODO change origin to the frontend server orgin when deploy
# 8000 for old client, 3000 for react client
origins = ['http://localhost:8000', 'http://localhost:3000']
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
    logger.debug('updating cache in coroutine...')
    global track_update
    for cellular_compartment in reversed(cellular_compartments.keys()):
        logger.debug(f"updating {cellular_compartment}")
        uniprot_communicator = WebUniProtCommunicator(False, cellular_compartment, track_update)
        coro = uniprot_communicator.update_data()
        future = asyncio.run_coroutine_threadsafe(coro, coroutine_loop)
        future.result()
        logger.debug(f"updated {cellular_compartment}")
    track_update += 1
    logger.debug('updating cache complete')
    log_usage()


def delete_user_results():
    try:
        files = os.listdir('../results')
        logger.debug(f'{len(files)} files exist')
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
        logger.debug(f'{count} files deleted')
    except Exception as e:
        logger.error(e)
        f = open('../log/log.txt','a')
        traceback.print_exc(file=f)
        f.close()


def log_usage():
    logger.debug('logging_usage...')
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

    logger.info('App usage logged')
    #refresh app_usage
    app_usage = {}


def backgroud_tasks():
    update_and_log_usage()
    # schedule.every().sunday.at("09:00").do(update_and_log_usage)
    schedule.every(2).minutes.do(update_and_log_usage)
    while True:
        delete_user_results()
        logger.debug(schedule.get_jobs())
        schedule.run_pending()
        sleep(600)


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
async def get_formats():
    logger.info('"/format"')
    log_request('format')

    try:
        formats = list(plt.gcf().canvas.get_supported_filetypes().keys())
        return {'formats': formats}
    except Exception as e:
        return error_handler(e)


def is_tsv_single_column(content_str):
    rows = list(reader(StringIO(content_str), delimiter="\t"))
    if len(rows[0]) == 1 and all(len(row) == 1 and isinstance(row[0], str) for row in rows[1:]):
        return True
    return False


async def validate_and_convert_annotation_upload(file):
    content = await file.read()
    content_str = content.decode("utf-8")
    if is_tsv_single_column(content_str):
        # File is valid
        return pd.read_table(StringIO(content_str), sep='\t')
    # File is not valid
    raise RequestValidationError("Uploaded file is not a TSV with a single column of ids")


@app.post("/api/submit")
async def handleSubmit(
    mass_file: UploadFile,
    tp_file: UploadFile = File(None),
    fp_file: UploadFile = File(None),
    controls: int = Form(),
    replicates: int = Form(),
    tolerance: Union[int, None] = Form(default=0),
    plot_format: Union[str, None] = Form(default='png'),
    cellular_compartment: str = Form(default='cs'), # default is cell surface
):
    logger.info('"/submit"')
    log_request('submit')
    try:
        # validate and convert the true positive and false positive upload
        # file handles into a pandas data frame.
        tp_data = None
        fp_data = None
        if cellular_compartment not in cellular_compartments:
            logger.debug(f'*** {cellular_compartment} not in cellular_compartments list')
            tp_data = await validate_and_convert_annotation_upload(tp_file)
            fp_data = await validate_and_convert_annotation_upload(fp_file)
        else:
            logger.debug(f'*** using: {cellular_compartment} - skip validating file_uploads')

        start_time = datetime.now()
        logger.info(f'{start_time} Analysis starts...')
        user_input_reader = WebUserInputReader(
            mass_file,
            controls,
            replicates,
            tolerance,
            plot_format,
            cellular_compartment
        )
        uniprot_communicator = WebUniProtCommunicator(
            False,
            cellular_compartment,
            track_update,
            tp_data=tp_data,
            fp_data=fp_data
        )
        processor = WebProcessor(user_input_reader, uniprot_communicator)
        unique_id, failed_id_mapping, columns = await processor.start()
        end_time = datetime.now()
        logger.info(f'{end_time} Analysis finished! time: {end_time - start_time}')
        return {
            'resultsId': unique_id,
            'failedIdMapping': failed_id_mapping,
            'colNames': columns
        }
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
        uniprot_communicator = WebUniProtCommunicator(False, 'cs', track_update)
        ids = uniprot_communicator.get_ids()
        ids.to_csv('../retrieved_data/latest_ids.tsv', sep='\t', index=False)
    except Exception as e:
        return error_handler(e)


@app.get("/api/exampledata")
async def exampleData():
    logger.info('"/exampledata"')
    log_request('exampledata')
    try:
        path = '../retrieved_data/Tutorial_PMID36220098_P15-Data_2-Ctrl_2-Rep_Mouse.tsv'
        return FileResponse(path)
    except Exception as e:
        return error_handler(e)
