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
        resultsId: null, //'7c07ed44-6536-4b36-a5e2-71ffc6a1b327', //null, //home 'b102d7ff-8872-4ac3-b1cc-4f28bb6814df', //work '67847647-5a7e-46a7-81f1-4189d428d9fe',  //null,
        failedIdMapping: null,
        colNames: null, //["20180907_TMT8_SCX_SingleShot__126_127N", "20180907_TMT8_SCX_SingleShot__129C_127N", "20180907_TMT8_SCX_SingleShot__126_128C", "20180907_TMT8_SCX_SingleShot__129C_128C"]
        //['1', '2', '3', '4', '5', '6'],
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


