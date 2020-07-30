import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table } from 'semantic-ui-react'

class AuctionTable extends Component {


    componentDidMount() {
    }

    componentWillUnmount() {
    }

    generateColumnLabels() {
        let {firstCol} = this.props
        let cols = ['north', 'east', 'south', 'west']
        while (cols[0] !== firstCol) {
            cols.unshift(cols.pop())
        }
        return (cols.map(direction =>
            <Table.HeaderCell key={direction}>
                {direction}
            </Table.HeaderCell >))
    }

    fillTableBody() {
        let keyIndex = 0

        let {firstCol, history} = this.props
        let rows = history.split(firstCol)
        rows.shift()
        let cells = rows.map(r => r.split('%').filter(e => e !== ''))

        return cells.map( c => {
            keyIndex += 1
            return(
                <Table.Row key={keyIndex}>
                {c.map( b => {
                    if (b) {
                        let title = b.match(/[^.]+$/g)
                        keyIndex += 1
                        return (<Table.Cell key={keyIndex}>{title}</Table.Cell>)
                    } else { return <Table.Cell />}

                })
            } </Table.Row>)})
    }

    generateTable() {

        return (
            <Table celled textAlign='center'>
                <Table.Header >
                    <Table.Row>
                        {this.generateColumnLabels()}
                    </Table.Row>
                </Table.Header >
                <Table.Body >
                    {this.fillTableBody()}
                </Table.Body >
            </Table >
        )
    }

    render() {
        return (
            <div>
                {this.generateTable()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser,
        myPosition: state.myPosition,
        currentGame: state.currentGame,
        currentBidPhase: state.currentBidPhase,
        currentContract: state.currentContract
    }
}

export default connect(mapStateToProps)(AuctionTable)
