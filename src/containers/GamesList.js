import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { Button } from 'semantic-ui-react'

import { API_ROOT, REFRESH_RATE } from '../constants'

class GamesList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            myGames: [],
            intervalID: null
        };
    }

    componentDidMount = () => {
        if (this.props.currentUser) {
            this.gamesFetcher()
            let id = setInterval(this.gamesFetcher, REFRESH_RATE)
            this.setState({intervalID: id})
        }
    }

    componentWillUnmount = () => {
        clearInterval(this.state.intervalID)
    }

    gamesFetcher = () => {
        fetch(`${API_ROOT}/lobby/${this.props.currentUser.id}`)
        .then(res => res.json())
        .then(games => {
            if (!games.error){
                this.setState({ myGames: games })}
        })
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
                    <br />
                </div>)
        })
    }

    render = () => {
        const { myGames } = this.state;
        return (
            <div className="lobbyList">
                <h2 style={{color:'ivory', float: 'left'}}> Open Games </h2>
                <NavLink exact to='/new_game' style={{float:'right'}} ><Button color='blue' style={{marginTop:'5px'}}> NEW GAME </Button> </NavLink>

                <br />
                <br />
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
