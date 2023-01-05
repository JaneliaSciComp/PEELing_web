import React from 'react';
import './TutorialPage.css';
import Header from './Header';
// import {Row, Col} from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';


export default class Tutorial2 extends React.Component {
    render() {
        return (
            <div className='top'>
                <Header />

                {/* <Row className='main my-4 mx-5'> */}
                <div className='main my-4 px-5'>

                
                    {/* <Col sm={2} className='sidebar my-2' > */}
                    {/* <div className='sidebar'> */}
                        <ListGroup className='sidebar-menu px-2' variant='flush'>
                            <ListGroup.Item>
                                <a className='link' href='#overview-anchor'>Overview</a>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <a className='link' href='#input-anchor'>Input</a>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <a className='link' href='#output-anchor'>Output</a>
                            </ListGroup.Item>
                        </ListGroup>
                    {/* </div> */}
                    {/* </Col > */}
                    {/* <Col sm={8} className='content'> */}
                    <div className='content'>
                        <h4 className='tutorial-title my-4 mx-4' id='overview-anchor'>Tutorial</h4>
                    
                        <h5 className='intro-title mx-4 my-5' id='overview'>Overview</h5>
                        <p className='text my-0 mx-4'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                        <p className='my-0 py-3' id='input-anchor'></p>
                        
                        <h5 className='intro-title mx-4 my-5' id='input'>Input</h5>
                        <p className='text my-0 mx-4'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                        <p className='my-0 py-3' id='output-anchor'></p>

                        <h5 className='intro-title mx-4 my-5' id='output'>Output</h5>
                        <p className='text mx-4'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </div>
                    {/* <div className='placeholder'></div> */}
                    {/* </Col> */}

                    {/* <Col sm={2}></Col> */}

                </div>
                {/* </Row> */}
                
            </div>
        )
    }
}                    