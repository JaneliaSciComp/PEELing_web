import React from 'react';
import {Form, Button, Image, Row, Col} from 'react-bootstrap';
import './QualityControl.css';


export default class QualityControl extends React.Component {
    constructor(props) {
        super(props); 
        
        this.state = {
            xIndex: 0,
            yIndex: 1,
            xTemp: 0,
            yTemp: 1,
            scatterQuery: null,
            colSelectionError: null,
        }
       
        this.makeScatter = this.makeScatter.bind(this);
        this.changeX = this.changeX.bind(this);
        this.changeY = this.changeY.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        if (!props.scatterError && !state.colSelectionError) {
            return {
                scatterQuery: 'x='+props.colNames[state.xIndex]+'&y='+props.colNames[state.yIndex],
            }
        } else {
            return null
        } 
    }


    makeScatter(e) {
        e.preventDefault();
        let x = this.state.xTemp;
        let y = this.state.yTemp;
        // check if x and y are the same
        if (x === y) {
            this.setState({
                xIndex: x,
                yIndex: y,
                colSelectionError: 'X and Y cannot be the same',
            }
            )
        } else {
            this.setState({
                xIndex: x,
                yIndex: y,
                colSelectionError: null,
            }
            )
        }
        
    }

    changeX(e) {
        this.setState({
            xTemp: e.target.selectedIndex,
        }
        )
    }

    changeY(e) {
        this.setState({
            yTemp: e.target.selectedIndex,
        }
        )
    }


    render() {
        return (
            <div className='qc subsection'>
                <h4 className='subsection-title my-5 px-4'>Correlation Analysis</h4>

                {this.state.error ?
                <div className='info-error mx-4 my-5 d-flex flex-column align-content-center'>
                    <p>Oops! Correlation Analysis went wrong!</p>
                </div>
                :
                <Row className='subsection-content qc-container mx-3 align-items-stretch'>
                    <Col md={6} className='heatmap-container align-items-end'>
                        <Image src={'/api/heatmap/'+this.props.resultsId} alt='logo' fluid='true'></Image>
                    </Col>
                    <Col md={6} className='scatterplot-container'>
                        {this.props.scatterError ?
                        <div className='info-error scatter-error'>
                            <p className='scatter-error my-4'>{this.props.scatterError}</p>
                        </div>
                        :
                        <div className='align-items-start'>
                            <Form className='px-3 d-flex justify-content-around align-items-center' onSubmit={this.makeScatter}>
                                <Col className='mx-2' sm={5}>
                                    <Form.Group as={Row} controlId='x_axis'>
                                        <Form.Label column sm={3}>X:</Form.Label>
                                        <Col className='ps-0' sm={9}>
                                            <Form.Select className='scatter-select' name='x' value={this.props.colNames[this.state.xTemp]} onChange={this.changeX}>
                                            {this.props.colNames.map((col, i) =>
                                            <option key={i} value={col} >{col}</option> 
                                            )}
                                            </Form.Select>
                                        </Col>
                                    </Form.Group>
                                </Col>
                                <Col className='mx-2' sm={5}>
                                    <Form.Group as={Row} controlId='y_axis'>
                                        <Form.Label column sm={3}>Y:</Form.Label>
                                        <Col className='ps-0' sm={9}>
                                            <Form.Select className='scatter-select' name='y' value={this.props.colNames[this.state.yTemp]} onChange={this.changeY}>
                                            {this.props.colNames.map((col, i) =>
                                            <option key={i} value={col} >{col}</option> 
                                            )}
                                            </Form.Select>
                                        </Col>
                                    </Form.Group>
                                </Col>
                                <Col className='mx-2' sm={2}>
                                    <Button type='submit' size='sm' className='btn-make mb-1' onSubmit={this.makeScatter}>Make</Button>
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
