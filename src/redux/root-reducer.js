//combine all the reducers. 
import { combineReducers } from 'redux';
//bring in other reducers
import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer'




export default combineReducers({
    user: userReducer,
    cart: cartReducer
})