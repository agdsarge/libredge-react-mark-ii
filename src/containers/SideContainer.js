import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux'

import { DEAL_UPDATE_URL } from '../constants'
// import ChatContainer from './ChatContainer'

class SideContainer extends Component{
    constructor(props) {
        super(props)
        this.state = {
            activeDeal: {}
        }

    }

    componentDidMount() {
        this.bidPoll()
    }

    bidPoll = () => {
        console.log("BID POLL", this.props.currentGame)
        let gameID = this.props.currentGame.id

        fetch(`http://localhost:3005/api/v1/games/latest_deal/${gameID}`)
        .then(res => res.json())
        // .then(deal => )
        .then(d => {
            if (d !== this.state.activeDeal) {
                this.setState({activeDeal: d})
            }
        })
        // .then(x => this.state.activeDeal)
        // .then(() => this.state.activeDeal['bid_history'])
        // .then(() => "TEST")


    }

    render() {
        return (
            <div id="sideContainer">
                <Button inverted color='blue' style={{marginTop:'30%'}}> NEW GAME </Button>
                {this.props.currentBidPhase ? <h2> Current bid: {this.state.activeDeal["bid_history"]}</h2>: null}
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
