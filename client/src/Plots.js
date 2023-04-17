import React from 'react';
import {ToggleButtonGroup, ToggleButton, Image, Row, Col} from 'react-bootstrap';
import './Plots.css';


export default class Plots extends React.Component {
    constructor(props) {
        super(props); 
        
        this.state = {
            ratioPlots: [], 
            rocPlots: [], 
            active: 0,
        }

        this.switchPlot = this.switchPlot.bind(this);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return { 
            ratioPlots: nextProps.colNames.map(col => {return 'TPR_FPR_'+col+'.jpeg'}),
            rocPlots: nextProps.colNames.map(col => {return 'ROC_'+col+'.jpeg'}),
        };
    }

    switchPlot(value) { 
        this.setState({active: value});
    }

    

    render() {
        return (
            <div className='plots subsection'>
                <h4 className='subsection-title my-5 px-4'>Quality Check and Cutoff Plots</h4>

                <Row className='subsection-content plots-container mx-3'>
                    <Col className='px-0' md={2}>
                        {this.props.colNames[0] ?
                        <div className='btn-group-container my-3'>
                            <ToggleButtonGroup className='btn-group flex-column justify-content-start' 
                            vertical type='radio' name='ratios' 
                            value={this.state.active}
                            onChange={this.switchPlot}> 
                                {this.props.colNames.map((plotName, i) => 
                                    <ToggleButton className='btn-toggle' variant="light"
                                    key={i} id={plotName} name={plotName} value={i}>
                                        {plotName}
                                    </ToggleButton>
                                    )
                                }
                            </ToggleButtonGroup>
                        </div> 
                        : null
                        }
                        
                    </Col>
                    <Col md={5}>
                        {this.state.ratioPlots[0] ?
                        <Image className='my-3' src={'/api/plot/'+this.props.resultsId+'/'+this.state.ratioPlots[this.state.active]} alt='logo' fluid='true'></Image>
                        : null
                        }
                    </Col>
                    <Col md={5}>
                        {this.state.rocPlots[0] ? 
                        <Image className='my-3' src={'/api/plot/'+this.props.resultsId+'/'+this.state.rocPlots[this.state.active]} alt='logo' fluid='true'></Image>
                        : null
                        }
                    </Col>
                </Row>
            </div>
        );
    }
}
