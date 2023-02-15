import React from 'react';
import Table from 'react-bootstrap/Table';


export default class TopProteins extends React.Component {
    constructor(props) {
        super(props); 

        this.state = {
            selectedCol: 0,
            proteinObj: null,
            heads: ['Entry', 'Gene Names', 'Protein names', 'Organism', 'Length'], //doesn't contain selected column name
            error: null,
        }
    }


    componentDidMount() {
        fetch('/api/proteinssorted/'+this.props.resultsId+'/'+this.props.colNames[this.state.selectedCol], {
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
                this.setState({proteinObj: res}); 
            }
        })
    }


    render() {
        return (
            <div className='proteins subsection'>
                <h4 className='subsection-title my-5 px-4'>Top Surface Proteins</h4>

                {this.state.error ?
                <div className='info-error mx-4 my-5 d-flex flex-column align-content-center'>
                    <p>Oops! Sorting Proteins went wrong!</p>
                </div>
                :
                <div>
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
