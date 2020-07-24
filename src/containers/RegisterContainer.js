import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { CountryDropdown } from 'react-country-region-selector'
import { connect } from 'react-redux'

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
        let {username, email, password_digest, confirm, country} = this.state
        return (
            <div>
                <br />
                <h2>Welcome to LiBredge!</h2>
                <h5>Please complete the following fields.</h5>
                <br />
                <hr />
                <Form inverted onSubmit={this.handleSubmit}>
                    <input type='text'
                        name='username'
                        placeholder="* username *"
                        value={username}
                        onChange={this.handleChange}
                        style={{backgroundColor: 'transparent', color: 'ivory'}}
                    />
                    <hr />
                    <input type='password'
                        name='password_digest'
                        placeholder="* password *"
                        value={password_digest}
                        onChange={this.handleChange}
                        style={{backgroundColor: 'transparent', color: 'ivory'}}
                    />
                    <hr />
                    <input type='password'
                        name='confirm'
                        placeholder="* confirm the password *"
                        value={confirm}
                        onChange={this.handleChange}
                        style={{backgroundColor: 'transparent', color: 'ivory'}}
                    />
                    <hr />
                    <input type='text'
                        name='email'
                        placeholder="* email address *"
                        value={email}
                        onChange={this.handleChange}
                        style={{backgroundColor: 'transparent', color: 'ivory'}}
                    />
                    <hr />
                    <CountryDropdown
                        value={country}
                        onChange={this.handleChange}
                        style={{backgroundColor: 'transparent', color: 'ivory'}}
                    />
                    <hr />
                    <input type="submit" value="Sign in"
                        style={{visibility:'hidden'}} />
                    <Button inverted color='blue'
                        onClick={this.props.handleSubmit}
                        style={{float:'right', margin:'10px'}}>
                        Register
                    </Button>

                </Form >
            </div>)
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps)(RegisterContainer)
