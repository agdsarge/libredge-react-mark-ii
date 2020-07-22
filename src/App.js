import React, { Component } from 'react';
import { connect } from 'react-redux'
import {BrowserRouter as Router } from 'react-router-dom'
// import { Button } from 'semantic-ui-react'
import './App.css';

import { JWT_URL } from './constants'

import LoginContainer from './containers/LoginContainer' 

class App extends Component {


    componentDidMount() {   //Auth for jwt in local storage
        if(localStorage.getItem('jwt-libredge')) {
            fetch(JWT_URL, {
                method: "GET",
                headers: {Authentication: localStorage.getItem('jwt-libredge')}
            })
            .then(res => res.json())
            .then(d =>
                this.props.dispatch({type: 'SET_USER', payload: d}))
        }
    }


    render() {
        return(
            <div id='supra'>
                <Router>
                </Router>
                <div id='skateboardLogin'>
                    {this.props.currentUser ? null : <LoginContainer />}
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser,
        currentRoute: state.currentRoute}
}

export default connect(mapStateToProps)(App)
