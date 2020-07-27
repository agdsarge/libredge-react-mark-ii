import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'
import {DEAL_UPDATE_URL, HEADERS } from '../constants'


class BidForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: '',
            distanceFromDealer:null
        }
    }

    componentDidMount() {
        // console.log(this.props.deal)
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




    generateForm() {
        return ["C", "D", "H", "S", "NT"].map( s => {
            return(
                <div>
                <Button.Group key={s} widths='7'>
                    {['1', '2', '3', '4', '5', '6', "7"].map(n =>
                    <Button
                        key={`${n}${s}`}
                        name={`${n}${s}`}
                        value={`${n}${s}`}
                        onClick={this.props.handleBid}
                    >
                        {`${n}${s}`}
                    </Button>)}
                </Button.Group >
                </div>)
        })

    }


    render() {
        return (
            <div>
                <h3 style={{color:'ivory', position: 'absolute', left:'40%'}}> AUCTION </h3>
                <br/> <br/> <hr />
                {this.generateForm()}
                <Button fluid name='Pass' value='Pass' onClick={this.props.handleBid}>Pass</Button> <hr />
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {currentGame: state.currentGame}
}


export default connect(mapStateToProps)(BidForm)
