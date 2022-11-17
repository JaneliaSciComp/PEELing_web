import React from 'react';
import {Spinner, Row, Col} from 'react-bootstrap';
import './Results.css';
import Plots from './Plots';


export default class Results extends React.Component {
    constructor(props) {
        super(props);
        //console.log(this.props);

        this.state = {
            ratioPlots: ['../results/TPR_FPR_Ratio_128C_127C.png',
                        '../results/TPR_FPR_Ratio_128C_129N.png',
                        '../results/TPR_FPR_Ratio_129C_127C.png'],
            rocPlots: ['../results/ROC_Ratio_128C_127C.png', 
                      '../results/ROC_Ratio_128C_129N.png',
                      '../results/ROC_Ratio_129C_127C.png'],
            proteins: [],
        }


    }

    //TODO: a function to request results by id.


    render() {
        return (
          <div className='section'>  
            
            <h4 className='section-title my-4 px-3'>Results</h4>
            
            <div className='section-main' id='results-container'>
                {this.props.resultsId ?
                <Plots ratioPlots={this.props.ratioPlots} rocPlots={this.props.rocPlots} />
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