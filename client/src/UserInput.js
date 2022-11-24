import React from 'react';
import {Form, Row, Col, Button} from 'react-bootstrap';
import './UserInput.css'

export default class UserInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            controls: 0,
            replicates: 0,
            //conditions: 1,
            tolerance:0,
            plotFormat: 'png',
            fileInvalid:false,
            controlsInvalid:false,
            replicatesInvalid:false,
            conditionsInvalid:false,
            toleranceInvalid:false,
            //invalid:true,
        }

        this.submit = this.submit.bind(this);
        this.fileSelectHandler = this.fileSelectHandler.bind(this);
        this.plotFormatChangeHandler = this.plotFormatChangeHandler.bind(this);
        this.numberChangeHandler = this.numberChangeHandler.bind(this);
    }


    submit(e) { //TODO: async?
        e.preventDefault();
        this.props.submitIndicator(true);
        this.props.setResultsId(null);
        this.props.setServerError(null);
        fetch("http://localhost:8000/submit/", {  //TODO: change url; await?
            method: 'POST',
            body: new FormData(e.target),
        }).then(res => {
            if (res.ok) {
                return res.text(); //TODO: await?
            } else {
                this.props.setServerError(res.statusText);
                this.props.setResultsId(null);
                this.props.submitIndicator(false);
            }
        }, err => {
            console.log(err);
        }).then((resultsId)=>{
            this.props.setResultsId(resultsId);
            this.props.submitIndicator(false);
            this.props.setServerError(null);
        })
    }

    fileSelectHandler(e) {
        //this.setState({fileInvalid:true});
        if (e.target.files.length !== 0 && e.target.files[0].type === 'text/tab-separated-values') {
            //let totalInvalid = false || this.state.controlsInvalid || this.state.replicatesInvalid || this.state.conditionsInvalid || this.state.toleranceInvalid;
            this.setState({fileInvalid: false, 
                           //invalid: totalInvalid
                        });
        } else {
            //let totalInvalid = true || this.state.controlsInvalid || this.state.replicatesInvalid || this.state.conditionsInvalid || this.state.toleranceInvalid;
            this.setState({fileInvalid: true,
                           //invalid: totalInvalid
                        });
        }
    }

    plotFormatChangeHandler(e) {

    }

    numberChangeHandler(e) {
        let value = Number(e.target.value);
        let id = e.target.id;
        if (id === 'controls') {
            //this.setState({controlsInvalid: true});
            if (value && Number.isInteger(value) && value>0) {
                //let totalInvalid = this.state.fileInvalid || false || this.state.replicatesInvalid || this.state.conditionsInvalid || this.state.toleranceInvalid;
                this.setState({controls: value,
                               controlsInvalid: false,
                               //invalid: totalInvalid
                            });
            } else {
                //let totalInvalid = this.state.fileInvalid || true || this.state.replicatesInvalid || this.state.conditionsInvalid || this.state.toleranceInvalid;
                this.setState({controlsInvalid: true,
                               //invalid: totalInvalid
                            });
            }
        }
        
        if (id === 'replicates') {
            //this.setState({replicatesInvalid: true});
            if (value && Number.isInteger(value) && value>0) {
                //let totalInvalid = this.state.fileInvalid || this.state.controlsInvalid || false || this.state.conditionsInvalid || this.state.toleranceInvalid;
                this.setState({replicates: value,
                               replicatesInvalid: false, 
                               //invalid: totalInvalid
                            });
            } else {
                //let totalInvalid = this.state.fileInvalid || this.state.controlsInvalid || true || this.state.conditionsInvalid || this.state.toleranceInvalid;
                this.setState({replicatesInvalid: true,
                               //invalid: totalInvalid
                            });
            }
        }

        // if (id === 'conditions') {
        //     //this.setState({conditionsInvalid: true});
        //     if (value && Number.isInteger(value) && value>=1) {
        //         //let totalInvalid = this.state.fileInvalid || this.state.controlsInvalid || this.state.replicatesInvalid || false || this.state.toleranceInvalid;
        //         this.setState({conditions: value,
        //                        conditionsInvalid: false, 
        //                        //invalid: totalInvalid
        //                     });
        //     } else {
        //         //let totalInvalid = this.state.fileInvalid || this.state.controlsInvalid || this.state.replicatesInvalid || true || this.state.toleranceInvalid;
        //         this.setState({conditionsInvalid: true,
        //                        //invalid: totalInvalid
        //                     });
        //     }
        // }

        if (id === 'tolerance') {
            if ((value===0 || value) && Number.isInteger(value) && value>=0 && value <= this.state.controls*this.state.replicates*this.state.conditions) {
                //let totalInvalid = this.state.fileInvalid || this.state.controlsInvalid || this.state.replicatesInvalid || this.state.conditionsInvalid || false;
                this.setState({tolerance: value,
                               toleranceInvalid: false, 
                               //invalid: totalInvalid
                            });
            } else {
                //let totalInvalid = this.state.fileInvalid || this.state.controlsInvalid || this.state.replicatesInvalid || this.state.conditionsInvalid || true;
                this.setState({toleranceInvalid: true,
                               //invalid: totalInvalid
                            });
            }
        }

    }


    render() {
        return (
          <div className='section'>  
            
            <h4 className='section-title my-4 px-3'>User Input</h4>
            
            <div className='section-main' id='user-input-container'>
                <Form className='mx-3' onSubmit={this.submit} encType='multipart/form-data'>
                    <Form.Group as={Row} className='mt-4 px-3'>
                        <Form.Label column sm={5}>Mass spec file</Form.Label>
                        <Col sm={7}>
                            <Form.Control type='file' name='mass_file' required accept='.tsv' onChange={this.fileSelectHandler}/>
                            {this.state.fileInvalid ? 
                            <p className='invalid' display='none'>Please select a tsv file.</p>
                            : null}
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className='mt-4 px-3' controlId='controls'>
                        <Form.Label column sm={5}># Controls</Form.Label>
                        <Col sm={7}>
                            <Form.Control type='number' name='controls' required min='1' onChange={this.numberChangeHandler}/>
                            <Form.Control.Feedback type='invalid'>Please provide a positive integer.</Form.Control.Feedback>
                            {this.state.controlsInvalid ? 
                            <p className='invalid' display='none'>Please provide a positive integer.</p>
                            : null}
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className='mt-4 px-3' controlId='replicates'>
                        <Form.Label column sm={5}># Replicates per Control</Form.Label>
                        <Col sm={7}>
                            <Form.Control type='number' name='replicates' required min='1' onChange={this.numberChangeHandler}/>
                            <Form.Control.Feedback type='invalid'>Please provide a positive integer.</Form.Control.Feedback>
                            {this.state.replicatesInvalid ? 
                            <p className='invalid' display='none'>Please provide a positive integer.</p>
                            : null}
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className='mt-4 px-3' controlId='tolerance'>
                        <Form.Label column sm={5}>Tolerance</Form.Label>
                        <Col sm={7}>
                            <Form.Control type='number' name='tolerance' placeholder='0' min='0' max={this.state.controls*this.state.replicates*this.state.conditions} onChange={this.numberChangeHandler}/>
                            <Form.Control.Feedback type='invalid'>Please provide a non-negative integer with value ≤ controls * replicates * conditions.</Form.Control.Feedback>
                            {this.state.toleranceInvalid ? 
                            <p className='invalid' display='none'>Please provide an integer in [0, #controls * #replicates * #conditions].</p>
                            : null}
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className='mt-4 px-3' controlId='plot_format'>
                        <Form.Label column sm={5}>Plot Format</Form.Label>
                        <Col sm={7}>
                            <Form.Control type='text' name='plot_format' placeholder='png' onChange={this.plotFormatChangeHandler}/>
                            <Form.Control.Feedback type='invalid'>Please provide a format for the generated plots: png, svg, pdf, etc.</Form.Control.Feedback>
                            {this.state.plotFormatInvalid ? 
                            <p className='invalid' display='none'>Please provide a format for the generated plots: png, svg, pdf, etc.</p>
                            : null}
                        </Col>
                    </Form.Group>

                    <Row className='my-4 px-3 flex-row-reverse'>
                        <Button type='submit' className='btn-submit' onSubmit={this.submit}>Submit</Button>
                    </Row>
                    
                </Form>
            </div>
          </div>
        )
    }

}