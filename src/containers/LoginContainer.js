import React, { Component } from 'react'

import { connect } from 'react-redux'
import LoginForm from '../components/LoginForm'


import { LOGIN_URL } from '../constants'

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
            headers: this.props.headers,
            body: JSON.stringify(this.state)
        })
        .then(resp => resp.json())
        .then(d => {
            if (d.error) {
                alert(d.message)
            } else {
                localStorage.setItem('jwt-libredge', d.token)
                console.log('LOGIN DEBUG', d)
                this.props.dispatch({type: 'SET_USER', payload: d.user})
            }
        })
        .then(this.setState({username: '', password: ''}))
    }

    render() {return(
        <div style={{backdropFilter: 'blur(5px)'}}>
            <LoginForm handleSubmit={this.handleSubmit} handleChange={this.handleChange} newUser={this.state}/>
        </div>
    )}
}

const matchStateToProps = (state) => {
    return {
        currentUser: state.currentUser,
        currentRoute: state.currentRoute,
        headers: state.headers
    }
}

export default connect(matchStateToProps)(LoginContainer)
