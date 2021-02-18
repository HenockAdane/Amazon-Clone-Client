import logo from './logo.svg';
import './App.css';
import Header from './JScomponents/Header';
import Home from './JScomponents/Home';
import ShopCategory from './JScomponents/ShopCategory';
import {Redirect, Route, Switch} from "react-router-dom"
import ProductBig from './JScomponents/ProductBig';
import CheckOut from './JScomponents/CheckOut';
import SignIn from './JScomponents/SignIn';
import { useEffect } from 'react';
import SignUp from './JScomponents/SignUp';
import AccountConfirmation from './JScomponents/AccountConfirmation';
import {useDispatch, useSelector} from "react-redux"
import {updateUserAction} from "./ReduxReducers/userReducer"
import {addLocalStorageCartAction} from "./ReduxReducers/shoppingCartReducer"
import CreateReview from './JScomponents/CreateReview';
import Account from './JScomponents/Account';
import LoginAndSecurity from './JScomponents/LoginAndSecurity';
import SecurityEdit from './JScomponents/EditName';
import EditName from './JScomponents/EditName';
import EditEmail from './JScomponents/EditEmail';
import EditPassword from './JScomponents/EditPassword';
import Orders from './JScomponents/Orders';
import Lists from './JScomponents/Lists';




function App() {

  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.userReducer.currentUser)

  useEffect(()=> {

    const user = JSON.parse(localStorage.getItem("amazonCloneUser"))
    const cart = JSON.parse(localStorage.getItem("amazonCloneCart"))

    if (user){
      dispatch(updateUserAction(user))
    }


    // if (cart && cart.length > 0){
    //   dispatch(addLocalStorageCartAction(cart))
    // }

    

  }, [])
  return (
    <div className="App">

    <Header />


    <Switch>

          <Route exact path="/" render={()=> (
            <Home />
          )} />

          <Route exact path="/shop/category/:category" render={()=> (
            <ShopCategory />
          )} />

          <Route exact path="/shop/product/:productID" render={()=> (
            <ProductBig />
          )} />

          <Route exact path="/auth/signin" render={()=> 
          currentUser && currentUser.confirmed ? <Redirect to="/" /> : currentUser ? <Redirect to="/auth/confirm/account" /> : <SignIn />
          } />

          <Route exact path="/auth/signup" render={()=>
            currentUser && currentUser.confirmed ? <Redirect to="/" /> : currentUser ? <Redirect to="/auth/confirm/account" /> : <SignUp />
          } />

          <Route exact path="/shop/checkout" render={()=> (
            <CheckOut />
          )} />

          <Route exact path="/auth/confirm/account" render={()=> 
          currentUser && currentUser.confirmed ? <Redirect to="/" /> : currentUser ? <AccountConfirmation /> : <Redirect to="/auth/signin" />
          } />

          <Route exact path="/review/create-review/edit/product/:productID" render={()=>
          currentUser && currentUser.confirmed ? <CreateReview /> : <Redirect to="/auth/signin" />
          } />


          <Route exact path="/account" render={()=>
          currentUser ? <Account /> : <Redirect to="/auth/signin" />
          } />

          <Route exact path="/account/settings/login-and-security" render={()=>
          currentUser ? <LoginAndSecurity /> : <Redirect to="/auth/signin" />
          } />

          <Route exact path="/account/settings/login-and-security/edit/name" render={()=>
          currentUser ? <EditName /> : <Redirect to="/auth/signin" />
          } />

          <Route exact path="/account/settings/login-and-security/edit/email" render={()=>
          currentUser ? <EditEmail /> : <Redirect to="/auth/signin" />
          } />

          <Route exact path="/account/settings/login-and-security/edit/password" render={()=>
          currentUser ? <EditPassword /> : <Redirect to="/auth/signin" />
          } />

          <Route exact path="/orders" render={()=> 
            currentUser ? <Orders /> : <Redirect to="/auth/signin" />
          } />

          <Route exact path="/list" render={()=>
          currentUser ? <Lists /> : <Redirect to="/auth/signin" />
          } />

          

    </Switch>

    </div>
  );
}

export default App;
