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
        //console.log(this.props);

        // this.state = {
        //     ratioPlots: [],
        //     rocPlots: [],
        //     proteins: [],
        // } 
    }


    render() {
        return (
          <div className='section'>  
            
            <h4 className='section-title my-4 px-3'>Results</h4>
            
            <div className='section-main' id='results-container'>
                {this.props.resultsId ?
                <div className='mx-3'>
                    <Plots resultsId={this.props.resultsId} />
                    <hr className='my-5 mx-4'></hr>
                    <Proteins resultsId={this.props.resultsId} />
                    <br></br>
                    <Row className='my-4 px-3 flex-row-reverse'>
                        <Button className='btn-download' type='submit'>
                            <DownloadIcon />
                            <a className='anchor-download' href={'/download/'+this.props.resultsId}>Download</a>
                        </Button>
                    </Row>
                </div>
                :
                <div className='info mx-3 my-4 d-flex flex-row justify-content-center'>
                    <Spinner className='spinner mx-3' animation='border' role='status'>
                        <span className='visually-hidden'>Loading</span>
                    </Spinner>
                    <p className='mx-2 my-auto'>Waiting for Results</p>
                </div>
                }
                
            </div>
          </div>
        )
    }
}