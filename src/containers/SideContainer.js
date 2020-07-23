import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux'

// import ChatContainer from './ChatContainer'

class SideContainer extends Component{

    render() {
        return (
            <div id="sideContainer">
                <p> {this.props.currentUser ?  this.props.currentUser.username : this.props.orientation} </p>
                <Button inverted color='blue' style={{marginTop:'30%'}}> NEW GAME </Button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser
        // currentRoute: state.currentRoute
    }
}

export default connect(mapStateToProps)(SideContainer)
