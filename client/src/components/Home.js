import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../App.css";
import "../assets/css/Home.css";
function Home() {
  return (
    <div className="jumbotron d-flex align-items-center vh-100">
      <div className="container text-center ml-auto mr-auto home-div text-center">
        <h2 className="lead mb-4 fs-3">Welcome</h2>
        <p className="fs-2">We are MERN Developer</p>
      </div>
    </div>
    // <div className="home-page">
    //   <div className="home-div">
    //     <h2 className="pt-5">WELCOME</h2>
    //     <p>I am a MERN Developer</p>
    //   </div>
    // </div>
  );
}

export default Home;
