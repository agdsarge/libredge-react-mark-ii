import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

class LoginForm extends Component {

    render(){
        let {username, password} = this.props.newUser
        return(
            <div>
                <br />
                <h2>Good to see you back!</h2>
                <br />

                <hr />
                <Form onSubmit={this.props.handleSubmit}>
                    <input type='text'
                        name='username'
                        placeholder="username"
                        value={username}
                        onChange={this.props.handleChange}
                        style={{backgroundColor: 'transparent', color: 'ivory'}}
                    />
                    <hr />
                    <input type='password'
                        name='password'
                        placeholder="password"
                        value={password}
                        onChange={this.props.handleChange}
                        style={{backgroundColor: 'transparent', color: 'ivory'}}
                    />
                    <hr />


                    <input type="submit" value="Sign in"
                        style={{visibility:'hidden'}} />
                    <Button inverted color='blue'
                        onClick={this.props.handleSubmit}
                        style={{float:'right', margin:'10px'}}>
                        Sign in
                    </Button>
                    <br />

                </Form>
                <NavLink
                    to="/register"
                    exact
                    className="reg"
                    style={{float:'left', marginLeft:'10px', marginTop: '25px'}} >
                    <Button inverted color='blue' >
                        Register a new account
                    </Button>
                </NavLink>
                <br />
            </div >
        )}
}


const mapStateToProps = (state) => {
    return {}
}

export default connect(mapStateToProps)(LoginForm)
