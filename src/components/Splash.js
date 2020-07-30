import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

class Splash extends Component {

    render() {
        return (
            <div className='splashBackground' >
                <div className='veryLarge'><em> Welcome to <span style={{color:'lightGreen'}}>LiBre</span>dge!</em></div>
                <br />
                <br />
                <div style={{backgroundColor: 'rgba(112,128,144,0.65)', backdropFilter: 'blur(5px)', marginTop:'20px', maxWidth: 'fit-content', padding: '20px'}}>
                    <h2> Play contract bridge online. </h2>
                    <h2> LiBredge is <span style={{color:'lightGreen'}}>free</span>. </h2>
                    <h2> LiBredge always will be <span style={{color:'lightGreen'}}>free</span>. </h2>
                    {this.props.currentUser ?
                        <h2 style={{width: '480px'}}>You may see your games in the <NavLink to='/lobby' exact style={{color:'lightGreen'}}><u>lobby</u>.</NavLink></h2>
                            :
                        <h2 style={{width: '480px'}}> Please <NavLink to='/login' exact style={{color:'lightGreen'}} ><u>sign in.</u></NavLink> If you are new, please <NavLink to='/register' exact style={{color:'lightGreen'}} > <u>register</u></NavLink>.</h2>
                    }
                </div>
                <div style={{position:'absolute', bottom: '2px', right: '2px'}}>George Goodwin Kilburne, <em>A Good Hand</em> 1924. Watercolor.</div>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {currentUser: state.currentUser}
}


export default connect(mapStateToProps)(Splash)
