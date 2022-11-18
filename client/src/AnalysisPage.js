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
            resultsId: '33925cd8-a73e-4031-a893-1f92116ce74a',
        }

        this.submitIndicator = this.submitIndicator.bind(this);
        this.resultsIndicator = this.resultsIndicator.bind(this);
    }

    submitIndicator(status) {
        this.setState({userInputSubmitted: status}
            , function(){console.log('parent submitIndicator', this.state)}
            );
    }

    resultsIndicator(status) {
        this.setState({resultsReceived: status}
            , function(){console.log('parent resultsIndicator', this.state)}
            )
    }


    render() {
        return (
            <div id='top'>
                <Header />
                <UserInput submitIndicator={this.submitIndicator} resultsIndicator={this.resultsIndicator} />
                {(this.state.userInputSubmitted || this.state.resultsId) ?
                <Results 
                  userInputSubmitted={this.state.userInputSubmitted} 
                  resultsId={this.state.resultsId} />
                : null}
            </div>
        )
    }
}

