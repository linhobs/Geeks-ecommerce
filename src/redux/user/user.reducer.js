//use constants for action types for consistency and good practice
import { UserActionTypes } from './user.types'
//set initial state. for when the app renders initially
const INITIAL_STATE = {
    currentUser: null
}
//set initial state as default state value
//always remember to return a new object and spread the old state into it
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            }

        default:
            return state;
    }
}

export default userReducer;