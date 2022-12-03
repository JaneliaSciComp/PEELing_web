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
                        <a href='/analysis' className='link link-nav'>Analysis</a>
                    </MenuItem>
                    <MenuItem onClick={this.closeHandler}>
                        <a href='/tutorial' className='link link-nav'>Tutorial</a>
                    </MenuItem>
                    <MenuItem onClick={this.closeHandler}>
                        <a href='/blog' className='link link-nav'>Blog</a>
                    </MenuItem>
                </Menu>
            </nav>
            
            
        )
    }
}