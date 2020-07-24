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

    // cheat = () => {
    //     console.log("GAME PROP", this.props.game)
    //     // console.log("GameplayArea", this.props.game.deals.slice(-1)[0])
    //     this.setState({activeDeal: this.props.game.deals.slice(-1)[0]})
    //     let latestDealID = this.props.game.deals.slice(-1)[0].id
    //     let y = this.props.game["player_games"]
    //     let myPosition = y.filter(pg => pg["player_id"] === this.props.currentUser.id)[0].position
    //
    //     this.props.dispatch({type:"SET_POSITION", payload: myPosition})
    //     // console.log("CDM", `${API_ROOT}/hand/${latestDealID}/${myPosition}`)
    //     fetch(`${API_ROOT}/hand/${latestDealID}/${myPosition}`)
    //     .then(res => res.json())
    //     .then(hand => this.setState({myHand: hand}))
    // }

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
        this.determineMyPosition()
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

                < Hand hand={this.state.myHand} />
                <h3 className="centeredPosition" > Your position: {this.props.myPosition} </h3>
            </div>

        )
    }
}

// ({
//   conversation: { id, title, messages },
// }) => {
//   return (
//     <div className="messagesArea">
//       <h2>{title}</h2>
//       <ul>{orderedMessages(messages)}</ul>
//       <NewMessageForm conversation_id={id} />
//     </div>
//   );
// };

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



// <div>
//     <h2> gameplay area </h2>
//     <p> name: {this.props.game.memorable_string_name} </p>
//     <p> {this.props.myPosition}</p>
//
//     <p> My hand: </p>
//     <div>
//         <Card.Group itemsPerRow={7}>
//             {this.state.myHand.map(card => <Card key={card.ord}> <Image wrapped ui={false} src={card.img} /></ Card>)}
//         </Card.Group>
//     </div>
//     <p> my cards: {this.state.myHand.map(card => card.short)}</p>
//
//     <Button onClick={this.handleNewDeal} disabled> New deal </Button>
//     <h2> bidding! </h2>
//     <div id="biddingForm">
//         <Button.Group onClick={this.handleBid} buttons={['1Club', '2Club', '3Club', '4Club', '5Club', '6Club', '7Club']} /> <hr />
//         <Button.Group onClick={this.handleBid} buttons={['1Diamond', '2Diamond', '3Diamond', '4Diamond', '5Diamond', '6Diamond', '7Diamond']} /> <hr />
//         <Button.Group onClick={this.handleBid} buttons={['1Heart', '2Heart', '3Heart', '4Heart', '5Heart', '6Heart', '7Heart']} /> <hr />
//         <Button.Group onClick={this.handleBid} buttons={['1Spade', '2Spade', '3Spade', '4Spade', '5Spade', '6Spade', '7Spade']} /> <hr />
//         <Button.Group onClick={this.handleBid} buttons={['1NT', '2NT', '3NT', '4NT', '5NT', '6NT', '7NT']} /> <hr />
//         <Button onClick={this.handleBid} > PASS </Button>
//     </div>
//     <div id="truth">
//         <h1> BID HISTORY: {this.state.activeDeal.bid_history} </h1>
//     </div>
// </div>
