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
        resultsId: '5167a20f-8d91-4e6a-860c-4cbd50cef6ae',  //null,
        failedIdMapping: null,
    }

    this.setResultsId = this.setResultsId.bind(this);
    this.setFailedIdMapping = this.setFailedIdMapping.bind(this);
  }

  setResultsId(id) {
    this.setState({resultsId: id})
  }

  setFailedIdMapping(num) {
    this.setState({failedIdMapping: num})
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


