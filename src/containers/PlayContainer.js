import React, { Component } from 'react'
import { connect } from 'react-redux'
import { API_ROOT } from '../constants'
import { Button } from 'semantic-ui-react'

class PlayContainer extends Component {
    // props: currentGame, deal (activeDeal), myPosition,
    constructor(props) {
        super(props)
        this.state = {
            dummyHand: [],
            currentTrick: 1,

        }
    }

    componentDidMount() {
        console.log(this.props)
        let contract = this.props.deal['contract_content']
        this.props.dispatch({type: "SET_CONTRACT", payload: contract})
        // this.getDealInfo()
        if (this.props.deal.dummy !== this.props.myPosition) {
            this.getDummyHand()
        }
    }

    getDummyHand = () => {
        fetch(`${API_ROOT}/hand/${this.props.deal.id}/${this.props.dummy}`)
            .then(res => res.json())
            .then( hand => this.setState({dummyHand: hand}))
    }

    dummyOrientation = () => {
        // console.log("DUMMY FUNCTION", this.props.deal.dummy, this.props.myPosition)
        if (this.props.deal.dummy === this.props.myPosition) {
            return (<div> This round, I am the dummy. </div>)
        } else {
            let seats = ['north', 'east', 'south', 'west']
            while (this.props.myPosition !== seats[0]) {
                let x = seats.pop()
                seats.unshift(x)
            }
            let ind = seats.indexOf(this.props.deal.dummy)
            let zed = ['left', 'center', 'right'][ind - 1]

            return `${zed}Dummy`
        }
    }

    renderDummyHand = (ori) => {

        if (this.props.deal.dummy !== this.props.myPosition) {
            if (ori !== 'centerDummy') {
                return this.state.dummyHand.map( card => {
                    return(
                        <div className='card-container' key={card.ord} >
                            <Button fluid > {card.uni} </ Button>
                        </div>

                )})
            } else {

                return (
                    <Button.Group floated='right'>
                        {this.state.dummyHand.map( card => {
                            return(
                                <Button key={card.ord} onClick={(e) => this.props.handlePlay(e, card, this.props.deal.dummy)} > {card.uni} </ Button>
                        )})}
                    </Button.Group>)

            }
        // <div className='card-container' key={card.ord}>
        //     <div className="dummy-side-card" style={{top: `${offset}`}}>
        //         <img className="dummy-side-card" src={card.img} alt={card.uni}/>
        //     </div >
        // </div>
        }
    }


    render() {
        let ori = this.dummyOrientation()

        return(
            <div id='playOfTheHand'>

                <div className={ori}>
                    {this.renderDummyHand(ori)}
                </div>
                <div className="trickSpace"> </div>

            </div>
        )
    }

}


const mapStateToProps = (state) => {
    return {
        currentGame: state.currentGame,
        myPosition: state.myPosition,
        currentContract: state.currentContract
    }
}


export default connect(mapStateToProps)(PlayContainer)
