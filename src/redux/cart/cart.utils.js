//utility function to avoid the same item from appearing
//multiple times in our cart item and instead increase the quantity
//utility fxns allow us to keep our files clean 
//and keep files we may need in multiple files in one location
export const addItemToCart = (cartItems, cartItemToAdd) => {
    //check if item to add exists
    const existingCartItem = cartItems.find(
        cartItem => cartItem.id === cartItemToAdd.id);
    //increase quantity if 
    if (existingCartItem) {
        return cartItems.map(cartItem =>
            cartItem.id === cartItemToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem

        )
    }
    //if it doesn't exist/new item, add it and add an initial qty of one
    return [...cartItems, { ...cartItemToAdd, quantity: 1 }]
}
