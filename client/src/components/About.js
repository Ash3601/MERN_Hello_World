import React from "react";
import dp from "../assets/images/dp.jpg";

const About = () => {
  return (
    <div className="container">
      <h2 style={{ color: "white" }}>About Me</h2>
      <div id="" className="">
        <div className="text-center">
          <div className="">
            <div className="img-fluid">
              <img src={dp} alt="" />
            </div>
            <p className="testimonial lead">
              I am a B.tech C.S.E student form Rajasthan Technical University.
            </p>
            <p className="overview lead">
              <b>Ashin Abbasi</b>MERN stack developer from{" "}
              <a href="https://www.rtu.ac.in/" _blank="true">
                Rajasthan Technical University
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
