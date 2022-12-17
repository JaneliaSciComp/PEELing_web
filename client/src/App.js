import {
	BrowserRouter as Router,
	Route,
	Routes,
} from 'react-router-dom';
import React from 'react';
import './App.css';
import Analysis from './AnalysisPage';
// import Tutorial from './TutorialPage';
import Tutorial2 from './TutorialPage2';
import Blog from './Blog';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        resultsId: null,
    }

    this.setResultsId = this.setResultsId.bind(this);
  }

  setResultsId(id) {
    this.setState({resultsId: id})
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
                    />} />
                  {/* <Route path='/:id'
                    element={<Analysis setResultsId={this.setResultsId} />}/> */}
                  <Route path='/tutorial'
                    element={<Tutorial2 />}/>
                  <Route path='/blog'
                    element={<Blog />}/>
              </Routes>

          </Router>
        </div>
      );
  }
}


