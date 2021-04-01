import Header from "./Header";
import React , {useEffect} from "react";
import "./App.css";
import Home from "./Home";
import Checkout from "./Checkout";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Login";
import {useStateValue} from "./StateProvider";
import {auth} from "./firebase";

function App() {
const [{basket}, dispatch] = useStateValue();

useEffect (() => {
const unsubscribe = auth.onAuthStateChanged((authUser) => {
  if (authUser){

    // the user is logged in
    dispatch({
      type: "SET_USER",
      user: authUser
    })

  } else {

    // the user is logged out
    dispatch({
      type: "SET_USER",
      user: null
    })

  }
});

return () => {
  // any cleanup operations go here
  unsubscribe();
}

}, []);



  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
