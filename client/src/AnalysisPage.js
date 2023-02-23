import React from 'react';
import Header from './Header';
import './AnalysisPage.css';
import UserInput from './UserInput';
import Results from './Results';
// import withRouter from './utils';


export default class Analysis extends React.Component{
    constructor(props) {
        super(props);
    
        this.state = {
            userInputSubmitted: false,
            error: null, //'error'
        }

        this.submitIndicator = this.submitIndicator.bind(this);
        this.setError = this.setError.bind(this);
    }


    submitIndicator(status) {
        this.setState({userInputSubmitted: status});
    }


    setError(error) {
        this.setState({error: error})
    }


    render() {
        return (
            <div className='top'>
                <Header />
                <UserInput 
                submitIndicator={this.submitIndicator} 
                setResultsId={this.props.setResultsId} 
                setFailedIdMapping={this.props.setFailedIdMapping} 
                setError={this.setError} 
                setColNames={this.props.setColNames}
                />
                {(this.state.userInputSubmitted || this.props.resultsId || this.state.error) ?
                <Results 
                  userInputSubmitted={this.state.userInputSubmitted} 
                  resultsId={this.props.resultsId} 
                  failedIdMapping={this.props.failedIdMapping}
                  colNames={this.props.colNames} 
                  error={this.state.error}
                  setError={this.setError}
                  setOrganism={this.props.setOrganism}
                  organismId={this.props.organismId}/>
                : null}
            </div>
        )
    }
}