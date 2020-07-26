import React, { Component } from 'react';
import { connect } from 'react-redux'
import {BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
// import { Button } from 'semantic-ui-react'
import './App.css';

import { JWT_URL } from './constants'

import LoginContainer from './containers/LoginContainer'
import RegisterContainer from './containers/RegisterContainer'
import ContentGrid from './containers/ContentGrid'
import GamesList from './containers/GamesList'
import NavBar from './components/NavBar'
import GameplayArea from './components/GameplayArea'
import NewGameContainer from './containers/NewGameContainer'
import Splash from './components/Splash'

class App extends Component {

    componentDidMount() {   // Auth for jwt in local storage
        if (localStorage.getItem('jwt-libredge')) {
            console.log("HELLO FROM APP JWT REQUEST")
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
                                <ContentGrid {...rp} focusComponent={<LoginContainer />} />}
                        />
                        <Route exact path='/register' render={(rp) =>
                            this.props.currentUser ? <Redirect to='/lobby' /> :
                            <ContentGrid {...rp} focusComponent={<RegisterContainer />} /> } />

                        <Route exact path='/games/:id' render={(rp) =>
                            this.props.currentUser ?
                                <ContentGrid {...rp} focusComponent={< GameplayArea />} />
                                    :
                                <Redirect to='/login' />}
                        />
                        <Route exact path='/lobby' render={(rp) =>
                            this.props.currentUser ?
                                <ContentGrid {...rp} focusComponent={<GamesList />}/>
                                    :
                                <Redirect to='/login' />}
                        />
                        <Route exact path='/new_game' render={(rp) =>
                            this.props.currentUser ?
                                <ContentGrid {...rp} focusComponent={<NewGameContainer />}/>
                                    :
                                <Redirect to='/login' />}
                        />
                        <Route exact path='/home' render={(rp) => <Splash {...rp} />}/>
                        <Route path="*" render={(rp) => <Redirect to='/home' />}/>

                    </Switch>
                </Router>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {currentUser: state.currentUser}
}

export default connect(mapStateToProps)(App)
