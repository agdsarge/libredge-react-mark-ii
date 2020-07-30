import React, { Component } from 'react'
import { connect } from 'react-redux'
import {ALL_OTHER_PLAYERS_URL, NEW_GAME_URL, HEADERS} from '../constants'
import NewGameForm from '../components/NewGameForm'
import { Redirect } from 'react-router-dom'

class NewGameContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allRegisteredPlayers: [],
            availPlayers: [],
            east: null,
            south: null,
            west: null,

            redirect: false
        }
    }

    componentDidMount() {
        fetch(`${ALL_OTHER_PLAYERS_URL}/${this.props.currentUser.id}`)
        .then(res => res.json())
        .then(d => {
            // console.log(d)
            this.setState({allRegisteredPlayers: d, availPlayers: d})
        })
        // .then(console.log(this.state))
    }

    handleChange = (e) => {
        console.log(e.target.value, e.target.name)
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let {east, south, west} = this.state
        if (east === null || south === null || west === null) {
            alert("please provide all players for this game")
        }
        else {
            let submission = {north: this.props.currentUser.id, east: east.id, south: south.id, west: west.id}
            // console.log(submission)
            //create a game. create four Player Games
            fetch(NEW_GAME_URL, {
                method: 'POST',
                headers: HEADERS,
                body: JSON.stringify(submission)
            })
            .then(res=> res.json())
            .then(d => alert(`Game sucessfully created. It has the name ${d.memorable_string_name}`))
            .then(this.setState({
                east: null,
                south: null,
                west: null
            }))
            .then(this.setState({redirect: true}))
        }
    }

    render() {
        let {availPlayers, east, south, west, redirect} = this.state
        // let plobs = availPlayers.map( p => { return {value: p.id, text: p.username}})
        return(
            <div>
                <NewGameForm
                    players={availPlayers}
                    east={east}
                    south={south}
                    west={west}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                />
                {redirect ? <Redirect to='/lobby' /> : null}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {currentUser: state.currentUser}
}

export default connect(mapStateToProps)(NewGameContainer)
