import React, { Component } from 'react';

class Splash extends Component {

    render() {
        let image = "https://upload.wikimedia.org/wikipedia/commons/1/1f/George_Goodwin_Kilburne_A_good_hand.jpg"
        return (
            <div className='splashBackground' >
                <div className='veryLarge'> Welcome to LiBredge! </div>
                <br /> <hr />
                <div>
                    <h2> LiBredge is for playing contract bridge online. </h2>
                    <h2> It is free, and it always will be free. </h2>
                    <h2> Please sign in. If you are new, please register. </h2>
                </div>
            </div>
        )
    }
}

export default Splash
