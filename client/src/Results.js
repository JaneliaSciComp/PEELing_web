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
    constructor(props) {
        super(props);

        // this.state = {
        //     colNames: [],
        // }
        // console.log('Results constructor');
        // console.log(this.state);
    }

    
    // setColNames(names) {
    //     this.setState({colNames: names});
    // }

    // componentDidMount() {
    //     // console.log('Resutls componentDidMount')

    //     fetch('/api/colnames/'+this.props.resultsId, {
    //         method: 'GET'
    //     }).then(res => {
    //         // console.log(res);
    //         if (res.ok) {
    //             return res.json(); //TODO: await?
    //         } else {
    //             this.props.setError(res.statusText);
    //         }
    //     }).then(res => {
    //         if (res['error']) {
    //             this.props.setError(res['error']);
    //         } else {
    //             this.setState({
    //                 colNames: res['colNames']}
    //                 // plotNames: res['rocPlots'].map(this.extractName)}
    //             // , ()=>{console.log(this.state)}
    //                 )
    //         }
            
    //     })
    // }


    // static getDerivedStateFromProps(props, state) {
    //     console.log('Resutls derived')

    //     fetch('/api/colnames/'+props.resultsId, {
    //         method: 'GET'
    //     }).then(res => {
    //         console.log(res);
    //         if (res.ok) {
    //             return res.json(); //TODO: await?
    //         } else {
    //             props.setError(res.statusText);
    //         }
    //     }).then(res => {
    //         if (res['error']) {
    //             props.setError(res['error']);
    //         } else {
    //             return {
    //                 colNames: res['colNames']
    //             }                
    //         }
    //     })
    //     return null;
    // }


    render() {
        // console.log('Results render');
        // console.log(this.props);
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
                    
                    <QualityControl resultsId={this.props.resultsId} colNames={this.props.colNames} scatterError={this.props.colNames.length>1 ? null : "At least two columns are needed to make scatter plot"}/>
                    <hr className='my-5 mx-4'></hr>
                    <Plots resultsId={this.props.resultsId} colNames={this.props.colNames}/>
                    <hr className='my-5 mx-4'></hr>
                    <Proteins resultsId={this.props.resultsId} />
                    <hr className='my-5 mx-4'></hr>
                    <TopProteins resultsId={this.props.resultsId} colNames={this.props.colNames} />
                    <hr className='my-5 mx-4'></hr>
                    <Panther resultsId={this.props.resultsId}/>
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
