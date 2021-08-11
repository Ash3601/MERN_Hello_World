import React from "react";
import dp from "../assets/images/dp.jpg";

const About = () => {
  return (
    <>
      <h2>About Me</h2>
      <div id="" className="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="img-box">
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
    </>
  );
};

export default About;
