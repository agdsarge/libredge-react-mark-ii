import React, { Component } from 'react';
import { ActionCable } from 'react-actioncable-provider';
// import { API_ROOT } from '../constants';
import { connect } from 'react-redux'

// import { Button } from 'semantic-ui-react'

// import NewConversationForm from './NewConversationForm';
// import MessagesArea from './MessagesArea';
import Cable from '../components/Cable';
import GameplayArea from '../components/GameplayArea'

import { Card, Image, Button, Form } from 'semantic-ui-react'


import { API_ROOT, HEADERS } from '../constants'


class GamesList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            myGames: [],
            activeGameID: null,
            activeGame: null,
            activeDeal: {},
            counter: 1,
            myHand: []
        };
    }


    componentDidMount = () => {
        if (this.props.currentUser) {
            fetch(`${API_ROOT}/lobby/${this.props.currentUser.id}`)
            .then(res => res.json())
            .then(games => this.setState({ myGames: games }))
        }
    }

    handleClick = id => {
        this.setState({ activeGameID: id })
        // this.setState({activeGame: this.findActiveGame(this.state.myGames, this.state.activeGameID)})
        this.props.dispatch({type: 'SET_GAME', payload: id})
    };

    handleReceivedGame = response => {
        console.log("HANDLE RECEIVED GAME", response)
        const { game } = response;
        this.setState({
            myGames: [...this.state.myGames, game]
        });
    };

    handleReceivedDeal = response => {
        console.log("HANDLE RECEIVED DEAL", response)
        // const { message } = response;
        // const conversations = [...this.state.conversations];
        // const conversation = conversations.find(
        //     conversation => conversation.id === message.conversation_id
        // );
        // conversation.messages = [...conversation.messages, message];
        // this.setState({ conversations });
    };

    mapGames = (games, handleClick) => {
        return games.map(game => {
            return (
                <div>
                    <Button key={game.id} onClick={() => handleClick(game.id)}>
                    {game["memorable_string_name"]}
                    </Button>
                    <hr />
                </div>)
        })
    }

    findActiveGame = (myGames, activeGameID) => {
        return myGames.find(
            game => game.id === activeGameID
        )
    }

    handleBid = (e) => {
        if (this.state.activeDeal.bid_phase) {
        let bid = e.target.innerText.slice(0,2)
        console.log(bid)

        let body = {"bid_history": bid}
        console.log(JSON.stringify(body))
        fetch(`${API_ROOT}/deals/${this.state.activeDeal.id}`, {
            method: "PUT",
            headers: HEADERS,
            body: JSON.stringify(body)
        })
        // .then(res => res.json())
        // .then(console.log)
    } else {
        alert("bid phase over")
    }}


    render = () => {
        const { myGames, activeGame, activeGameID } = this.state;
        return (
            <div className="myGamesList">
            <ActionCable
                channel={{ channel: 'GamesChannel' }}
                onReceived={this.handleReceivedGame}
            />
            {this.state.myGames.length ? (
                <Cable
                    games={myGames}
                    handleReceivedDeal={this.handleReceivedDeal}
                />
            ) : null}
            <h2>my open games: (currently selected: {this.props.currentGame})</h2>
            <div>{this.mapGames(myGames, this.handleClick)}</div>
            {/*<NewGamesForm />*/}

            {activeGameID ?
                 <GameplayArea game={this.findActiveGame(myGames, activeGameID)} />
                    :
                null}
            </div>
        );
    };
}



const mapStateToProps = (state) => {
    return ({currentUser: state.currentUser, currentGame: state.currentGame})
}


export default connect(mapStateToProps)(GamesList)
