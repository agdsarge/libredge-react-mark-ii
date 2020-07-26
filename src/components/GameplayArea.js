import React, { Component } from 'react';
// import { Link } from 'react-router-dom'

// import { Card, Image } from 'semantic-ui-react'
// Button, Form

import { connect } from 'react-redux'
import { API_ROOT, HEADERS } from '../constants'

import Hand from '../components/Hand'
import BidForm from '../components/BidForm'
import AuctionTable from '../components/AuctionTable'

class GameplayArea extends Component {
    //this.props.game is a game object => { id, memorable_string_name, final_score, deals}
    constructor(props) {
        super(props)
        this.state = {
            activeDeal: {},
            counter: 1,
            myHand: [],
            currentBid: ''
        }
    }

    determineMyPosition = () => {
        // debugger
        let actDeal  = this.props.currentGame.deals.slice(-1)[0]
        this.props.dispatch({type: "SET_BID_PHASE", payload: actDeal['bid_phase']})
        this.setState({activeDeal: actDeal})
        let pGs = this.props.currentGame["player_games"]
        let position = pGs.filter(pg => pg["player_id"] === this.props.currentUser.id)[0].position
        this.props.dispatch({type: "SET_POSITION", payload: position})
        fetch(`${API_ROOT}/hand/${actDeal.id}/${position}`)
        .then(res => res.json())
        .then( hand => this.setState({myHand: hand}))
    }

    componentDidMount() {
        if (!this.props.myPosition) {
            this.determineMyPosition()
        }

        // this.cheat()
        // setInterval(this.cheat, 10)


        // let x = this.props.game.deals.slice(-1)["player_games"].filter(pg => pg.id === this.props.currentUser.id).map(pg => pg.position)
        //i need the id of the player to derive the position of the player.
        // console.log(x)
            //this.props.currentUser.id
            //  #=>
        //i need to get an id of the deal
            // this.state.activeDeal.id

    }

    handleNewDeal = (e) => {


    }


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
                        <BidForm deal={this.state.activeDeal}/>
                        <AuctionTable game={this.props.currentGame} />
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

// const orderedMessages = messages => {
//   const sortedMessages = messages.sort(
//     (a, b) => new Date(a.created_at) - new Date(b.created_at)
//   );
//   return sortedMessages.map(message => {
//     return <li key={message.id}>{message.text}</li>;
//   });
// };
