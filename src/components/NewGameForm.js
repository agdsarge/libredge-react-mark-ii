import React, { Component } from 'react'
import { Dropdown, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'


class NewGameForm extends Component {
    openSeats = () => {

        let {east, south, west} = this.props // east: 17, west: null, south: null
        let seats = [east, south, west] // [17, null, null ]
        let players = this.props.players.filter(p => !seats.includes(p.id))
        // console.log(seats, west)
        console.log("NEW GAME FORM", players)
        let updated_players = players.map(p =>{ return ({key: p.id, value: p.id, text: p.username, name:p.username})})
        console.log("UPDATED", updated_players)
        return updated_players
    }
    render() {
        let {east, south, west} = this.props
        let opts = this.openSeats()
        return(
            <Form onSubmit={this.props.handleSubmit}>
                <p> North, by default is you, {this.props.currentUser.username} </p>
                <div>
                    <Dropdown
                        onChange={this.props.handleChange}

                        placeholder='West'
                        value={west}
                        search
                        selection
                        options={opts}
                    />
                    <Dropdown
                        onChange={this.props.handleChange}

                        placeholder='East'
                        value={east}
                        search
                        selection
                        options={opts}
                    />
                    <hr />
                    <Dropdown
                        onChange={this.props.handleChange}

                        placeholder='South'
                        value={south}
                        search
                        selection
                        options={opts}
                    />
                    <input type='submit' />
                </div>
            </Form>
        )
    }
}

const mapStateToProps = (state) => {
    return {currentUser: state.currentUser}
}

export default connect(mapStateToProps)(NewGameForm)

// style={{backgroundColor: 'transparent', color:'black'}}
