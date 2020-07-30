import React, { Component } from 'react'
import { connect } from 'react-redux'

import BidForm from '../components/BidForm'
import AuctionTable from '../components/AuctionTable'
import {HEADERS, DEAL_UPDATE_URL, REFRESH_RATE, API_ROOT } from '../constants'

class AuctionContainer extends Component {
    constructor(props) {
        super(props) //deal = activeDeal; distance = num
        this.state = {
            bidHistory: '',
            intervalID: null
        }
    }

    componentDidMount() {
        this.setState({
            bidHistory: this.props.deal['bid_history']
        })
        let id = setInterval(this.historyFetcher, REFRESH_RATE)
        this.setState({intervalID: id})
    }

    componentWillUnmount() {
        // console.log("UNMOUNT!!!", this.state.intervalID)
        clearInterval(this.state.intervalID)
    }

    tally = (str, delim='%') => {
        let count = 0
        for (let char of str) {
            if (char === delim) {
                count += 1
            }
        }
        return count
    }

    endAuction = (bool) => {
        bool ? alert('proceed to play of the hand') : alert("no possible plays. new deal.")
        if (bool) {
            fetch(`${DEAL_UPDATE_URL}/${this.props.deal.id}`, {
                method: 'PUT',
                headers: HEADERS,
                body: JSON.stringify({"bid_phase": "ended"})
            })
        } else {

        }

    }

    bidAnalysis = () => {
        // console.log("BID ANALYSIS")
        let copyHistory = this.state.bidHistory
        if (this.tally(copyHistory) === 4 && this.tally(copyHistory, 'P') === 4) {
            this.endAuction(false)
        } else if (this.tally(copyHistory) > 3) {

            let bidHistoryArray = copyHistory.split('%')
            bidHistoryArray.pop()
            let len = bidHistoryArray.length
            console.log(bidHistoryArray)
            if (bidHistoryArray[len - 1].endsWith('Pass') && bidHistoryArray[len - 2].endsWith('Pass') && bidHistoryArray[len - 3].endsWith('Pass')) {
                this.endAuction(true)
            }
        }
    }

    historyFetcher = () => {
        fetch(`${DEAL_UPDATE_URL}/history/${this.props.deal.id}`)
        .then(res => res.json())
        .then(d => {
            this.setState({bidHistory: d.history})
            if (d.end) {
                //fetch Game
                //dispatch updated currentGame
                fetch(`${API_ROOT}/games/${d.game}`)
                .then(res => res.json())
                .then(updated_game => {
                    this.props.dispatch({type: "SET_BID_PHASE", payload: false})
                    this.props.dispatch({type: "SET_GAME", payload: updated_game})

                })
            }
        })
    }

    pastBidCount = () => {

        let dist = this.props.distance
        let semicolonCount = this.tally(this.state.bidHistory)
        return (semicolonCount % 4 !== dist)
    }

    increment = (bid) => {
        // JFC I should break this up.
        if (this.state.bidHistory === '') {
            return false
        }
        if (bid.includes('Pass')) {
            return false
        } else {
            //'north.3C'
            let bidHistoryArray = this.state.bidHistory.split('%').slice(0,-1)
            while ((bidHistoryArray.length > 0)  && (bidHistoryArray[bidHistoryArray.length - 1].includes('Pass')) ) {
                bidHistoryArray = bidHistoryArray.slice(0, -1)
            }
            if (bidHistoryArray.length === 0) {
                return false
            } else {

                let last = bidHistoryArray[bidHistoryArray.length - 1]

                let lastBidStr = last.split('.')[1]
                let bidStr  = bid.split('.')[1]

                let denomRegEx = /\d/
                let suitRegEx = /\D+/

                let denomZero = lastBidStr.match(denomRegEx)[0]
                let denomOne = bidStr.match(denomRegEx)[0]

                let suitZero = lastBidStr.match(suitRegEx)[0]
                let suitOne = bidStr.match(suitRegEx)[0]

                if ([denomZero, suitZero] === [denomOne, suitOne]) {
                    return true
                } else if (denomZero > denomOne) {
                    return true
                } else if (denomZero < denomOne) {
                    return false
                }
                // hereafter, it is necessarily the case that
                // d0 == d1

                else if (suitOne === 'NT%') {
                    return false
                } else if (suitZero === 'NT') {
                    return true
                } else {
                    return suitZero > suitOne
                }
            }
        }
    }

    handleBid = (e) => {
        if (this.props.distance !== 0 && this.state.bidHistory === '') {
            alert('Dealer will open the auction with a bid or a pass. Please wait.')
        } else if (this.pastBidCount()) {
            alert("It is not yet your turn. Play proceeds around the table clockwise.")
        } else {
            let bid = `${this.props.myPosition}.${e.target.value}%`
            if (this.increment(bid)) {
                alert("You must Pass or surpass the previous bid.")
            } else {
                fetch(`${DEAL_UPDATE_URL}/${this.props.deal.id}`, {
                    method: "PUT",
                    headers: HEADERS,
                    body: JSON.stringify({'bid_history': bid})
                })
                .then(res => res.json())
                .then(d => {
                    // console.log(d)
                    this.setState({bidHistory: d.history})
                })
                // .then(console.log(this.state.bidHistory))
                .then(() => this.bidAnalysis())
            }
        }
    }

    render() {
        return (
            <div>
                <BidForm handleBid={this.handleBid}/>
                <AuctionTable history={this.state.bidHistory} firstCol={this.props.deal.dealer}/>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser,
        myPosition: state.myPosition,
        currentGame: state.currentGame
    }
}

export default connect(mapStateToProps)(AuctionContainer)
