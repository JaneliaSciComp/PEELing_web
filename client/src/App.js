import {
	BrowserRouter as Router,
	Route,
	Routes,
} from 'react-router-dom';
import React from 'react';
import './App.css';
import Analysis from './AnalysisPage';
import Tutorial from './TutorialPage';
import Data from './DataPage';
import Footer from "./Footer";
import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        resultsId: null, 
        failedIdMapping: null,
        colNames: null, 
        organismId: null,
    }

    this.setResultsId = this.setResultsId.bind(this);
    this.setFailedIdMapping = this.setFailedIdMapping.bind(this);
    this.setColNames = this.setColNames.bind(this);
    this.setOrganism = this.setOrganism.bind(this);
  }

  setResultsId(id) {
    this.setState({resultsId: id})
  }

  setFailedIdMapping(num) {
    this.setState({failedIdMapping: num})
  }

  setColNames(names) {
    this.setState({colNames: names})
  }

  setOrganism(organism) {
    this.setState({organismId: organism})
  }
  
  render() {
      return (
        <div className="App">
          <Router>
              <Routes>
                  <Route path='/'
                    element={<Analysis 
                    setResultsId={this.setResultsId} 
                    resultsId={this.state.resultsId}
                    setFailedIdMapping={this.setFailedIdMapping} 
                    failedIdMapping={this.state.failedIdMapping}
                    setColNames={this.setColNames}
                    colNames={this.state.colNames}
                    setOrganism={this.setOrganism}
                    organismId={this.state.organismId}
                    />} />
                  {/* <Route path='/:id'
                    element={<Analysis setResultsId={this.setResultsId} />}/> */}
                  <Route path='/tutorial'
                    element={<Tutorial />}/>
                  <Route path='/data'
                    element={<Data />}/>
              </Routes>
          </Router>
          <Footer/>
        </div>
      );
  }
}


