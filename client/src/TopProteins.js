import React from 'react';
import {Table, Tab, Tabs} from 'react-bootstrap';
import './TopProteins.css';


export default class TopProteins extends React.Component {
    constructor(props) {
        super(props); 

        this.state = {
            selectedCol: 0,
            proteinObj: null,
            heads: null,
            error: null,
        }

        this.switchCol = this.switchCol.bind(this);
    }


    componentDidMount() {
        this.fetchSortedData(this.state.selectedCol);
    }

    switchCol(key) { 
        this.setState({selectedCol: key});
        this.fetchSortedData(key);
    }

    fetchSortedData(colIndex) {
        fetch('/api/proteinssorted/'+this.props.resultsId+'/'+this.props.colNames[colIndex], {
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
            } else {
                this.setState({
                    proteinObj: res,
                    heads: ['Rank', 'UniProt ID', this.props.colNames[colIndex], 'Gene Name', 'Protein Name', 'Organism', 'Length (amino acids)']
                }
                ); 
            }
        })
    }


    render() {
        return (
            <div className='top-proteins subsection'>
                <h4 className='subsection-title my-5 px-4'>Top Surface Proteins</h4>

                {this.state.error ?
                <div className='info-error mx-4 my-5 d-flex flex-column align-content-center'>
                    <p>Oops! Sorting Proteins went wrong!</p>
                </div>
                :
                <div className='subsection-content mx-3'>
                    <div className='tabs-container'>
                    <Tabs className="table-tabs mx-0 mb-1" size='sm' id="controlled-tab-example" activeKey={this.state.selectedCol} onSelect={this.switchCol}>
                        {this.props.colNames[0] ?
                        this.props.colNames.map((col, i) =>
                        <Tab key={i} eventKey={i} title={col}></Tab>
                        )
                        :null}
                    </Tabs>
                    </div>
                    <div className='table-container'> 
                    <Table striped responsive size='sm' className='protein-table'>
                        <thead className='table-head protein-table-head'>
                            <tr className='protein-table-row'>
                                {this.state.heads ?
                                this.state.heads.map((head, i) => {
                                    
                                    if (i===2 || i===6) { 
                                        return <th className='table-head-cell long-content-cell-head' key={i}>{head}</th>
                                    } else {
                                        return <th className='table-head-cell' key={i}>{head}</th>
                                    }
                                })
                                : null}
                            </tr>
                        </thead>
                        <tbody className='table-body'>
                            {this.state.proteinObj ?
                            this.state.proteinObj.map((obj, i) => 
                            <tr className='protein-table-row' key={i}>
                                <td className='protein-table-cell px-3' key={0}>{i+1}</td>
                                {obj.map((entry, j) => {
                                    if (j===0) {
                                        return <td className='protein-table-cell' key={j+1}>
                                            <a className='link protein-link' href={'https://www.uniprot.org/uniprotkb/'+entry}  target="_blank" rel="noreferrer">{entry}</a>
                                        </td>
                                    }
                                    if (j>=2 && j<=4){ 
                                        return <td className='protein-table-cell long-content-cell-data' key={j+1}>{entry}</td>
                                    } else {
                                        return <td className='protein-table-cell' key={j+1}>{entry}</td>
                                    }
                                })} 
                            </tr>)
                            : null}
                        </tbody>
                        
                    </Table>
                    </div>
                </div>
                
                }
            </div>
        )
    }
}
