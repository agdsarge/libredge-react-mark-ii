import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

class LoginForm extends Component {
    // handleDispatch = (e) => {
    //     this.props.dispatch({type: "SET_ROUTE", payload: "/register"})
    // }

    render(){
        let {username, password} = this.props.newUser
        return(
            <div>
                <br />
                <h2>Welcome!</h2>
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
                    <NavLink
                        to="/register"
                        exact
                        className="reg"
                        style={{float:'left', margin:'10px'}}
                        onClick={this.handleDispatch}>
                        Register a new account!
                    </NavLink>
                </Form>
                <br />


            </div >
        )}

}


const mapStateToProps = (state) => {
    return {
        currentRoute: state.currentRoute
    }
}

export default connect(mapStateToProps)(LoginForm)


// <NavLink
//     to="/register"
//     exact
//     className="reg"
//     style={{float:'left', margin:'10px'}}
//     onClick={this.handleDispatch}>
//     Register a new account!
// </NavLink>
