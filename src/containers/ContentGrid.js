import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'

import SideContainer from './SideContainer'
import FocusContainer from './FocusContainer'

class ContentGrid extends Component {
    componentDidMount() {
        console.log("CGRID did mount", this.props)
    }

    render() {
        let {match} = this.props
        return (
            <Grid id="mainGrid">
                <Grid.Column width={2} >
                    <div></div>
                </Grid.Column>
                <Grid.Column width={10} >
                    <FocusContainer component={this.props.focusComponent}/>
                </Grid.Column>
                <Grid.Column width={4} >
                    {(match.path === "/login" || match.path === '/register' || match.path === '/lobby') ?
                        null
                            :
                        <SideContainer rp={this.props} component={null}/>}
                </Grid.Column>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps)(ContentGrid)
