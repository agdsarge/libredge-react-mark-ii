import React, { Component } from 'react';
import { ActionCable } from 'react-actioncable-provider';
import { API_ROOT } from '../constants';
import { connect } from 'react-redux'

import { Button } from 'semantic-ui-react'

// import NewConversationForm from './NewConversationForm';
// import MessagesArea from './MessagesArea';
import Cable from '../components/Cable';


class GamesList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            myGames: [],
            activeGame: null
        };
    }


    componentDidMount = () => {
        if (this.props.currentUser) {
            fetch(`${API_ROOT}/lobby/${this.props.currentUser.id}`)
            .then(res => res.json())
            .then(games => this.setState({ myGames: games }));
        }
    }

    handleClick = id => {
        this.setState({ activeGame: id });
    };

    handleReceivedGame = response => {
        console.log(response)
        // const { conversation } = response;
        // this.setState({
        //     conversations: [...this.state.conversations, conversation]
        // });
    };

    handleReceivedDeal = response => {
        console.log(response)
        // const { message } = response;
        // const conversations = [...this.state.conversations];
        // const conversation = conversations.find(
        //     conversation => conversation.id === message.conversation_id
        // );
        // conversation.messages = [...conversation.messages, message];
        // this.setState({ conversations });
    };


    mapGames = (games, handleClick) => {
        return games.map(game => {
            return (
                <div>
                    <Button key={game.id} onClick={() => handleClick(game.id)}>
                    {game["memorable_string_name"]}
                    </Button>
                    <br />
                </div>
            );
        });
    };


    render = () => {
        const { myGames, activeGame } = this.state;
        return (
            <div className="myGamesList">
            <ActionCable
                channel={{ channel: 'GamesChannel' }}
                onReceived={this.handleReceivedGame}
            />
            {this.state.myGames.length ? (
                <Cable
                    conversations={myGames}
                    handleReceivedMessage={this.handleReceivedGame}
                />
            ) : null}
            <h2>my open games:</h2>
            <div>{this.mapGames(myGames, this.handleClick)}</div>
            {/*<NewConversationForm />*/}
            {/*{activeConversation ? (
                <MessagesArea
                conversation={findActiveConversation(
                    conversations,
                    activeConversation
                )}
                />
            ) : null}*/}
            </div>
        );
    };
}



const mapStateToProps = (state) => {
    return ({currentUser: state.currentUser})
}





// helpers

const findActiveConversation = (conversations, activeConversation) => {
    return conversations.find(
        conversation => conversation.id === activeConversation
    );
};



export default connect(mapStateToProps)(GamesList)
