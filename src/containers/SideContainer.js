import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux'

// import ChatContainer from './ChatContainer'

class SideContainer extends Component{

    render() {
        return (
            <div id="sideContainer">
                <Button inverted color='blue' style={{marginTop:'30%'}}> NEW GAME </Button>
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser,
        myPosition: state.myPosition,
        currentGame: state.currentGame,
        currentBidPhase: state.currentBidPhase,
        currentContract: state.currentContract
        // currentRoute: state.currentRoute
    }
}

export default connect(mapStateToProps)(SideContainer)

// currentUser: null,

// currentGame: null,
// currentBidPhase: null,
// currentContract: {
//     contract: '', // '1.S', '5.NT'
//     trumpSuit: '' // 'S', 'NT'
// },
// myPosition: null
