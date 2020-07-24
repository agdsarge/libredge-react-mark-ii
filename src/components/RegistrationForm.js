import React, { Component } from 'react'

import { Form, Button } from 'semantic-ui-react'
import { CountryDropdown } from 'react-country-region-selector'

class RegistrationForm extends Component {
    render() {
        let {username, password_digest, confirm, email, country} = this.props.newPlayer
        return (
            <div>
                
                <Form inverted onSubmit={this.props.handleSubmit}>
                    <input type='text'
                        name='username'
                        placeholder="* username *"
                        value={username}
                        onChange={this.props.handleChange}
                        style={{backgroundColor: 'transparent', color: 'ivory'}}
                    />
                    <hr />
                    <input type='password'
                        name='password_digest'
                        placeholder="* password *"
                        value={password_digest}
                        onChange={this.props.handleChange}
                        style={{backgroundColor: 'transparent', color: 'ivory'}}
                    />
                    <hr />
                    <input type='password'
                        name='confirm'
                        placeholder="* confirm the password *"
                        value={confirm}
                        onChange={this.props.handleChange}
                        style={{backgroundColor: 'transparent', color: 'ivory'}}
                    />
                    <hr />
                    <input type='text'
                        name='email'
                        placeholder="* email address *"
                        value={email}
                        onChange={this.props.handleChange}
                        style={{backgroundColor: 'transparent', color: 'ivory'}}
                    />
                    <hr />
                    <CountryDropdown
                        value={country}
                        onChange={this.props.handleChange}
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
            </div>




        )
    }
}

export default RegistrationForm
