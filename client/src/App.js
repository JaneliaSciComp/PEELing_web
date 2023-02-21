import {
	BrowserRouter as Router,
	Route,
	Routes,
} from 'react-router-dom';
import React from 'react';
import './App.css';
import Analysis from './AnalysisPage';
import Tutorial from './TutorialPage';
import Blog from './BlogPage';
import Footer from "./Footer";
import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        resultsId: 'b102d7ff-8872-4ac3-b1cc-4f28bb6814df', //home 'bcee7f9c-c3f2-4754-b373-7a219a152d5b', //work 'e88b066a-7c04-42e2-b994-bda8829ee0a8',  //null,
        failedIdMapping: null,
        colNames: ["20180907_TMT8_SCX_SingleShot__126_127N", "20180907_TMT8_SCX_SingleShot__129C_127N", "20180907_TMT8_SCX_SingleShot__126_128C", "20180907_TMT8_SCX_SingleShot__129C_128C"]
        //['2', '3', '4', '5', '6'],
    }

    this.setResultsId = this.setResultsId.bind(this);
    this.setFailedIdMapping = this.setFailedIdMapping.bind(this);
    this.setColNames = this.setColNames.bind(this);
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
                    />} />
                  {/* <Route path='/:id'
                    element={<Analysis setResultsId={this.setResultsId} />}/> */}
                  <Route path='/tutorial'
                    element={<Tutorial />}/>
                  <Route path='/blog'
                    element={<Blog />}/>
              </Routes>

          </Router>
          <Footer/>
        </div>
      );
  }
}


