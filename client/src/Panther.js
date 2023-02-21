import React from 'react';
import {Table, Form, Row, Col, Button, Spinner} from 'react-bootstrap';
import './Panther.css';


export default class Panther extends React.Component {
    constructor(props) {
        super(props); 

        this.state = {
            // selectedCol: 0,
            organisms: null,
            selectedOrganism: 'blank',
            pantherResults: null,
            error: null,
            organismError: false,
            submitted: false,
        }

        this.switchOrganism = this.switchOrganism.bind(this);
        this.runPanther = this.runPanther.bind(this);
    }


    componentDidMount() {
        fetch("/api/organism/", { 
            method: 'GET'
        }).then(res => {
            //console.log(res);
            if (res.ok) {
                return res.json(); 
            } else {
                this.setState({error: res.statusText});
            }
        }).then(res => {
            if (res['error']) {
                this.setState({error: res['error']});
            } else {
                this.setState({
                    organisms: res,
                }); 
            }
        })

        // fetch panther results if it's alraady done
        fetch('/api/cachedpanther/'+this.props.resultsId, {
            method: 'GET'
        }).then(res => {
            if (res.ok) {
                return res.json(); 
            } else {
                this.setState({error: res.statusText}); 
            }
        }).then(res => {
            if (res['error']) {
                this.setState({error: res['error']});
            } else if (!res['noResults']) {
                this.setState({
                    pantherResults: res,
                }
                , ()=>{console.log(this.state.pantherResults)}
                ); 
            }
        })
    }

    switchOrganism(e) { 
        this.setState({selectedOrganism: e.target.value});
    }

    runPanther(e) {
        e.preventDefault();
        if (this.state.selectedOrganism !== 'blank') {
            this.setState({
                pantherResults: null,
                error: null,
                organismError: false,
                submitted: true,
            })

            let orgId = this.state.organisms[this.state.selectedOrganism];
            fetch('/api/panther/'+this.props.resultsId+'?organism_id='+orgId, {
                method: 'GET'
            }).then(res => {
                if (res.ok) {
                    return res.json(); 
                } else {
                    this.setState({
                        error: res.statusText,
                        pantherResults: null,
                        organismError: false,
                        submitted: false,
                    }); 
                }
            }).then(res => {
                if (res['error']) {
                    this.setState({
                        error: res['error'],
                        pantherResults: null,
                        organismError: false,
                        submitted: false,
                    });
                } else {
                    this.setState({
                        pantherResults: res,
                        error: null,
                        organismError: false,
                        submitted: false,
                    }
                    , ()=>{console.log(this.state.pantherResults)}
                    ); 
                }
            })
        } else {
            this.setState({
                organismError: true,
            })
        }
        
    }


    render() {
        return (
            <div className='panther subsection'>
                <h4 className='subsection-title my-5 px-4'>Enrichment Analysis (<a className='link panther-link' href={'http://www.pantherdb.org/'}  target="_blank" rel="noreferrer">Panther</a>)</h4>
                
                <div className='subsection-content panther-container'>
                <Form size='sm' className='mx-3 d-flex align-items-end' onSubmit={this.runPanther}>
                    <Col md={5}>
                        <Form.Group as={Row} className='px-2 d-flex justify-content-start' controlId='organism'>
                            <Form.Label column sm={4}>Organism</Form.Label>
                            <Col className='ps-0' sm={8}>
                                <Form.Select name='organism' onChange={this.switchOrganism}>
                                    <option value='blank'>Choose organism</option>
                                    {this.state.organisms ? 
                                    Object.keys(this.state.organisms).map((org, i) =>
                                    <option key={i} value={org} >{org}</option>)
                                    : null
                                    }
                                </Form.Select>
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col className='text-center' md={2}>
                        <Button type='submit' className='btn-send me-0' onSubmit={this.runPanther}>Send</Button>
                    </Col>
                    <Col md={5}>
                        {this.state.organismError ?
                        <p className='invalid my-auto' >Please choose organism</p>
                        :
                        null}
                    </Col>
                </Form>
                    
                
                {this.state.pantherResults ?
                <Row className='panther-table-container mx-1'>
                    {Object.keys(this.state.pantherResults).map((category, i) => 
                    <Col className='py-3' lg={4} key={i}>
                        <p className='table-title'>{category.replaceAll('_', ' ')}</p>
                        <div className='table-container' > 
                        <Table striped responsive size='sm' className='panther-table'>
                            <thead className='table-head panther-table-head'>
                                <tr className='panther-table-row'>
                                    <th className='table-head-cell' key={0}>Rank</th>
                                    <th className='table-head-cell term-cell-head' key={1}>Term</th>
                                    <th className='table-head-cell' key={2}>FDR</th>
                                </tr>
                            </thead>
                            <tbody className='table-body'>
                                {this.state.pantherResults[category].map((arr, j) => 
                                <tr className='panther-table-row' key={j}>
                                    <td className='panther-table-cell px-3' key={0}>{j+1}</td>
                                    <td className='panther-table-cell term-cell-data' key={1}>{arr[0]}</td>
                                    <td className='panther-table-cell' key={2}>{arr[1].toExponential(3)}</td>
                                </tr>)}
                            </tbody>
                        </Table>
                        </div>
                    </Col>    
                    )}
                    
                    
                </Row>
                :
                <div>
                    {this.state.error ?
                    <div className='info-error mx-4 my-5 d-flex flex-column align-content-center'>
                        <p>Oops! Panther enrichment went wrong!</p>
                        <p>{this.state.error}</p>
                    </div>
                    :
                    <div>
                        {this.state.submitted ?
                        <div className='info mx-2 my-5 d-flex flex-row justify-content-center align-items-center'>
                            <Spinner className='spinner mx-3' animation='border' role='status'>
                                <span className='visually-hidden'>Loading</span>
                            </Spinner>
                            <p className='mx-2 my-4'>Communicating with Panther</p>
                        </div>
                        :
                        null
                        }
                    </div>
                    }
                </div>
                }

                </div>
            </div>
        )
    }
}
