import React from 'react';
import Header from './Header';
import './AnalysisPage.css';
import UserInput from './UserInput';
import Results from './Results';


export default class Analysis extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            userInputSubmitted: false,
            resultsId: null, //'99f82c04-dcf8-4b9d-9ab7-d5fba67b290e',
            serverError: null, //'error'
        }

        this.submitIndicator = this.submitIndicator.bind(this);
        this.setResultsId = this.setResultsId.bind(this);
        this.setServerError = this.setServerError.bind(this);
    }


    submitIndicator(status) {
        this.setState({userInputSubmitted: status}
            // , function(){console.log('parent submitIndicator', this.state)}
            );
    }

    setResultsId(id) {
        id = id.replaceAll('\"', '');
        this.setState({resultsId: id}
            // , function(){console.log('parent resultsId', this.state)}
            )
    }

    setServerError(error) {
        this.setState({serverError: error}
            // , function(){console.log('parent serverError', this.state)}
            )
    }


    render() {
        return (
            <div id='top'>
                <Header />
                <UserInput 
                submitIndicator={this.submitIndicator} 
                setResultsId={this.setResultsId} 
                setServerError={this.setServerError} />
                {(this.state.userInputSubmitted || this.state.resultsId || this.state.serverError) ?
                <Results 
                  userInputSubmitted={this.state.userInputSubmitted} 
                  resultsId={this.state.resultsId} 
                  serverError={this.state.serverError}
                  setServerError={this.setServerError} />
                : null}
            </div>
        )
    }
}

