import React, { Component } from 'react'
import { connect } from 'react-redux'

class Hand extends Component {
    // constructor(props) {
    //     super(props)
    // }

    render() {
        return(
            <div>
                <div className='myHand' > {this.props.hand.map(card =>(
                    <div key={card.ord} className="card-container">
                        <div className="playing-card" >
                            <img className="playing-card" src={card.img} alt={card.uni}/>
                        </div>
                    </div>))}
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {myPosition: state.myPosition}
}

export default connect(mapStateToProps)(Hand)
