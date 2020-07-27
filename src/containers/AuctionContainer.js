import React, { Component } from 'react'
import { connect } from 'react-redux'

import BidForm from '../components/BidForm'
import AuctionTable from '../components/AuctionTable'


class AuctionContainer extends Component {
    constructor(props) {
        super(props) //deal = activeDeal; 
        this.state = {
            proposedBid: '',
            bidHistory: ''
        }
    }

    componentDidMount() {

    }

    bidLogic = () => {

    }

    handleBid = (e) => {
        console.log(e.target.value)
        let bid = `${this.props.myPosition}.{e.target.value};`

    }

    render() {
        return (
            <div>
                <BidForm handleBid={this.handleBid}/>
                your distance is {this.props.distance}
                <AuctionTable />
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser,
        myPosition: state.myPosition
    }
}

export default connect(mapStateToProps)(AuctionContainer)
