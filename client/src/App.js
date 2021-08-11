import React from 'react';
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import {Route} from 'react-router-dom';
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Register from "./components/Register";
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
</>
  );
};

export default App;

