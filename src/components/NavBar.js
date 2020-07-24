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

    handleDispatch = (e) => {
        this.props.dispatch({type: "SET_ROUTE", payload: '/login'})
    }

    handleDispatch2 = (e) => {
        this.props.dispatch({type: "SET_ROUTE", payload: '/game'})
    }

    render() {

        return (
            <div id='navBarMenuSemantic'>
                <Menu pointing secondary>
                    <Menu.Item name="LIBREDGE" onMouseOver={(e) => this.handleMouse(e, true)} onMouseLeave={(e) => this.handleMouse(e, false)}/>
                    <Menu.Item name="OTHER" onMouseOver={(e) => this.handleMouse(e, true)} onMouseLeave={(e) => this.handleMouse(e, false)}/>
                    {this.props.currentUser ? <Menu.Item name={this.props.currentUser.username} /> : null }
                    <Menu.Menu position="right">
                        { this.props.currentUser ?
                            <div>

                                <Menu.Item name="SIGN OUT"
                                    style={{fontSize:'20px'}}
                                    onMouseOver={(e) => this.handleMouse(e, true)}
                                    onMouseLeave={(e) => this.handleMouse(e, false)}
                                    onClick={this.handleLogOut}
                                />
                            </div>
                            :
                            <NavLink
        						to="/login"
        						exact
        						className="reg"
                                style={{float:'left', fontSize:'20px', marginTop:'18px', marginRight: '18px'}}
                                onMouseOver={(e) => this.handleMouse(e, true)}
                                onMouseLeave={(e) => this.handleMouse(e, false)}
                                onClick={this.handleDispatch}>
                                <Menu.Item name="SIGN IN"
                                    style={{fontSize:'20px'}}
                                />
                            </NavLink>
                    }
                    </Menu.Menu>
                </Menu>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser,
        currentRoute: state.currentRoute
    }
}

export default connect(mapStateToProps)(NavBar)
