import React from "react";
import { Link } from "react-router-dom";
import "./header.styles.scss";
import { auth } from "../../firebase/firebase.utils";
import { connect } from "react-redux";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
const Header = ({ currentUser, hidden }) => {
  return (
    <div className='header'>
      <Link to='/' className='logo-container'>
        <h1 className='logo'>GEEK APPAREL</h1>
      </Link>
      <div className='options'>
        <Link className='option' to='/shop'>
          Shop{" "}
        </Link>
        <Link className='option' to='/shop'>
          Contact
        </Link>
        {/* check user state and display login or logout btn */}
        {currentUser ? (
          <div className='option' onClick={() => auth.signOut()}>
            Sign out
          </div>
        ) : (
          <Link className='option' to='/signin'>
            {" "}
            Sign in
          </Link>
        )}
        <CartIcon />
      </div>
      {/* toggle cart dropdown. implemented with reducer.  
      action triggered on cart icon click*/}
      {hidden ? null : <CartDropdown />}
    </div>
  );
};
//state is the top level root reducer.
//get reducers.
//use advanced destructuring
const mapStateToProps = ({ user: { currentUser }, cart: { hidden } }) => ({
  currentUser,
  hidden,
});

export default connect(mapStateToProps)(Header);
