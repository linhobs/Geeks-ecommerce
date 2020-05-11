import { CartActionTypes } from './cart.types'

export const toggleCartDropdown = () => ({
    type: CartActionTypes.TOGGLE_CART_HIDDEN
    //sorry bro. we don't need a payload here
})

//add items actin
export const addItem = (item) => ({
    type: CartActionTypes.ADD_ITEM,
    payload: item
})