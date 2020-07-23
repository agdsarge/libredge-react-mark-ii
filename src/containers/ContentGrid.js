import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'

import SideContainer from './SideContainer'
import FocusContainer from './FocusContainer'

class ContentGrid extends Component {
    componentDidMount() {
        console.log("CGRID did mount", this.props.match.path)
        // this.props.dispatch({type: 'SET_ROUTE', payload: this.props.match.path})
    }

    render() {
        return (
            <Grid id="mainGrid">
                <Grid.Column width={2}
                    <div></div>
                </Grid.Column>
                <Grid.Column width={10} >
                    <FocusContainer />
                </Grid.Column>
                <Grid.Column width={4} >
                    <SideContainer orientation="right" />
                </Grid.Column>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentRoute: state.currentRoute,
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps)(ContentGrid)

//
// <Grid.Column width={4} >
//     <SideContainer orientation="left" />
// </Grid.Column>
