const initialState = {
    currentUser: null,
    // currentRoute: null, // is this one necessary?
    currentGame: null,
    currentBidPhase: null,
    currentContract: {
        contract: '', // '1.S', '5.NT'
        trumpSuit: '' // 'S', 'NT'
    },
    myPosition: null
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {...state, currentUser: action.payload}
        // case 'SET_ROUTE':
        //     return {...state, currentRoute: action.payload}
        case 'SET_CONTRACT':
            return {...state, currentDeal: {contract: action.payload, trumpSuit: action.payload.split('.')[1]}}
        case 'SET_GAME':
            return {...state, currentGame: action.payload}
        case 'SET_POSITION':
            return {...state, myPosition: action.payload}
        case 'SET_BID_PHASE':
            return {...state, currentBidPhase: action.payload}
        default:
            return state
    }
}

export default reducer
