import React, { Component } from 'react'

import { connect } from 'react-redux'
import RegistrationForm from '../components/RegistrationForm'
import { REGISTER_URL, HEADERS } from '../constants'

class RegisterContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            'password_digest': '',
            confirm: '',
            country: ''
        }
    }

    handleChange = (e) => {
        if (e.target) {
            this.setState({[e.target.name]: e.target.value})
        } else {
            this.setState({country: e})
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let {username, email, password_digest} = this.state
        if (username === '' || password_digest === '' || email === ''){
            alert("Please fill the * required * fields")
        } else if (this.state.password_digest !== this.state.confirm) {
            alert("Please make sure password and confirmation match")
            this.setState({password_digest: '', confirm: ''})
        } else {
            fetch(REGISTER_URL, {
                method: "POST",
                headers: HEADERS,
                body: JSON.stringify(this.state)
            })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    username: '',
                    email: '',
                    'password_digest': '',
                    confirm: '',
                    country: ''
                })
                this.props.dispatch({type: "SET_USER", payload: data})})
        }
    }

    render() {

        return (
            <div>
                <br />
                <h2>Welcome to LiBredge!</h2>
                <h5>Please complete the following fields.</h5>
                <br />
                <hr />
                <RegistrationForm handleChange={this.handleChange} handleSubmit={this.handleSubmit} newPlayer={this.state}/>
            </div>)
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps)(RegisterContainer)
