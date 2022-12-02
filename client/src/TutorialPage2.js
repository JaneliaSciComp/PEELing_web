import React from 'react';
import './TutorialPage2.css';
import Header from './Header';
import {Row, Col} from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';


export default class Tutorial2 extends React.Component {
    render() {
        return (
            <div className='top'>
                <Header />

                <Row className='main my-4'>
                    <Col sm={2} className='side-bar my-2 px-4' >
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <a className='link' href='#overview'>Overview</a>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <a className='link' href='#input'>Input</a>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <a className='link' href='#output'>Output</a>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col >
                    <Col sm={8} className='content'>
                        <h4 className='tutorial-title my-4 mx-4'>Tutorial</h4>
                    
                        <h5 className='intro-title mx-4 my-5' id='overview'>Overview</h5>
                        <p className='text mx-4'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>

                        <h5 className='intro-title mx-4 my-5' id='input'>Input</h5>
                        <p className='text mx-4'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>

                        <h5 className='intro-title mx-4 my-5' id='output'>Output</h5>
                        <p className='text mx-4'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </Col>

                    <Col sm={2}></Col>
                </Row>
                
            </div>
        )
    }
}                    