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
            resultsReceived: true,
            ratioPlots: ['../results/TPR_FPR_Ratio_128C_127C.png',
                        '../results/TPR_FPR_Ratio_128C_129N.png',
                        '../results/TPR_FPR_Ratio_129C_127C.png'],
            rocPlots: ['../results/ROC_Ratio_128C_127C.png', 
                      '../results/ROC_Ratio_128C_129N.png',
                      '../results/ROC_Ratio_129C_127C.png'],
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
                {(this.state.userInputSubmitted || this.state.resultsReceived) ?
                <Results 
                  userInputSubmitted={this.state.userInputSubmitted} 
                  resultsReceived={this.state.resultsReceived} 
                  ratioPlots={this.state.ratioPlots}
                  rocPlots={this.state.rocPlots}/>
                : null}
            </div>
        )
    }
}

