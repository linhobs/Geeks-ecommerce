import { CartActionTypes } from './cart.types'
import { addItemToCart } from './cart.utils'
//initial state. dropdown is hidden
const INITIAL_STATE = {
    hidden: true,
    cartItems: []
}
//reducer
const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CartActionTypes.TOGGLE_CART_HIDDEN:
            //TOGGLE HIDDEN VALUE. opposite of state hidden value
            return {
                ...state,
                hidden: !state.hidden
            }
        case CartActionTypes.ADD_ITEM:
            //create a new array with existing cart items 
            //and new item being added (action payload)
            //we use a util fxn to check multiple

            return {
                ...state,
                cartItems: addItemToCart(state.cartItems, action.payload)
            }

        default:
            return state
    }
}
export default cartReducer