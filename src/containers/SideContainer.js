import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

// import { DEAL_UPDATE_URL } from '../constants'
// import ChatContainer from './ChatContainer'

class SideContainer extends Component{
    constructor(props) {
        super(props)
        this.state = {
            activeDeal: {}
        }
    }

    // componentDidMount() {
    //     console.log(this.props)
    // }
    //


    // bidPoll = () => {
    //     console.log("BID POLL", this.props.currentGame)
    //     let gameID = this.props.currentGame.id
    //
    //     fetch(`http://localhost:3005/api/v1/games/latest_deal/${gameID}`)
    //     .then(res => res.json())
    //     // .then(deal => )
    //     .then(d => {
    //         if (d !== this.state.activeDeal) {
    //             this.setState({activeDeal: d})
    //         }
    //     })
        // .then(x => this.state.activeDeal)
        // .then(() => this.state.activeDeal['bid_history'])
        // .then(() => "TEST")

    componentSelector = () => {
        if (this.props.rp.match.path === '/lobby') {
            return <NavLink exact to='/new_game' ><Button color='blue' style={{marginTop:'5px'}}> NEW GAME </Button> </NavLink>
        } else if (this.props.rp.match.path.startsWith('/game')) {
            return <p> GAME! </p>
        } else if (this.props.rp.match.path === '/new_game') {
            return <NavLink exact to='/lobby' >
                        <Button color='blue' style={{marginTop:'5px'}}> BACK TO LOBBY </Button>
                    </NavLink>
        } else {
            return <p> test </p>
        }
    }


    render() {
        return (
            <div id="sideContainer">
                {this.componentSelector()}
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

export default connect(mapStateToProps)(SideContainer)
