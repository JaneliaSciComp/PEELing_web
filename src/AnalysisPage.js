import React from 'react';
import Header from './Header';
import './AnalysisPage.css';
import UserInput from './UserInput';


export default class Analysis extends React.Component{
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div id='top'>
                <Header />

                
                <UserInput />
                
            </div>
        )
    }
}

