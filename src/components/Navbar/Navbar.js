import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

class Navbar extends Component {
    render() {
        return (
            <div className='navbar-wrapper'>
                <div className='navbar-freudware-wrapper'>
                    <a className='navbar-brand navbar-freudware' href='https://github.com/bfreud94' target='_blank' rel='noopener noreferrer'>Freudware</a>
                </div>
                <nav className='navbar navbar-expand-sm navbar-expand-lg'>
                    <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                        <ul className='navbar-nav ml-auto'>
                            <li className='nav-item navbar-item'>
                                <Link className='nav-link' to='/home'>Home</Link>
                            </li>
                            <li className='nav-item navbar-item'>
                                <Link className='nav-link' to='/individualStatistics'>Individual Statistics</Link>
                            </li>
                            <li className='nav-item navbar-item'>
                                <Link className='nav-link' to='/standings'>Standings</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Navbar;