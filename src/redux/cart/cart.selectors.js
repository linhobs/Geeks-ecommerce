import { createSelector } from 'reselect'

//input selector gets the whole state and just returns a slice of it
//create input selector. gets cart from our state/store
const selectCart = state => state.cart;

//create output selector that returns what we want from state slice
//memorized and will avoid re-renders
//takes a collection of input selectors and a fxn that returns the item we want

export const selectCartItems = createSelector(
    [selectCart],
    cart => cart.cartItems
)

//cart items count selector
//we can apply custom properties on the selectors to get what we want from 
//the items in the state
export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce((accumulatedQuantity, cartItem) =>
        accumulatedQuantity + cartItem.quantity, 0)
)
