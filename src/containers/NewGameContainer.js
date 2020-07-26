import React, { Component } from 'react'
import { connect } from 'react-redux'
import {ALL_OTHER_PLAYERS_URL} from '../constants'
import NewGameForm from '../components/NewGameForm'

class NewGameContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allRegisteredPlayers: [],
            east: null,
            south: null,
            west: null
        }
    }
    componentDidMount() {
        fetch(`${ALL_OTHER_PLAYERS_URL}/${this.props.currentUser.id}`)
        .then(res => res.json())
        .then(d => {
            // console.log(d)
            this.setState({allRegisteredPlayers: d})
        })
        // .then(console.log(this.state))
    }

    handleChange = (e, data) => {
        // console.log(data)
        let id = data.value
        let position = data.placeholder.toLowerCase()
        // console.log({[position]: id})
        this.setState({[position]: id})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let {east, south, west} = this.state
        let submission = {north: this.props.currentUser.id, east: east, south: south, west: west}
        console.log(submission)
        //create a game. create four Player Games

    }

    render() {
        let {allRegisteredPlayers, east, south, west} = this.state
        return(<NewGameForm players={allRegisteredPlayers} east={east} south={south} west={west} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>)
    }
}

const mapStateToProps = (state) => {
    return {currentUser: state.currentUser}
}

export default connect(mapStateToProps)(NewGameContainer)
