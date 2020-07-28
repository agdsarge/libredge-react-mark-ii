import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'

class BidForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: '',
            distanceFromDealer:null
        }
    }

    componentDidMount() {
        // console.log(this.props.deal)
    }

    generateForm() {
        return ["C", "D", "H", "S", "NT"].map( suit => {
            return(
                <div key={suit}>
                <Button.Group  widths='7' style={{marginBottom: '5px'}}>
                    {['1', '2', '3', '4', '5', '6', "7"].map(denomination =>
                    <Button
                        key={denomination}
                        name={`${denomination}${suit}`}
                        value={`${denomination}${suit}`}
                        onClick={this.props.handleBid}
                    >
                        {`${denomination}${suit}`}
                    </Button>)}
                </Button.Group >
                </div>)
        })
    }


    render() {
        return (
            <div>
                <br /> 
                {this.generateForm()}
                <Button fluid name='Pass' value='Pass' onClick={this.props.handleBid}>Pass</Button> <hr />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {currentGame: state.currentGame}
}

export default connect(mapStateToProps)(BidForm)
