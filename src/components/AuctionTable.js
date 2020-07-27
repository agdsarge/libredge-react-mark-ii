import React, { Component } from 'react'
import { connect } from 'react-redux'

class AuctionTable extends Component {
    // str = () => {
    //     return this.props.game.bid_history
    // }

    componentDidMount() {
        console.log("AUCTION TABLE", this.props.game)
        // console.log(this.props.game.deals.slice(-1)[[0]]['bid_history'])
    }

    componentWillUnmount() {

    }

    render() {
        return (<div><p style={{color:'ivory'}}> HELLO AUCTION TABLE </p> </div>)
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

export default connect(mapStateToProps)(AuctionTable)
