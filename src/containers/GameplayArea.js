import React, { Component } from 'react';
// import { Link } from 'react-router-dom'

// import { Card, Image } from 'semantic-ui-react'
// Button, Form

import { connect } from 'react-redux'
import { API_ROOT } from '../constants'

import Hand from '../components/Hand'

import AuctionContainer from './AuctionContainer'
import PlayContainer from './PlayContainer'

class GameplayArea extends Component {
    //this.props.game is a game object => { id, memorable_string_name, final_score, deals}
    constructor(props) {
        super(props)
        this.state = {
            activeDeal: {},
            myHand: [],
            distanceFromDealer: null,
            distanceFromDummy: null,
        }
    }

    componentDidMount() {
        if (!this.props.myPosition) {
            this.determineMyPosition()
        }
    }

    componentWillUnmount() {
        this.props.dispatch({type:"SET_CONTRACT", payload: "."})
        this.props.dispatch({type:"SET_GAME", payload: null})
        this.props.dispatch({type:"SET_POSITION", payload: null})
        this.props.dispatch({type:"SET_BID_PHASE", payload: null})
    }


    determineMyPosition() {
        // this is a complicated and important function.
        // i use this function to launch other functions.
        // 1a. determine which Deal we're concerned with. Assign it to actDeal
        // 1b. Commit that Deal to state as an object
        // 1c. from that Deal, get a sense of what the Bid Phase is
        //          True  => we are in the auction
        //          False => we are in the play of the hands
        // 1d. Commit the Bid Phase to the Redux store.
        // 2a. Collect the PlayerGame objects of the current Game
        // 2b. Find the PlayerGame whose player is the currentPlayer of the redux store. Determine that PG's position
        // 2c. Commit that position to store. Assign it to position
        // 3a. Use the actDeal and the position variables to fetch player's hand.
        // 3b. each card is an object.
        // 3c. Commit hand to local state. this.state.hand is an array of objects
        // 4.  Calculate the player's distance from the dealer (needed for front-end validation.)

        let actDeal  = this.props.currentGame.deals.slice(-1)[0]
        this.props.dispatch({type: "SET_BID_PHASE", payload: actDeal['bid_phase']})
        this.setState({activeDeal: actDeal})

        let pGs = this.props.currentGame["player_games"]
        let position = pGs.find(pg => pg["player_id"] === this.props.currentUser.id).position
        this.props.dispatch({type: "SET_POSITION", payload: position})

        fetch(`${API_ROOT}/hand/${actDeal.id}/${position}`)
        .then(res => res.json())
        .then( hand => this.setState({myHand: hand}))
        .then(() => this.calculateDistanceFrom(actDeal.dealer, position, actDeal['bid_phase']))

    }

    calculateDistanceFrom = (target, player, dealer) => {

        if (target === player) {
            this.setState({distanceFromDealer: 0})
        } else {
            let seats = ["north", "east", "south", "west"]
            while (target !== seats[0]) {
                seats = seats.unshift(seats.pop())
            }
            if (dealer) {
                this.setState({distanceFromDealer: seats.indexOf(player)})
            } else {
                this.setState({distanceFromDummy: seats.indexOf(player)})
                console.log("WTF???", this.state.distanceFromDummy)
            }
        }
    }


    handleNewDeal = (e) => {

    }

    handlePlay = (e, card) => {
        console.log(card.short)
    }

    whichComponent = () => {
        if (this.props.currentBidPhase === true) {
            return (
                <div id='auction' >
                    <AuctionContainer deal={this.state.activeDeal} distance={this.state.distanceFromDealer}/>
                </div >)
        } else if (this.props.currentBidPhase === false) {
            return (
                <div id='play'>
                    <PlayContainer deal={this.state.activeDeal} handlePlay={this.handlePlay} />
                </div>)
        } else {
            return null
        }
    }


    render() {
        return(

            <div id="cardTable">
                {this.whichComponent()}
                <Hand hand={this.state.myHand} whoseHand="myHand" handlePlay={this.handlePlay} />
                <h3 className="centeredPosition" > My position is {this.props.myPosition} </h3>
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
    }
}

export default connect(mapStateToProps)(GameplayArea)

// helpers
