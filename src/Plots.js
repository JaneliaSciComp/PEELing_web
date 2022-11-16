import React from 'react';
import {ToggleButtonGroup, ToggleButton, Image, Row, Col} from 'react-bootstrap';
import './Plots.css';
import ratioPlot from './TPR_FPR_Ratio_128C_127C.png';
import rocPlot from './ROC_Ratio_128C_127C.png';


export default class Plots extends React.Component {
    constructor(props) {
        super(props); // props is a list of two lists: urls of ratio plots, urls of roc plots
        //console.log(this.props);
        
        this.state = {
            plotNames: this.props.rocPlots.map(this.extractName),
            active: 0,
        }
        //console.log(this.state.rocNames);

        //this.extractName = this.extractName.bind(this);
        this.switchPlot = this.switchPlot.bind(this);
    }

    extractName(url) {
        var name = url.substr(url.lastIndexOf('/')+1);
        name = name.substring(name.indexOf('_')+1, name.indexOf('.')); //TODO
        return name;
    }

    switchPlot(value) { //value is the value property of the toggleButton
        this.setState({active: value});
        console.log(this.props.ratioPlots[this.state.active]);
    }

    // <div className='btn-group d-flex flex-column'>
    //                 {this.state.plotNames.map((plotName, i) =>
    //                     <div>
    //                     <input type='radio' className='btn-toggle btn-toggle-input' 
    //                     key={i} id={'radio-${name}'} name={plotName} value={i} />
    //                     <label for={'radio-${name}'} className='btn-toggle btn-toggle-label'>{plotName}</label>
    //                     </div>
    //                     )
    //                 }

    //             </div>
    
    
    //{this.props.ratioPlots[this.state.active]}
    

    render() {
        return (
           
            <Row className='plots-container mx-3 my-4'>
            <Col className='px-0' md={2}>
                <div className='btn-group-container'>
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
                <Image src={ratioPlot} alt='logo' fluid='true'></Image>
            </Col>
            <Col md={5}>
                <Image src={rocPlot} alt='logo' fluid='true'></Image>
            </Col>
        </Row>
          );
    }
}