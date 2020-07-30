import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'


class NewGameForm extends Component {
    eastFilter = () => {
        let {players, south, west} = this.props
        return players.filter(p => p.id !== parseInt(south)).filter(p => p.id !== parseInt(west))
    }

    westFilter = () => {
        let {east, south, players} = this.props
        return players.filter(p => p.id !== parseInt(south)).filter(p => p.id !== parseInt(east))
    }

    southFilter = () => {
        let {east, players, west} = this.props
        return players.filter(p => p.id !== parseInt(west)).filter(p => p.id !== parseInt(east))
    }

    render() {
        let {east, south, west} = this.props
        return(
            <div className='newGameFormContainer' >
            <Form onSubmit={this.props.handleSubmit}>
                <h1> By default, {this.props.currentUser.username} is dealer and is seated North.</h1>
                <hr />
                <div className='oldDropdownWasHere'></div>
                <div className='custom-select' >
                    <div className='west-select' >
                        <select name='west' id='west-select' onChange={this.props.handleChange} value={west}>
                            <option value=''> West </option>
                            {this.westFilter().map(p => <option key={p.id} value={p.id} name={p.username} > {p.username} </option>)}
                        </select>
                    </div>
                    <div className='east-select'>
                        <select name='east' id='east-select' onChange={this.props.handleChange} value={east}>
                            <option value=''> East </option>
                            {this.eastFilter().map(p => <option key={p.id} value={p.id} > {p.username} </option>)}
                        </select>
                    </div>
                    <div className='south-select'>
                        <select name='south' id='south-select' onChange={this.props.handleChange} value={south}>
                            <option value=''> South </option>
                            {this.southFilter().map(p => <option key={p.id} value={p.id} > {p.username} </option>)}
                        </select>
                    </div>
                    <Button color='blue' id='submit-select' type='submit'>SUBMIT</Button>
                </div >
            </Form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {currentUser: state.currentUser}
}

export default connect(mapStateToProps)(NewGameForm)

// style={{backgroundColor: 'transparent', color:'black'}}

// <div>
//     <Dropdown
//         placeholder='West'
//         name='west'
//         onChange={this.props.handleChange}
//         value={west.id}
//         text={west.text}
//         search
//         selection
//         options={players}
//     />
//     <Dropdown
//         placeholder='East'
//         name='east'
//         onChange={this.props.handleChange}
//         value={east.id}
//         text={east.text}
//         search
//         selection
//         options={players}
//     />
//
//     <Dropdown
//         placeholder='South'
//         name='south'
//         onChange={this.props.handleChange}
//         value={south.id}
//         text={south.text}
//         search
//         selection
//         options={players}
//     />
//     <input type='submit' />
// </div>
