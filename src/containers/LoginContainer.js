import React, { Component } from 'react'

import { connect } from 'react-redux'
import LoginForm from '../components/LoginForm'

import { LOGIN_URL, HEADERS } from '../constants'

class LoginContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = (e) => {
        console.log("LOGIN DEBUG START")
        e.preventDefault()
        fetch(LOGIN_URL, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify(this.state)
        })
        .then(resp => resp.json())
        .then(d => {
            if (d.error) {
                alert(d.message)
            } else {
                localStorage.setItem('jwt-libredge', d.token)
                console.log('LOGIN DEBUG', d)
                this.props.dispatch({type: 'SET_USER', payload: d.player})
            }
        })
        .then(this.setState({username: '', password: ''}))
    }

    render() {return(
        <LoginForm handleSubmit={this.handleSubmit} handleChange={this.handleChange} newUser={this.state}/>
    )}
}

const matchStateToProps = (state) => {
    return {
        currentUser: state.currentUser
    }
}

export default connect(matchStateToProps)(LoginContainer)
