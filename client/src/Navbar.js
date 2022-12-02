import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import './Navbar.css'

export default class Navbar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            anchorEl: null,
            open: false
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }


    handleClick(e) {
        this.setState({
            anchorEl: e.currentTarget,
            open: true
        });
    }

    handleClose(e) {
        this.setState({
            anchorEl: null,
            open: false
        });
    }

    render() {
        return (
            
            <nav className='navbar'>
                <ul className='nav-list'>
                    <li className='nav-item'>
                        <a href='/analysis' className='link link-nav'>Analysis</a>
                    </li>
                    <li className='nav-item'>
                        <a href='/tutorial' className='link link-nav'>Tutorial</a>
                    </li>
                    <li className='nav-item'>
                        <a href='/blog' className='link link-nav'>Blog</a>
                    </li>
                </ul>

                <button 
                  id = 'menu-button'
                  type='button' 
                  className='btn btn-icon nav-hamburger'
                  aria-controls={this.state.open ? 'menu' : undefined} 
                  aria-haspopup="true"
                  aria-expanded={this.state.open ? 'true' : undefined}
                  onClick={this.handleClick}>
                    <MenuIcon />
                </button>
                <Menu
                  id = 'menu' 
                  anchorEl = {this.state.anchorEl}
                  open = {this.state.open}
                  onClose={this.handleClose}
                  menulistprops={{
                    'aria-labelledby': 'menu-button',
                  }}>
                    <MenuItem href='/analysis' onClick={this.handleClose}>Analysis</MenuItem>
                    <MenuItem href='/tutorial' onClick={this.handleClose}>Tutorial</MenuItem>
                    <MenuItem href='/blog' onClick={this.handleClose}>Blog</MenuItem>
                </Menu>
            </nav>
            
            
        )
    }
}