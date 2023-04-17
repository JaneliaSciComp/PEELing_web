import React from 'react';
import {Spinner, Row, Button} from 'react-bootstrap';
//import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';
import './Results.css';
import QualityControl from './QualityControl';
import Plots from './Plots';
import Proteins from './Proteins';
import TopProteins from './TopProteins';
import Panther from './Panther';


export default class Results extends React.Component {
      
    render() {
        return (
          <div className='section'>  
            
            <h4 className='section-title my-4 px-3'>Results</h4>
            
            <div className='section-main' id='results-container'>
                {this.props.resultsId ?
                <div className='mx-3'>
                    {this.props.failedIdMapping ? 
                    <p className='info mx-4 mt-4'>(Note: {this.props.failedIdMapping} proteins failed for ID mapping using UniProt API, which may affect the results.)</p>
                    :
                    null
                    }
                    
                    <QualityControl resultsId={this.props.resultsId} colNames={this.props.colNames} scatterError={this.props.colNames.length>1 ? null : "At least two columns are needed to make scatter plot"}/>
                    <hr className='my-5 mx-4'></hr>
                    <Plots resultsId={this.props.resultsId} colNames={this.props.colNames}/>
                    <hr className='my-5 mx-4'></hr>
                    <Proteins resultsId={this.props.resultsId} />
                    <hr className='my-5 mx-4'></hr>
                    <TopProteins resultsId={this.props.resultsId} colNames={this.props.colNames} />
                    <hr className='my-5 mx-4'></hr>
                    <Panther resultsId={this.props.resultsId} setOrganism={this.props.setOrganism} organismId={this.props.organismId}/>
                    <br></br>
                    <Row className='px-3 d-flex justify-content-center'>
                        <Button className='btn-download' type='submit'>
                            <DownloadIcon />
                            <a className='anchor-download' href={'/api/download/'+this.props.resultsId}>Download Results</a>
                        </Button>
                    </Row>
                </div>
                :
                <div>
                    {this.props.error ? 
                    <div className='info-error mx-4 my-5 d-flex flex-column align-content-center'>
                        <p>Oops! Something went wrong!</p>
                        <p>Please check the user input and try again.</p>
                    </div>
                    :
                    <div className='info mx-2 my-4 d-flex flex-row justify-content-center'>
                        <Spinner className='spinner mx-3' animation='border' role='status'>
                            <span className='visually-hidden'>Loading</span>
                        </Spinner>
                        <p className='mx-2 my-auto'>Analyzing ...</p>
                    </div>}
                    
                </div>
                }
                
            </div>
          </div>
        )
    }
}
