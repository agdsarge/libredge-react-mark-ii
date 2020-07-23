import React, { Component } from 'react';
import { connect } from 'react-redux'
import {BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import './App.css';

import { JWT_URL } from './constants'

import LoginContainer from './containers/LoginContainer'
// import GamesList from './containers/GamesList'
import ContentGrid from './containers/ContentGrid'
import NavBar from './components'

class App extends Component {

    componentDidMount() {   // Auth for jwt in local storage
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
                    <NavBar />
                    <Switch>
                        <Route exact path='/login' render={(rp) =>
                            this.props.currentUser ?
                                <Redirect to='/lobby'/>
                                    :
                                <ContentGrid {...rp} />}
                        />
                        <Route exact path='/register' render={(rp) =>
                            <ContentGrid {...rp} />} />

                        <Route exact path='/game' render={(rp) =>
                            this.props.currentUser ?
                                <ContentGrid {...rp} />
                                    :
                                <Redirect to='/login' />}
                        />
                        <Route exact path='/lobby' render={(rp) =>
                            this.props.currentUser ?
                                <ContentGrid {...rp} />
                                    :
                                <Redirect to='/login' />}
                        />
                        <Route path="*" render={(rp) => <ContentGrid {...rp} />}/>

                    </Switch>
                </Router>


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
