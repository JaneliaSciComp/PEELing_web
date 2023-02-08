import React from 'react';
import {Spinner, Row, Col, Button} from 'react-bootstrap';
//import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';
import './Results.css';
import QualityControl from './QualityControl';
import Plots from './Plots';
import Proteins from './Proteins';


export default class Results extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            colNames: [],
        }
    }

    
    // setColNames(names) {
    //     this.setState({colNames: names});
    // }

    componentDidMount() {
        fetch('/api/colnames/'+this.props.resultsId, {
            method: 'GET'
        }).then(res => {
            //console.log(res);
            if (res.ok) {
                return res.json(); //TODO: await?
            } else {
                this.props.setError(res.statusText);
            }
        }).then(res => {
            if (res['error']) {
                this.props.setError(res['error']);
            } else {
                this.setState({
                    colNames: res['colNames']}
                    // plotNames: res['rocPlots'].map(this.extractName)}
                )
            }
            
        })
    }


    render() {
        return (
          <div className='section'>  
            
            <h4 className='section-title my-4 px-3'>Results</h4>
            
            <div className='section-main' id='results-container'>
                {this.props.resultsId ?
                <div className='mx-3'>
                    {this.props.failedIdMapping ? 
                    <p className='info mx-4 mt-4'>(Note: {this.props.failedIdMapping} proteins failed for id mapping using Uniprot API, which may affect the results.)</p>
                    :
                    null
                    }
                    
                    <QualityControl resultsId={this.props.resultsId} colNames={this.state.colNames} setError={this.props.setError} />
                    <hr className='my-5 mx-4'></hr>
                    <Plots resultsId={this.props.resultsId} colNames={this.state.colNames} setError={this.props.setError} />
                    <hr className='my-5 mx-4'></hr>
                    <Proteins resultsId={this.props.resultsId} setError={this.props.setError} />
                    <br></br>
                    <Row className='my-4 px-3 flex-row-reverse'>
                        <Button className='btn-download' type='submit'>
                            <DownloadIcon />
                            <a className='anchor-download' href={'/api/download/'+this.props.resultsId}>Download</a>
                        </Button>
                    </Row>
                </div>
                :
                <div>
                    {this.props.error ? 
                    <div className='info-error mx-4 my-5 d-flex flex-column align-content-center'>
                        {/* TODO: add a cry picture? */}
                        <p>Oops! Something went wrong!</p>
                        <p>Please check the user input and try again.</p>
                        <p>{this.props.error}</p>
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
