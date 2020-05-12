import React, { Component } from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import Header from './components/header/header.component'
import { connect } from 'react-redux'
//import actions
import { setCurrentUser } from './redux/user/user.action'

//firebase auth
//store state of the user
import { auth, createUserProfileDocument } from './firebase/firebase.utils'

import { Route, Switch, Redirect } from 'react-router-dom'

class App extends Component {


  unsubscribeFromAuth = null
  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      //save user in db and state 
      if (userAuth) {
        //using the reference object from firestore
        //to check if the object has changed with new data
        //ensuring what's in db is always recent
        const userRef = await createUserProfileDocument(userAuth);
        //call action to set a state in redux
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          }
          )
        })

      }

      //set state to null when logged out. i.e when userAuth is null
      setCurrentUser(userAuth);

    })
  }
  //close open subscription when component unmounts to avoid memory leak
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage}></Route>
          <Route exact path='/shop' component={ShopPage}></Route>
          {/* redirect signed in users from signup and signin page */}
          <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='/' />) :
            (<SignInAndSignUpPage />)}></Route>

        </Switch>
      </div>
    );
  }
}
//dispatch to allow us modify/add to state in store
//it will dispatch an action
const matchDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

//mapStateToProps to get data from redux state
const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})
export default connect(mapStateToProps, matchDispatchToProps)(App);
