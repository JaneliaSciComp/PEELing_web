import React from 'react';
import {ToggleButtonGroup, ToggleButton, Image, Row, Col} from 'react-bootstrap';
import './Plots.css';
// import ratioPlot_128C_127C from './TPR_FPR_Ratio_128C_127C.png';
// import ratioPlot_128C_129N from './TPR_FPR_Ratio_128C_129N.png';
// import rocPlot_128C_127C from './ROC_Ratio_128C_127C.png';
// import rocPlot_128C_129N from './ROC_Ratio_128C_129N.png';



export default class Plots extends React.Component {
    constructor(props) {
        super(props); // resultsId
        
        this.state = {
            ratioPlots:[],
            rocPlots:[],
            plotNames: [],
            active: 0,
            error: null,
        }

        this.switchPlot = this.switchPlot.bind(this);
    }

    
    componentDidMount() {
        fetch('/api/plotslist/'+this.props.resultsId, {
            method: 'GET'
        }).then(res => {
            //console.log(res);
            if (res.ok) {
                return res.json(); //TODO: await?
            } else {
                this.setState({error: res.statusText});
            }
        }).then(res => {
            if (res['error']) {
                this.setState({error: res['error']});
            } else {
                this.setState({
                    ratioPlots: res['ratioPlots'],
                    rocPlots: res['rocPlots'],
                    plotNames: res['rocPlots'].map(this.extractName)}
                )
            }
            
        })
    }

    extractName(url) {
        var name = url.substr(url.lastIndexOf('/')+1);
        name = name.substring(name.indexOf('_')+1, name.lastIndexOf('.')); //TODO
        return name;
    }

    switchPlot(value) { //value is the value property of the toggleButton
        this.setState({active: value});
        ;
    }

    

    render() {
        return (
            <div className='plots subsection'>
                <h4 className='subsection-title my-5 px-4'>Plots</h4>

                {this.state.error ?
                <div className='info-error mx-4 my-5 d-flex flex-column align-content-center'>
                    <p>Oops! Plots went wrong!</p>
                </div>
                :
                <Row className='plots-container mx-3'>
                    <Col className='px-0' md={2}>
                        {this.state.plotNames[0] ?
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
                        : null
                        }
                        
                    </Col>
                    <Col md={5}>
                        {/* TODO:change url */}
                        {this.state.ratioPlots[0] ?
                        <Image className='my-3' src={'/api/plot/'+this.props.resultsId+'/'+this.state.ratioPlots[this.state.active]} alt='logo' fluid='true'></Image>
                        : null
                        }
                    </Col>
                    <Col md={5}>
                        {/* TODO:change url */}
                        {this.state.rocPlots[0] ? 
                        <Image className='my-3' src={'/api/plot/'+this.props.resultsId+'/'+this.state.rocPlots[this.state.active]} alt='logo' fluid='true'></Image>
                        : null
                        }
                    </Col>
                </Row>
                }
            </div>
        );
    }
}
