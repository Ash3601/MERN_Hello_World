import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { Route } from "react-router-dom";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Register from "./components/Register";
// import Page404 from "./components/Page404";
const App = () => {
  return (
    <>
      <Navbar />
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/about">
        <About />
      </Route>
      <Route path="/contact">
        <Contact />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      {/* <Route path="*" exact component={Page404} /> */}
    </>
  );
};

export default App;
