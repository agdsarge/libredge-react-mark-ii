import React, { Component } from 'react'
import { connect } from 'react-redux'

// import LoginContainer from  './LoginContainer'
// import RegisterContainer from './RegisterContainer'
// import GameContainer from './GameContainer'
// import Lobby from './Lobby'

class FocusContainer extends Component {

    render() {
        return (
            <div id="focusContainer">
                {this.props.component}
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

export default connect(mapStateToProps)(FocusContainer)
