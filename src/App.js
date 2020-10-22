import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import 'reactstrap/dist/reactstrap.min';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import IndividualStatistics from './components/IndividualStatistics/IndividualStatistics';
import Standings from './components/Standings/Standings';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Navbar />
                <Route exact path='/home'>
                    <Home />
                </Route>
                <Redirect exact from='/' to='/home' />
                <Route exact path='/individualStatistics'>
                    <IndividualStatistics />
                </Route>
                <Route exact path='/standings'>
                    <Standings />
                </Route>
            </Router>
        </Provider>
    );
}

export default App;
