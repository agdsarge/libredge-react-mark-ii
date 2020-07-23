import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux'

// import ChatContainer from './ChatContainer'

class SideContainer extends Component{

    childSelector = () => {
        if (this.props.currentRoute === '/game') {
            if (this.props.orientation === 'right') {
                return <h2> options </h2>
            } else {
                return <ChatContainer />}
        } else {
            if (this.props.orientation === 'right') {
                return <Button inverted color='blue' style={{marginTop:'30%'}}> NEW GAME </Button>
            } else {
                return <h1 color='ivory'>OPTIONS</h1>}
        }
    }

    render() {
        return (
            <div id="sideContainer">
                <p> {this.props.currentUser ?  this.props.currentUser.username : this.props.orientation} </p>
                {this.childSelector()}
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
