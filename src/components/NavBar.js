import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

class NavBar extends Component {

    handleMouse = (e, bool) => {
        bool ? e.target.style.color = 'cornflowerBlue' : e.target.style.color = 'black'
    }

    handleLogOut = (e) => {
        this.props.dispatch({type: "SET_USER", payload: null})
        localStorage.clear()
    }

    render() {

        return (
            <div id='navBarMenuSemantic'>
                <Menu pointing secondary style={{fontSize:'20px'}} onMouseOver={(e) => this.handleMouse(e, true)} onMouseLeave={(e) => this.handleMouse(e, false)}>
                    <NavLink to='/home' >
                        <Menu.Item  name="LIBREDGE" />
                    </NavLink >

                    {this.props.currentUser ?
                        <NavLink to='/lobby' exact >
                            <Menu.Item name={this.props.currentUser.username} />
                        </NavLink >
                            : null
                    }
                    <Menu.Menu position="right">
                        { this.props.currentUser ?
                            <Menu.Item name="SIGN OUT" onClick={this.handleLogOut} />
                                :
                            <div>
                            <NavLink
        						to="/register" exact
                                style={{float:'left'}}
                            >
                                <Menu.Item name="REGISTER" />
                            </NavLink>
                            <NavLink
        						to="/login" exact
                                style={{float:'left', marginRight: '18px'}}
                            >
                                <Menu.Item name="SIGN IN" />
                            </NavLink>
                            </div>
                        }
                    </Menu.Menu>
                </Menu>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { currentUser: state.currentUser }
}

export default connect(mapStateToProps)(NavBar)
