import React from 'react';
import Header from './Header';
import UserInput from './UserInput';
import Results from './Results';
// import withRouter from './utils';


export default class Analysis extends React.Component{
    constructor(props) {
        super(props);
    
        this.state = {
            userInputSubmitted: false,
            error: null,
            cellCompartment: null,
        }

        this.submitIndicator = this.submitIndicator.bind(this);
        this.setCellCompartment = this.setCellCompartment.bind(this);
        this.setError = this.setError.bind(this);
    }


    submitIndicator(status) {
        this.setState({userInputSubmitted: status});
    }


    setError(error) {
        this.setState({error: error})
    }

    setCellCompartment(value) {
      this.setState({cellCompartment: value});
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
                setCellCompartment={this.setCellCompartment}
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
                  organismId={this.props.organismId}
                  cellCompartment={this.state.cellCompartment}
                />
                : null}
            </div>
        )
    }
}
