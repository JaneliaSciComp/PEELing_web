import React from 'react';
import {Form, Button, Image, Row, Col} from 'react-bootstrap';
import './QualityControl.css';



export default class QualityControl extends React.Component {
    constructor(props) {
        super(props); // resultsId
        
        this.state = {
            xIndex: 0,
            yIndex: 1,
            scatterQuery: null,//
            colSelectionError: null,
        }
        // console.log('constructor ');
        // console.log(this.props);
        // console.log(this.state);
        this.makeScatter = this.makeScatter.bind(this);
        this.changeX = this.changeX.bind(this);
        this.changeY = this.changeY.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        //console.log('derived')
        if (!props.scatterError && !state.colSelectionError) {
            return {
                scatterQuery: 'x='+props.colNames[state.xIndex]+'&y='+props.colNames[state.yIndex],
            }
        } else {
            return null
        } 
    }

    // componentDidMount(){
    //     console.log('componentDidMount');
    //     console.log(this.props);
    //     this.setState({
    //         scatterQuery: 'x='+this.props.colNames[this.state.xIndex]+'&y='+this.props.colNames[this.state.yIndex],
    //     }
    //     , ()=>{console.log(this.state)}
    //     )
        
    // }


    makeScatter(e) {
        e.preventDefault();
        console.log(this.state.xIndex, this.state.yIndex, this.state.xIndex == this.state.yIndex, this.state.xIndex === this.state.yIndex);
        // check if x and y are the same
        if (this.state.xIndex === this.state.yIndex) {
            this.setState({
                colSelectionError: true
            })
        } else {
            let query = 'x='+this.props.colNames[this.state.xIndex]+'&y='+this.props.colNames[this.state.yIndex];
            this.setState({
                scatterQuery: query
            })
        }
        
    }

    changeX(e) {
        console.log(e.target.selectedIndex);
        this.setState({
            xIndex: e.target.selectedIndex
        }
        , ()=>{console.log(this.state.xIndex)}
        )
    }

    changeY(e) {
        this.setState({
            yIndex: e.target.key
        })
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
                <Row className='qc-container mx-3'>
                    <Col md={6} className='heatmap-container'>
                        <Image className='my-3' src={'/api/heatmap/'+this.props.resultsId} alt='logo' fluid='true'></Image>
                    </Col>
                    <Col md={6}>
                        {this.props.scatterError ?
                        <div className='info-error'>
                            <p>{this.props.scatterError}</p>
                        </div>
                        :
                        <div>
                            <Form as={Row} size='sm' className='px-3' onSubmit={this.makeScatter}>
                                <Col sm={5}>
                                    <Form.Group as={Row} controlId='x_axis'>
                                        <Form.Label column sm={3}>X:</Form.Label>
                                        <Col sm={9}>
                                            <Form.Select size='sm' name='x' value={this.props.colNames[this.state.xIndex]} onChange={this.changeX}>
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
                                            <Form.Select size='sm' name='y' value={this.props.colNames[this.state.yIndex]} onChange={this.changeY}>
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
