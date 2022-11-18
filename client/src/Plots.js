import React from 'react';
import {ToggleButtonGroup, ToggleButton, Image, Row, Col} from 'react-bootstrap';
import './Plots.css';
import ratioPlot_128C_127C from './TPR_FPR_Ratio_128C_127C.png';
import ratioPlot_128C_129N from './TPR_FPR_Ratio_128C_129N.png';
import rocPlot_128C_127C from './ROC_Ratio_128C_127C.png';
import rocPlot_128C_129N from './ROC_Ratio_128C_129N.png';



export default class Plots extends React.Component {
    constructor(props) {
        super(props); // resultsId
        
        this.state = {
            //TODO: generate plots list by resultsId
            ratioPlots: [ratioPlot_128C_127C,
                        ratioPlot_128C_129N,
                        ],
            rocPlots: [rocPlot_128C_127C, 
                      rocPlot_128C_129N,
                      ],
            plotNames: ['Ratio_128C_127C', 'Ratio_128C_129N'],  //this.state.ratioPlots.map(this.extractName),
            active: 0,
        }
        //console.log(this.state.rocNames);

        this.switchPlot = this.switchPlot.bind(this);
    }

    extractName(url) {
        var name = url.substr(url.lastIndexOf('/')+1);
        name = name.substring(name.indexOf('_')+1, name.lastIndexOf('.')); //TODO
        return name;
    }

    switchPlot(value) { //value is the value property of the toggleButton
        this.setState({active: value}, ()=>console.log(this.state.active));
        ;
    }

    

    render() {
        return (
            <div className='plots subsection'>
                <h4 className='subsection-title my-5 px-4'>Plots</h4>
           
                <Row className='plots-container mx-3 my-4'>
                    <Col className='px-0' md={2}>
                        <div className='btn-group-container my-3'>
                            <ToggleButtonGroup className='btn-group flex-column justify-content-start' 
                            vertical type='radio' name='ratios' 
                            value={this.state.active}
                            onChange={this.switchPlot}> 
                                {this.state.plotNames.map((plotName, i) => 
                                    <ToggleButton className='btn-toggle' variant="light"
                                    key={i} id={plotName} name={plotName} value={i}>
                                        {plotName}
                                    </ToggleButton>
                                    )
                                }
                            </ToggleButtonGroup>
                        </div> 
                        
                    </Col>
                    <Col md={5}>
                        <Image className='my-3' src={this.state.ratioPlots[this.state.active]} alt='logo' fluid='true'></Image>
                    </Col>
                    <Col md={5}>
                        <Image className='my-3' src={this.state.rocPlots[this.state.active]} alt='logo' fluid='true'></Image>
                    </Col>
                </Row>
            </div>
        );
    }
}