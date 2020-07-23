import React, { Component } from 'react'
import { connect } from 'react-redux'

// import LoginContainer from  './LoginContainer'
// import RegisterContainer from './RegisterContainer'
// import GameContainer from './GameContainer'
// import Lobby from './Lobby'

class FocusContainer extends Component {

    // selectFocus = () => {
    //     console.log("selectFocus", this.props.currentRoute)
    //     switch (this.props.currentRoute) {
    //         case '/login':
    //             return <LoginContainer />
    //         case '/register':
    //             return <RegisterContainer />
    //         case '/game':
    //             return <GameContainer />
    //         default:
    //             return <Lobby />
    //     }
    // }

    render() {
        return (
            <div id="focusContainer">
                {/*{this.selectFocus()}*/}
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
