import React from 'react';
import Header from './Header';

export default class Data extends React.Component {

    render() {
        return (
            <div className='top'>
                <Header />
                <div className='subsection text-start ms-5 ps-5'>
                    <ul>
                        <li><a className='link underline-link' href='/api/exampledata'>Example data</a></li>
                    </ul>
                </div>
            </div>
        )
    }
}