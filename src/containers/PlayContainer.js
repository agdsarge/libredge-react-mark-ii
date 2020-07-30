import React, { Component } from 'react'
import { connect } from 'react-redux'
import { API_ROOT, DECK, REFRESH_RATE } from '../constants'
import { Button, Table } from 'semantic-ui-react'

class PlayContainer extends Component {
    // props: currentGame, deal (activeDeal), myPosition,
    constructor(props) {
        super(props)
        this.state = {
            dummyHand: [],
            currentTrick: [null, null, null, null],
            intervalID: null,
        }
    }

    componentDidMount() {
        console.log("EXAMINE ME!", this.props)
        // setTimeout(() => console.log('will this work?'), 2000)
        if (this.props.deal['contract_content']) {
            let contract = this.props.deal['contract_content']
            this.props.dispatch({type: "SET_CONTRACT", payload: contract})
        }
        // this.getDealInfo()
        if (this.props.deal.dummy && this.props.myPosition && (this.props.deal.dummy !== this.props.myPosition)) {
            this.getDummyHand()
        }
        if (this.props.deal.id && this.props.trickCount) {
            this.getTrickData()
            let id = setInterval(this.getTrickData, REFRESH_RATE)
            this.setState({intervalID: id})
        }
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalID)
    }

    getTrickData = () => {
        let url = `${API_ROOT}/deals/${this.props.deal.id}/play/${this.props.trickCount}`
        // console.log("HERE NOW!!!", this.props.deal.id, this.props.trickCount, url)

        fetch(url)
        .then(res => res.json())
        .then(d => {
            // console.log("HERE AGAIN!", d)
            if (d.finished === true) {
                this.setState({currentTrick: [null, null, null, null]})
                this.props.incrementTrickCount()
            }
            if (d.trickString) {
                this.newTrickArray(d.trickString)
            }
        })
    }

    newTrickArray = (trickString) => {
        // console.log('NEW TRICK IN PLAY CONTAINER')
        let trStrArr = trickString.split('%')
        for (let el of trStrArr) {
            if (el === '') {
                continue
            } else {
                let [position, c] = el.split('.')

                let card = DECK[c]
                let pDict = {
                    north: 0,
                    east: 1,
                    south: 2,
                    west: 3
                }
                if (this.state.currentTrick.includes(null)) {
                    let x = [...this.state.currentTrick]
                    x[pDict[position]] = card
                    console.log(x)
                    this.setState({currentTrick: x})
                } else {
                    let x = [null, null, null, null]
                    x[pDict[position]] = card
                    console.log(x)
                    this.setState({currentTrick: x})
                }
            }
        }
    }

    getDummyHand = () => {
        fetch(`${API_ROOT}/hand/${this.props.deal.id}/${this.props.dummy}`)
            .then(res => res.json())
            .then( hand => this.setState({dummyHand: hand}))
    }

    dummyDirection = () => {
        // console.log("DUMMY FUNCTION", this.props.deal.dummy, this.props.myPosition)
        if (this.props.deal.dummy === this.props.myPosition) {
            return ('This round, I am the dummy.')
        } else {
            let seats = ['north', 'east', 'south', 'west']
            while (this.props.myPosition !== seats[0]) {
                let x = seats.pop()
                seats.unshift(x)
            }
            let ind = seats.indexOf(this.props.deal.dummy)
            let dummyOrientation = ['left', 'center', 'right'][ind - 1]
            this.props.dispatch({type: 'SET_DUMMY_ORIENTATION', payload: dummyOrientation})
            return `${dummyOrientation}Dummy`
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
        let ori = this.dummyDirection()

        return(
            <div id='playOfTheHand'>

                <div className={ori}>
                    {this.renderDummyHand(ori)}
                </div>
                <div className="trickSpace">
                    <Table celled>
                        <Table.Header >
                            <Table.Row >
                                {['north', 'east', 'south', 'west'].map(d => <Table.Cell key={d} >{d} </Table.Cell>)}
                            </Table.Row >
                        </Table.Header >
                        <Table.Body>
                            <Table.Row>
                                {this.state.currentTrick.map((c, index) => {
                                    if (c) {
                                        return <Table.Cell key={c.uni} ><img className="playing-card" src={c.img} alt={c.uni} /></Table.Cell>
                                    } else {
                                        return <Table.Cell key={index}> </Table.Cell>
                                    }})
                                }
                            </Table.Row>
                        </Table.Body>
                    </Table >
                </div>
            </div>
        )
    }

}


const mapStateToProps = (state) => {
    return {
        currentGame: state.currentGame,
        myPosition: state.myPosition,
        currentContract: state.currentContract,
        dummyOrientation: state.dummyOrientation
    }
}


export default connect(mapStateToProps)(PlayContainer)
