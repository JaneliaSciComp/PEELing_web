import React from 'react';
import {Table, Form, Row, Col, Button} from 'react-bootstrap';
import './Panther.css';


export default class Panther extends React.Component {
    constructor(props) {
        super(props); 

        this.state = {
            // selectedCol: 0,
            organisms: null,
            selectedOrganism: 'blank',
            heads: [],
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
                
                <Form size='sm' className='mx-3 d-flex align-items-end' onSubmit={this.runPanther}>
                    <Col sm={5}>
                        <Form.Group as={Row} className='px-3 d-flex' controlId='organism'>
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
                    <Col className='text-center' sm={2}>
                        <Button type='submit' className='btn-submit me-0' onSubmit={this.runPanther}>Run</Button>
                    </Col>
                    <Col sm={5}>
                        {this.state.organismError ?
                        <p className='invalid my-auto' >Please choose organism</p>
                        :
                        null}
                    </Col>
                </Form>
                    
                    {/* <div className='table-container'> 
                    <Table striped responsive size='sm' className='protein-table'>
                        <thead className='protein-table-head'>
                            <tr className='protein-table-row'>
                                {this.state.heads ?
                                this.state.heads.map((head, i) => {
                                    
                                    if (i==2) { //third head is name of the col on which the data is sorted, it could be long
                                        console.log(i);
                                        return <th className='protein-table-head-cell long-content-cell-head' key={i}>{head}</th>
                                    } else {
                                        return <th className='protein-table-head-cell' key={i}>{head}</th>
                                    }
                                })
                                : null}
                            </tr>
                        </thead>
                        <tbody className='table-body'>
                            {this.state.proteinObj ?
                            this.state.proteinObj.map((obj, i) => 
                            <tr className='protein-table-row'>
                                <td className='protein-table-cell px-3'>{i+1}</td>
                                {obj.map((entry, j) => {
                                    if (j==0) {
                                        return <td className='protein-table-cell'>
                                            <a key={i} className='link protein-link' href={'https://www.uniprot.org/uniprotkb/'+entry}  target="_blank" rel="noreferrer">{entry}</a>
                                        </td>
                                    }
                                    if (j>=2 && j<=4){ //the gene name, pro name, organism columns, content could be long
                                        return <td className='protein-table-cell long-content-cell-data'>{entry}</td>
                                    } else {
                                        return <td className='protein-table-cell'>{entry}</td>
                                    }
                                })} 
                            </tr>)
                            : null}
                        </tbody>
                        
                    </Table>
                    </div> */}
                
                {/* {this.state.submitted ?
                <div>Show results</div>
                :
                <div className='info-error mx-4 my-5 d-flex flex-column align-content-center'>
                    <p>Oops! Panther enrichment went wrong!</p>
                </div>
                :
                <div className='mx-3'>    
                </div>
                } */}
            </div>
        )
    }
}
