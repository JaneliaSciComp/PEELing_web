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

    // componentDidMount() {
    //     this.setState({
    //         scatterQuery: 'x='+this.props.colNames[this.state.xIndex]+'&y='+this.props.colNames[this.state.yIndex]
    //     })
    // }


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
                // scatterQuery: null
            }
            // , ()=>{console.log(this.state)}
            )
        } else {
            this.setState({
                xIndex: x,
                yIndex: y,
                colSelectionError: null,
                // scatterQuery: 'x='+this.props.colNames[x]+'&y='+this.props.colNames[y]
            }
            // , ()=>{console.log(this.state)}
            )
        }
        
    }

    changeX(e) {
        this.setState({
            xTemp: e.target.selectedIndex,
            // colSelectionError: null,
            // scatterQuery: null
        }
        // , ()=>{console.log(this.state)}
        )
    }

    changeY(e) {
        this.setState({
            yTemp: e.target.selectedIndex,
            // colSelectionError: null
        }
        // , ()=>{console.log(this.state)}
        )
    }


    render() {
        // console.log('render');
        return (
            <div className='qc subsection'>
                <h4 className='subsection-title my-5 px-4'>Quality Control</h4>

                {this.state.error ?
                <div className='info-error mx-4 my-5 d-flex flex-column align-content-center'>
                    <p>Oops! Quality Control went wrong!</p>
                </div>
                :
                <Row className='subsection-content qc-container mx-3 align-items-stretch'>
                    <Col md={6} className='heatmap-container align-items-end'>
                        <Image src={'/api/heatmap/'+this.props.resultsId} alt='logo' fluid='true'></Image>
                    </Col>
                    <Col md={6} className='scatterplot-container'>
                        {this.props.scatterError ?
                        <div className='info-error'>
                            <p>{this.props.scatterError}</p>
                        </div>
                        :
                        <div className='align-items-start'>
                            <Form className='px-3 d-flex justify-content-around align-items-end' onSubmit={this.makeScatter}>
                                <Col className='mx-2' sm={5}>
                                    <Form.Group as={Row} controlId='x_axis'>
                                        <Form.Label column sm={3}>X:</Form.Label>
                                        <Col className='ps-0' sm={9}>
                                            <Form.Select name='x' value={this.props.colNames[this.state.xTemp]} onChange={this.changeX}>
                                            {this.props.colNames.map((col, i) =>
                                            <option className='scatter-option' key={i} value={col} >{col}</option> 
                                            )}
                                            </Form.Select>
                                        </Col>
                                    </Form.Group>
                                </Col>
                                <Col className='mx-2' sm={5}>
                                    <Form.Group as={Row} controlId='y_axis'>
                                        <Form.Label column sm={3}>Y:</Form.Label>
                                        <Col className='ps-0' sm={9}>
                                            <Form.Select name='y' value={this.props.colNames[this.state.yTemp]} onChange={this.changeY}>
                                            {this.props.colNames.map((col, i) =>
                                            <option key={i} value={col} >{col}</option> 
                                            )}
                                            </Form.Select>
                                        </Col>
                                    </Form.Group>
                                </Col>
                                <Col className='mx-2' sm={2}>
                                    <Button type='submit' className='btn-make' onSubmit={this.makeScatter}>Make</Button>
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
