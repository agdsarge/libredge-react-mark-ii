import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { API_ROOT } from '../constants'
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
    handleEndGame = (e) => {
        let gameID = this.props.currentGame.id
        fetch(`${API_ROOT}/games/finish/${gameID}`)
    }


    componentSelector = () => {
        let dict = {
            'C': 'https://upload.wikimedia.org/wikipedia/commons/8/8a/SuitClubs.svg',
            'D': 'https://upload.wikimedia.org/wikipedia/commons/d/db/SuitDiamonds.svg',
            'H': 'https://upload.wikimedia.org/wikipedia/commons/8/81/U%2B2665.svg',
            'S': 'https://upload.wikimedia.org/wikipedia/commons/5/5b/SuitSpades.svg',
            'NT': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Status_iucn_NT_icon.svg/240px-Status_iucn_NT_icon.svg.png'
        }
        let [nsScore, ewScore ] = this.props.currentDealScore.toFixed(2).split('.')
        ewScore = +ewScore

        if (this.props.rp.match.path.startsWith('/game')) {
            if (this.props.currentBidPhase === false) {
                return (
                    <div>
                        <h2> Contract: </h2>
                        <div><h1 style={{fontSize: '80px', position: 'absolute', left: '20px'}}>{this.props.currentContract.contract.split('')[0]} </h1></div>
                        <img
                            src={dict[this.props.currentContract.trumpSuit]}
                            alt={this.props.currentContract.trumpSuit}
                            style={{maxWidth: '80px', display: 'block', marginLeft: 'auto', marginRight: 'auto'}}
                        />
                        < br/> < br/>
                        <div>
                            <h2>NS: {nsScore}</h2>
                            <h2>EW: {ewScore}</h2>
                        </div>
                        < br/> < br/>
                        <NavLink exact to='/lobby' >
                            <Button color='blue' onClick={this.handleEndGame} > END GAME </Button >
                        </NavLink >
                    </div>
                )
            } else {
                return (
                    <NavLink exact to='/lobby' >
                        <Button color='blue' onClick={this.handleEndGame} > END GAME </Button >
                    </NavLink >
                )
            }

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
        currentContract: state.currentContract,
        currentDealScore: state.currentDealScore
    }
}

export default connect(mapStateToProps)(SideContainer)
