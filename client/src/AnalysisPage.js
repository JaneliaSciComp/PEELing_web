import React from 'react';
import Header from './Header';
import './AnalysisPage.css';
import UserInput from './UserInput';
import Results from './Results';
import withRouter from './utils';


class Analysis extends React.Component{
    constructor(props) {
        super(props);
        console.log(this.props.router.params);
        console.log(this.props.router.location);
        this.state = {
            userInputSubmitted: false,
            resultsId: this.props.router.params.id, //'99f82c04-dcf8-4b9d-9ab7-d5fba67b290e',
            serverError: null, //'error'
        }

        this.submitIndicator = this.submitIndicator.bind(this);
        this.setResultsId = this.setResultsId.bind(this);
        this.setServerError = this.setServerError.bind(this);
    }


    submitIndicator(status) {
        this.setState({userInputSubmitted: status});
    }

    setResultsId(id) {
        if (id) {
            id = id.replaceAll('"', '');
        }
        this.setState({resultsId: id})
    }

    setServerError(error) {
        this.setState({serverError: error})
    }


    render() {
        return (
            <div className='top'>
                <Header />
                <UserInput 
                submitIndicator={this.submitIndicator} 
                setResultsId={this.setResultsId} 
                setServerError={this.setServerError} 
                navigate={this.props.router.navigate}/>
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

export default withRouter(Analysis);