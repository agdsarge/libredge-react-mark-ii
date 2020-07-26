import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { Button } from 'semantic-ui-react'

import { API_ROOT } from '../constants'

class GamesList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            myGames: []
        };
    }

    componentDidMount = () => {
        if (this.props.currentUser) {
            fetch(`${API_ROOT}/lobby/${this.props.currentUser.id}`)
            .then(res => res.json())
            .then(games => {
                if (!games.error){
                    this.setState({ myGames: games })}
            })
        }
    }

    handleClick = game => {
        this.props.dispatch({type: 'SET_GAME', payload: game})
    };

    mapGames = (games, handleClick) => {
        return games.map(game => {
            return (
                <div key={game.id}>
                    <Link  onClick={() => handleClick(game)} to={`games/${game["memorable_string_name"]}`}>
                        <Button >{game["memorable_string_name"]} </Button>
                    </Link>
                    <br />
                </div>)
        })
    }

    // findActiveGame = (myGames, activeGameID) => {
    //     return myGames.find(
    //         game => game.id === activeGameID
    //     )
    // }


    render = () => {
        const { myGames } = this.state;
        return (
            <div>
                <h2 style={{color:'ivory'}}> Lobby </h2>
                < hr />
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
