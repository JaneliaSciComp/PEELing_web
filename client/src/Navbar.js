import React from 'react';
import { Link } from "react-router-dom";
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

        this.menuClickHandler = this.menuClickHandler.bind(this);
        this.closeHandler = this.closeHandler.bind(this);
    }


    menuClickHandler(e) {
        this.setState({
            anchorEl: e.currentTarget,
            open: true
        });
    }

    closeHandler(e) {
        this.setState({
            anchorEl: null,
            open: false
        });
    }

   
    render() {
        return (
            
            <nav className='navbar'>
                <ul className='navbar-list'>
                    <li className='navbar-item'>
                        <Link to='/' className='link link-nav'>Analysis</Link>
                    </li>
                    <li className='navbar-item'>
                        <Link to='/tutorial' className='link link-nav'>Tutorial</Link>
                    </li>
                    <li className='navbar-item'>
                        <Link to='/blog' className='link link-nav'>Blog</Link>
                    </li>
                </ul>

                <button 
                  id = 'menu-button'
                  type='button' 
                  className='btn btn-icon nav-hamburger'
                  aria-controls={this.state.open ? 'menu' : undefined} 
                  aria-haspopup="true"
                  aria-expanded={this.state.open ? 'true' : undefined}
                  onClick={this.menuClickHandler}>
                    <MenuIcon />
                </button>
                <Menu
                  id = 'menu' 
                  anchorEl = {this.state.anchorEl}
                  open = {this.state.open}
                  onClose={this.closeHandler}
                  menulistprops={{
                    'aria-labelledby': 'menu-button',
                  }}>
                    <MenuItem onClick={this.closeHandler}>
                        <Link to='/' className='link link-nav'>Analysis</Link>
                    </MenuItem>
                    <MenuItem onClick={this.closeHandler}>
                        <Link to='/tutorial' className='link link-nav'>Tutorial</Link>
                    </MenuItem>
                    <MenuItem onClick={this.closeHandler}>
                        <Link to='/blog' className='link link-nav'>Blog</Link>
                    </MenuItem>
                </Menu>
            </nav>
            
            
        )
    }
}
