import {
	BrowserRouter as Router,
	Route,
	Routes
} from 'react-router-dom';
import React from 'react';
import './App.css';
import Analysis from './AnalysisPage';
import Tutorial from './TutorialPage';
import Tutorial2 from './TutorialPage2';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends React.Component {

  render() {
      return (
        <div className="App">
          <Router>
              <Routes>
                  <Route path='/analysis' 
                    element={<Analysis />}/>
                  <Route path='/tutorial' 
                    element={<Tutorial />}/>
                  <Route path='/blog' 
                    element={<Tutorial2 />}/>
              </Routes>

          </Router>
        </div>
      );
  }
 
}


