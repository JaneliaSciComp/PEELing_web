import React from 'react';
import Navbar from './Navbar'
import './Header.css'


export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            //<div>
            <header className='header'>
                <h2>PEELing</h2>
                <Navbar />
            </header>
            //</div>
        )
    }
}