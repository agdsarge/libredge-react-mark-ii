import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Form, Button} from 'semantic-ui-react'
import {DEAL_UPDATE_URL, HEADERS } from '../constants'


class BidForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            clubBids: ['1C', '2C', '3C', '4C', '5C', '6C', '7C'],
            diamondBids: ['1D', '2D', '3D', '4D', '5D', '6D', '7D'],
            heartBids: ['1H', '2H', '3H', '4H', '5H', '6H', '7H'],
            spadeBids: ['1S', '2S', '3S', '4S', '5S', '6S', '7S'],
            notTrumpBids: ['1NT', '2NT', '3NT', '4NT', '5NT', '6NT', '7NT'],
            error: ''
        }
    }

    distanceFromDealer = (myPosition, dealerPosition) => {
        // let seats = ['north', 'east', 'south', 'west']
        // let me = seats.indexOf(myPosition)
        // let dealer = seats.indexOf(dealerPosition)
        // return Math.abs(dealer - me)
        // no, dummy

    }

    bidLogic = () => {

    }

    handleBid = (e) => {
        console.log(e.target.value)
        let [denom, suit] = e.target.value.split('')
        let bid = e.target.value + ':'

        // if 3 passes are the last bids, and you pass, end the bid phase
        // position
        // there must be  count(':') % 4 === distanceFromDealer() for you to bid.

        //if (bidLogic()) {fetch put. dispatch game} else {alert }
        fetch(`${DEAL_UPDATE_URL}/${this.props.deal.id}`, {
            method: 'PUT',
            headers: HEADERS,
            body: JSON.stringify({'bid_history': bid})
        })
        .then(res => res.json())
        // .then(game => this.props.dispatch({type: 'SET_GAME', payload: game}))
        .then(console.log)

    }
    componentDidMount() {
        console.log(this.props.deal)
    }

    render() {
        return (
            <div>
                <h3 style={{color:'ivory', position: 'absolute', left:'40%'}}> AUCTION </h3>
                <br/> <br/> <hr />
                <Button.Group widths='7'>
                    {this.state.clubBids.map(b => <Button key={b} name={b} value={b} onClick={this.handleBid}>{b}</Button>)}
                </Button.Group> <hr />
                <Button.Group widths='7'>
                    {this.state.diamondBids.map(b => <Button key={b} name={b} value={b} onClick={this.handleBid}>{b}</Button>)}
                </Button.Group> <hr />
                <Button.Group widths='7'>
                    {this.state.heartBids.map(b => <Button key={b} name={b} value={b} onClick={this.handleBid}>{b}</Button>)}
                </Button.Group> <hr />
                <Button.Group widths='7'>
                    {this.state.spadeBids.map(b => <Button key={b} name={b} value={b} onClick={this.handleBid}>{b}</Button>)}
                </Button.Group> <hr />
                <Button.Group widths='7'>
                    {this.state.notTrumpBids.map(b => <Button key={b} name={b} value={b} onClick={this.handleBid}>{b}</Button>)}
                </Button.Group> <hr />

                <Button fluid name='Pass' value='Pass' onClick={this.handleBid}>Pass</Button> <hr />
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {currentGame: state.currentGame}
}





export default connect(mapStateToProps)(BidForm)
