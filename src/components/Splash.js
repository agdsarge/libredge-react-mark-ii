import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

class Splash extends Component {

    render() {
        return (
            <div className='splashBackground' >
                <div className='veryLarge'> Welcome to <span style={{color:'cornflowerBlue'}}>LiBre</span>dge! </div>
                <br /> <hr />
                <div style={{backgroundColor: 'rgba(112,128,144,0.65)', marginRight: '550px'}}>
                    <h2> Play contract bridge online. </h2>
                    <h2> LiBredge is free. </h2>
                    <h2> LiBredge always will be free. </h2>
                    {this.props.currentUser ?
                        <h2>You may see your games in the <NavLink to='/lobby' exact>lobby.</NavLink></h2>
                            :
                        <h2> Please <NavLink to='/login' exact>sign in.</NavLink> If you are new, please <NavLink to='/register' exact>register.</NavLink>. </h2>
                    }

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {currentUser: state.currentUser}
}


export default connect(mapStateToProps)(Splash)
