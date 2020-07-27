import React, { Component } from 'react';
// import { Link } from 'react-router-dom'

// import { Card, Image } from 'semantic-ui-react'
// Button, Form

import { connect } from 'react-redux'
import { API_ROOT, HEADERS } from '../constants'

import Hand from '../components/Hand'
import BidForm from '../components/BidForm'
import AuctionTable from '../components/AuctionTable'

import AuctionContainer from './AuctionContainer'

class GameplayArea extends Component {
    //this.props.game is a game object => { id, memorable_string_name, final_score, deals}
    constructor(props) {
        super(props)
        this.state = {
            activeDeal: {},
            myHand: [],
            distanceFromDealer: null

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

        this.calculateDistanceFromDealer(actDeal.dealer, position)
    }

    calculateDistanceFromDealer = (dealer, player) => {
        if (dealer === player) {this.setState({distanceFromDealer: 0})}
        let seats = ["north", "east", "south", "west"]
        while (dealer != seats[0]) {
            seats = seats.unshift(seats.pop())
        }
        this.setState({distanceFromDealer: seats.indexOf(player)})
    }


    handleNewDeal = (e) => {


    }

    handleBid = (e) => {
        // console.log(e.target.value) //2C
        // I am committing all bids to the DB as a string.
        // Separate bids are delimited with semi-colons
        // Each bid will be recorded as position.bid;
        // For example, 'north.1C;east.1H;south.2C;

    }


    // handleBid = (e) => {
    //     console.log(e.target.value)
    //     // let [denom, suit] = e.target.value.split('')
    //     let bid = e.target.value + ':'
    //
    //     // if 3 passes are the last bids, and you pass, end the bid phase
    //     // position
    //     // there must be  count(':') % 4 === distanceFromDealer() for you to bid.
    //
    //     //if (bidLogic()) {fetch put. dispatch game} else {alert }
    //     fetch(`${DEAL_UPDATE_URL}/${this.props.deal.id}`, {
    //         method: 'PUT',
    //         headers: HEADERS,
    //         body: JSON.stringify({'bid_history': bid})
    //     })
    //     .then(res => res.json())
    //     // .then(game => this.props.dispatch({type: 'SET_GAME', payload: game}))
    //     .then(console.log)
    //
    // }


    // handleBid = (e) => {
    //     if (this.state.activeDeal.bid_phase) {
    //     let bid = e.target.innerText.slice(0,2)
    //     console.log(bid)
    //
    //     let body = {"bid_history": bid}
    //     console.log(JSON.stringify(body))
    //     fetch(`${API_ROOT}/deals/${this.state.activeDeal.id}`, {
    //         method: "PUT",
    //         headers: HEADERS,
    //         body: JSON.stringify(body)
    //     })
    //     // .then(res => res.json())
    //     // .then(console.log)
    // } else {
    //     alert("bid phase over")
    // }}

    bid_history_render = () => {

    }

    render() {
        return(

            <div id="cardTable">

                {this.props.currentBidPhase ?
                    <div id='auction' >
                        <AuctionContainer deal={this.state.activeDeal} distance={this.state.distanceFromDealer}/>
                    </div >
                : null}

                <div id='tricks'> </ div>

                <Hand hand={this.state.myHand} />
                <h3 className="centeredPosition" > Your position: {this.props.myPosition} </h3>
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
