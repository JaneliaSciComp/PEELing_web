import React from 'react';
import Header from './Header';

export default class Data extends React.Component {

    render() {
        return (
            <div className='top'>
                <Header />
                <div className='subsection text-start ms-5 ps-5'>
                    <ul>
                        <li><a className='link underline-link' href='/api/exampledata'>Example data (.tsv): </a>cell-surface proteome of mouse Purkinje cells at postnatal day 15 (Shuster, Li et al., 2022—PMID:  36220098)</li>
                    </ul>
                    <p className='ms-4'>(If the downloaded file does not have the ".tsv" extension, please add it manually.)</p>
                </div>
            </div>
        )
    }
}