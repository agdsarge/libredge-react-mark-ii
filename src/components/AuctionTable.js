import React, { Component } from 'react'

class AuctionTable extends Component {
    str = () => {
        return this.props.game.bid_history
    }
    componentDidMount() {
        console.log("AUCTION TABLE", this.props.game)
        // console.log(this.props.game.deals.slice(-1)[[0]]['bid_history'])
    }

    render() {
        return (<div><p style={{color:'ivory'}}> HELLO AUCTION TABLE </p> </div>)
    }
}

export default AuctionTable
