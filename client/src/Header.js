import React from 'react';
import Navbar from './Navbar'
import './Header.css'
// import logo from './Icon_Orange_Peel_DALL-E_1.png'


export default class Header extends React.Component {

    render() {
        return (
            //<div>
            <header className='header'>
                {/* <div className='logo-container d-flex align-items-end'>
                <img className='logo' src={logo}></img> */}
                <h2>PEELing</h2>
                {/* </div> */}
                <Navbar />
            </header>
            //</div>
        )
    }
}