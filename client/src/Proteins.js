import React from 'react';
import Button from 'react-bootstrap/Button';
import './Proteins.css';
import {CopyToClipboard} from 'react-copy-to-clipboard';


export default class Proteins extends React.Component {
    constructor(props) {
        super(props); //resultsId

        this.state = {
            proteins: [],
            error: null,
            copied: false,
        }
    }


    componentDidMount() {
        fetch('/api/proteins/'+this.props.resultsId, {
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
                this.setState({proteins: res['protein_list']}); 
            }
        })
    }


    render() {
        return (
            <div className='proteins subsection'>
                <h4 className='subsection-title my-5 px-4'>Post-Cutoff Proteome</h4>

                {this.state.error ?
                <div className='info-error mx-4 my-5 d-flex flex-column align-content-center'>
                    <p>Oops! Proteins went wrong!</p>
                </div>
                :
                <div className='subsection-content'>
                    <div className='mx-4 mb-2 d-flex justify-content-between align-items-end'>
                        <span className='info proteins-info'>({this.state.proteins.length} proteins passed the cutoff analysis and are included in the final proteome)</span>
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
                    </div>
                </div>
                
                }
            </div>
        )
    }
}
