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

    switchCol(key) { //value is the value property of the toggleButton
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
                    heads: ['Rank', 'Entry', this.props.colNames[colIndex], 'Gene Names', 'Protein names', 'Organism', 'Length']
                }
                , ()=>{console.log(this.state.heads)}
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
                <div className='mx-3'>
                    <Tabs className="mb-1" id="controlled-tab-example" activeKey={this.state.selectedCol} onSelect={this.switchCol}>
                        {this.props.colNames[0] ?
                        this.props.colNames.map((col, i) =>
                        <Tab className='table-tab' eventKey={i} title={col}></Tab>
                        )
                        :null}
                    </Tabs>
                    
                    <div className='table-container'> 
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
                    </div>
                    {/* <div className='mx-4 mb-2 d-flex justify-content-between align-items-end'>
                        <span className='info'>({this.state.proteins.length} surface proteins found)</span>
                        <CopyToClipboard text={this.state.proteins.join(',')}
                          onCopy={() => this.setState({copied: true})}>
                            <Button className='btn' variant="outline-primary" size='sm'>{this.state.copied ? 'Copied' : 'Copy List'}</Button>
                        </CopyToClipboard>
                    </div>
                    <div className='box box-protein mx-3'>
                    {this.state.proteins.map((protein, i) => 
                        <a key={i} className='link protein-link' href={'https://www.uniprot.org/uniprotkb/'+protein}  target="_blank" rel="noreferrer">
                            {i<this.state.proteins.length-1 ? protein+', ' : protein}
                        </a>
                    )}
                    </div> */}
                </div>
                
                }
            </div>
        )
    }
}
