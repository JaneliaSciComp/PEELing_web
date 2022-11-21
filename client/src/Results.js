import React from 'react';
import {Spinner, Row, Button} from 'react-bootstrap';
//import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';
import './Results.css';
import Plots from './Plots';
import Proteins from './Proteins';


export default class Results extends React.Component {
    constructor(props) {
        super(props);
        
    }



    render() {
        return (
          <div className='section'>  
            
            <h4 className='section-title my-4 px-3'>Results</h4>
            
            <div className='section-main' id='results-container'>
                {this.props.resultsId ?
                <div className='mx-3'>
                    <Plots resultsId={this.props.resultsId} setServerError={this.props.setServerError} />
                    <hr className='my-5 mx-4'></hr>
                    <Proteins resultsId={this.props.resultsId} setServerError={this.props.setServerError} />
                    <br></br>
                    <Row className='my-4 px-3 flex-row-reverse'>
                        <Button className='btn-download' type='submit'>
                            <DownloadIcon />
                            {/* TODO: change url */}
                            <a className='anchor-download' href={'http://localhost:8000/download/'+this.props.resultsId}>Download</a>
                        </Button>
                    </Row>
                </div>
                :
                <div>
                    {this.props.serverError ? 
                    <div className='info-error mx-4 my-5 d-flex flex-column align-content-center'>
                        {/* TODO: add a cry picture? */}
                        <p>Oops! Something went wrong!</p>
                        <p>Please check the user input and submit again.</p>
                    </div>
                    :
                    <div className='info mx-2 my-4 d-flex flex-row justify-content-center'>
                        <Spinner className='spinner mx-3' animation='border' role='status'>
                            <span className='visually-hidden'>Loading</span>
                        </Spinner>
                        <p className='mx-2 my-auto'>Waiting for Results</p>
                    </div>}
                    
                </div>
                }
                
            </div>
          </div>
        )
    }
}