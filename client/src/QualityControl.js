import React from 'react';
import {Form, Button, Image, Row, Col} from 'react-bootstrap';
import './QualityControl.css';



export default class QualityControl extends React.Component {
    constructor(props) {
        super(props); // resultsId
        
        this.state = {
            x: null,
            y: null,
            scatterQuery: null,
            scatterError: null,
            colSelectionError: null,
        }

        this.makeScatter = this.makeScatter.bind(this);
        this.changeX = this.changeX.bind(this);
        this.changeY = this.changeY.bind(this);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.colNames.length >= 2) {
            return {
                x: nextProps.colNames[0],
                y: nextProps.colNames[1],
                scatterQuery: 'x='+nextProps.colNames[0]+'&y='+nextProps.colNames[1],
                scatterError: null,
                colSelectionError: null,
            }
        } else {
            return {
                x: null,
                y: null,
                scatterQuery: null,
                scatterError: 'Too few columns to make scatter plot',
                colSelectionError: null,
            }
        }
    }


    makeScatter(e) {
        e.preventDefault();

        // check if x and y are the same
        if (this.state.x === this.state.y) {
            this.setState({
                colSelectionError: true
            })
        } else {
            let query = 'x='+this.state.x+'&y='+this.state.y;
            this.setState({
                scatterQuery: query
            })
            return;
        }
        
    }

    changeX(e) {
        console.log('x '+e.target.value);
        this.setState({
            x: e.target.value
        }
        , ()=>{console.log(this.state.x)}
        )
    }

    changeY(e) {
        this.setState({
            y: e.target.value
        })
    }



    render() {
        return (
            <div className='qc subsection'>
                <h4 className='subsection-title my-5 px-4'>Quality Control</h4>

                {this.state.error ?
                <div className='info-error mx-4 my-5 d-flex flex-column align-content-center'>
                    <p>Oops! Quality Control went wrong!</p>
                </div>
                :
                <Row className='qc-container mx-3'>
                    <Col md={6} className='heatmap-container'>
                        <Image className='my-3' src={'/api/heatmap/'+this.props.resultsId} alt='logo' fluid='true'></Image>
                    </Col>
                    <Col md={6}>
                        {this.state.scatterError ?
                        <div className='info-error'>
                            <p>{this.state.scatterError}</p>
                        </div>
                        :
                        <div>
                            <Form as={Row} size='sm' className='px-3' onSubmit={this.makeScatter}>
                                <Col sm={5}>
                                    <Form.Group as={Row} controlId='x_axis'>
                                        <Form.Label column sm={3}>X:</Form.Label>
                                        <Col sm={9}>
                                            <Form.Select size='sm' name='x' value={this.state.x} onChange={this.changeX}>
                                            {this.props.colNames.map((col, i) =>
                                            <option key={i} value={col} >{col}</option> 
                                            )}
                                            </Form.Select>
                                        </Col>
                                    </Form.Group>
                                </Col>
                                <Col sm={5}>
                                    <Form.Group as={Row} controlId='y_axis'>
                                        <Form.Label column sm={3}>Y:</Form.Label>
                                        <Col sm={9}>
                                            <Form.Select size='sm' name='y' value={this.state.y} onChange={this.changeY}>
                                            {this.props.colNames.map((col, i) =>
                                            <option key={i} value={col} >{col}</option> 
                                            )}
                                            </Form.Select>
                                        </Col>
                                    </Form.Group>
                                </Col>
                                <Col sm={2}>
                                    <Button size='sm' type='submit' className='btn-submit' onSubmit={this.makeScatter}>Submit</Button>
                                </Col>
                            </Form>

                            {this.state.colSelectionError ?
                            <div className='info-error'>
                                <p>{this.state.colSelectionError}</p>
                            </div>
                            :
                            <Image className='my-3' src={"/api/scatter/"+this.props.resultsId +"?"+this.state.scatterQuery} alt='logo' fluid='true'></Image>
                            }
                            
                        </div>
                        }
                    </Col>
                </Row>
                }
            </div>
        );
    }
}
