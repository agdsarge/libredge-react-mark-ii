import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import GameplayArea from '../components/GameplayArea'

import { Card, Image, Button, Form } from 'semantic-ui-react'

import { API_ROOT, HEADERS } from '../constants'


class GamesList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            myGames: [],
            myHand: []
        };
    }


    componentDidMount = () => {
        if (this.props.currentUser) {
            fetch(`${API_ROOT}/lobby/${this.props.currentUser.id}`)
            .then(res => res.json())
            .then(games => {
                console.log(games)
                if (!games.error){
                    this.setState({ myGames: games })}
            })
        }
    }

    handleClick = id => {
        // this.setState({ activeGameID: id })
        // this.setState({activeGame: this.findActiveGame(this.state.myGames, this.state.activeGameID)})
        this.props.dispatch({type: 'SET_GAME', payload: id})
    };

    mapGames = (games, handleClick) => {
        return games.map(game => {
            return (
                <div>
                    <Link key={game.id} onClick={() => handleClick(game.id)} to={`games/${game["memorable_string_name"]}`}>
                        <Button>{game["memorable_string_name"]} </Button>
                    </Link>
                    <hr />
                </div>)
        })
    }

    // findActiveGame = (myGames, activeGameID) => {
    //     return myGames.find(
    //         game => game.id === activeGameID
    //     )
    // }


    render = () => {
        const { myGames, activeGame, activeGameID } = this.state;
        return (
            <div>
                <div className="myGamesList">
                    {this.mapGames(myGames, this.handleClick)}
                </div>
            </div>
        );
    };
}



const mapStateToProps = (state) => {
    return ({currentUser: state.currentUser, currentGame: state.currentGame})
}


export default connect(mapStateToProps)(GamesList)



//
// <h2>my open games: (currently selected: {this.props.currentGame})</h2>
// <div>{this.mapGames(myGames, this.handleClick)}</div>
// {/*<NewGamesForm />*/}
//
// {activeGameID ?
//      <GameplayArea game={this.findActiveGame(myGames, activeGameID)} />
//         :
//     null}
