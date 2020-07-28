import React, { Component } from 'react'
import { connect } from 'react-redux'

class PlayContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dummyUIposition: null
        }
    }

    componentDidMount() {
        console.log(this.props)
        this.relativePositionOfDummy()
    }

    relativePositionOfDummy = () => {
        if (this.props.myPosition !== this.props.deal.dummy) {
            console.log('relativePositionOfDummy')
            // let positions = {1: 'right', 2: 'up', 3: 'left'}
            // // the dummy's position is relative to the player. we should do this with an ary rotation
            //
            // let seats = ['north', 'east', 'south', 'west']
            // while (seats[0] != this.props.myPosition) {
            //     seats.unshift(seats.pop())
            // }
            //
            // let counter = 0
            // while (seats[0] != this.props.deal.dummy) {
            //     seats.unshift(seats.pop())
            //     counter += 1
        }
            // this.setState({dummyUIposition: positions[counter]})
    }


    render() {
        let rdod = this.state.dummyUIposition
        return(
            <div id='playOfTheHand'>
                <p> hello {this.props.deal.dummy}</p>
                <div>{rdod ? <div className={rdod}> {rdod} </div> : <p> I AM THE DUMMY! </p>}</div>
                <p>HOW DID I DO </p>
            </div>
        )
    }

}


const mapStateToProps = (state) => {
    return {
        currentGame: state.currentGame,
        myPosition: state.myPosition
    }
}


export default connect(mapStateToProps)(PlayContainer)
