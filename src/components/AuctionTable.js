import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table } from 'semantic-ui-react'

class AuctionTable extends Component {
    // str = () => {
    //     return this.props.game.bid_history
    // }

    componentDidMount() {
        console.log("AUCTION TABLE", this.props.history)
        // console.log(this.props.game.deals.slice(-1)[[0]]['bid_history'])
    }

    componentWillUnmount() {

    }

    generateTable() {
        let keyIndex = 0
        let {firstCol, history} = this.props
        let cols = ['north', 'east', 'south', 'west']
        while (cols[0] !== firstCol) {
            cols.unshift(cols.pop())
        }

        let rows = history.split(firstCol)
        rows.shift()
        let cells = rows.map(r => r.split(';'))
        let tableBody = cells.map( c => {
            keyIndex += 1
            return(<Table.Row key={keyIndex}>
                {c.map( b => {
                    let title = b.match(/[^.]+$/g)
                    keyIndex += 1
                    return (<Table.Cell key={keyIndex}>
                        {title}
                    </Table.Cell>)
                })
                }
            </Table.Row>)
        })

        return (
            <Table celled >
                <Table.Header >
                    <Table.Row>
                        {cols.map(direction =>
                            <Table.HeaderCell
                                key={direction}
                            >
                                {direction}
                            </Table.HeaderCell >)}
                    </Table.Row>
                </Table.Header >
                <Table.Body >
                    {tableBody}
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
