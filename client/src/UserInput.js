import React from 'react';
import {Form, Row, Col, Button} from 'react-bootstrap';
import './UserInput.css'


export default class UserInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            controls: 0,
            replicates: 0,
            tolerance:0,
            plotFormat: 'png',
            plotFormatList: ['png'],
            fileInvalid:false,
            controlsInvalid:false,
            replicatesInvalid:false,
            conditionsInvalid:false,
            toleranceInvalid:false,
            //invalid:true,
        }

        this.submit = this.submit.bind(this);
        this.fileSelectHandler = this.fileSelectHandler.bind(this);
        this.numberChangeHandler = this.numberChangeHandler.bind(this);
        this.formatChangeHandler = this.formatChangeHandler.bind(this);
    }


    componentDidMount() {
        fetch("/api/format/", { 
            method: 'GET'
        }).then(res => {
            //console.log(res);
            if (res.ok) {
                return res.json(); 
            } else {
                this.props.setError(res.statusText);
            }
        }).then(res => {
            //console.log('then')
            if (res['error']) {
                this.props.setError(res['error']);
            } else {
                this.setState({
                    plotFormatList: res['formats']})
            }
        })
    }


    submit(e) { 
        e.preventDefault();
        this.props.submitIndicator(true);
        this.props.setResultsId(null);
        this.props.setFailedIdMapping(null);
        this.props.setColNames(null);
        this.props.setError(null);
        fetch("/api/submit/", {
            method: 'POST',
            body: new FormData(e.target),
        }).then(res => {
            //console.log(res);
            if (res.ok) {
                return res.json();
            } else {
                this.props.setError(res.statusText);
                this.props.setResultsId(null);
                this.props.setFailedIdMapping(null);
                this.props.setColNames(null);
                this.props.submitIndicator(false);
            }
        }).then((res)=>{
            if (res['error']) {
                this.props.setError(res['error']);
                this.props.setResultsId(null);
                this.props.setFailedIdMapping(null);
                this.props.setColNames(null);
                this.props.submitIndicator(false);
            } else {
                let resultsId = res['resultsId'];
                if (resultsId) {
                    resultsId = resultsId.replaceAll('"', '');
                }
                this.props.setResultsId(resultsId);
                this.props.setFailedIdMapping(res['failedIdMapping']);
                this.props.setColNames(res['colNames']);
                this.props.submitIndicator(false);
                this.props.setError(null);
                // this.props.navigate(`/${resultsId}`);
            }
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

        if (id === 'tolerance') {
            if ((value===0 || value) && Number.isInteger(value) && value>=0 && value < this.state.controls*this.state.replicates) {
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

    formatChangeHandler(e) {
        this.setState({
            plotFormat: e.target.value
        }
        // , ()=>{console.log(this.state.plotFormat)}
        )
    }


    render() {
        return (
          <div className='section'>  
            
            <h4 className='section-title my-4 px-3'>User Input</h4>
            
            <div className='section-main' id='user-input-container'>
                <Form className='mx-3' onSubmit={this.submit} encType='multipart/form-data'>
                    <Form.Group as={Row} className='mt-4 px-3'>
                        <Form.Label column sm={5}>Mass Spec File (.tsv)</Form.Label>
                        <Col sm={7}>
                            <Form.Control type='file' name='mass_file' required accept='.tsv' onChange={this.fileSelectHandler}/>
                            {this.state.fileInvalid ? 
                            <p className='invalid' display='none'>Please select a tsv file.</p>
                            : null}
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className='mt-4 px-3' controlId='controls'>
                        <Form.Label column sm={5}># Non-labelled Controls</Form.Label>
                        <Col sm={7}>
                            <Form.Control type='number' name='controls' required min='1' onChange={this.numberChangeHandler}/>
                            <Form.Control.Feedback type='invalid'>Please provide a positive integer.</Form.Control.Feedback>
                            {this.state.controlsInvalid ? 
                            <p className='invalid' display='none'>Please provide a positive integer.</p>
                            : null}
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className='mt-4 px-3' controlId='replicates'>
                        <Form.Label column sm={5}># Labelled Replicates</Form.Label>
                        <Col sm={7}>
                            <Form.Control type='number' name='replicates' required min='1' onChange={this.numberChangeHandler}/>
                            <Form.Control.Feedback type='invalid'>Please provide a positive integer.</Form.Control.Feedback>
                            {this.state.replicatesInvalid ? 
                            <p className='invalid' display='none'>Please provide a positive integer.</p>
                            : null}
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className='mt-4 px-3' controlId='tolerance'>
                        <Form.Label column sm={5}>Tolerance (optional)</Form.Label>
                        <Col sm={7}>
                            <Form.Control type='number' name='tolerance' placeholder='0' min='0' max={this.state.controls*this.state.replicates} onChange={this.numberChangeHandler}/>
                            <Form.Control.Feedback type='invalid'>Please provide a non-negative integer with value ≤ controls * replicates * conditions.</Form.Control.Feedback>
                            {this.state.toleranceInvalid ? 
                            <p className='invalid' display='none'>Please provide an integer in [0, #controls * #replicates).</p>
                            : null}
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className='mt-4 px-3' controlId='plot_format'>
                        <Form.Label column sm={5}>Plot Format (optional)</Form.Label>
                        <Col sm={7}>
                            <Form.Select name='plot_format' value={this.state.plotFormat} onChange={this.formatChangeHandler}>
                            {this.state.plotFormatList.map((format, i) =>
                             <option key={i} value={format} >{format}</option> 
                            )}
                            </Form.Select>
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
