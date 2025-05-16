import React from "react";
import { useAuth } from "../store/auth";
import "./About.css";

const About = () => {
  const { user } = useAuth();
  
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About Us</h1>
        <div className="underline"></div>
      </div>

      <div className="about-content">
        <div className="about-image">
          <h3 className="show-username">Hello {user ? user.username : "user"}</h3> 
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
            alt="Team"
          />
        </div>
        <div className="about-text">
          <h2>Our Story</h2>
          <p>
            We are a passionate team dedicated to creating amazing experiences.
            Our journey began with a simple idea: to make a difference through
            innovation and creativity.
          </p>

          <h2>Our Mission</h2>
          <p>
            To deliver exceptional solutions that empower businesses and
            individuals to achieve their goals through cutting-edge technology
            and dedicated support.
          </p>

          <div className="stats">
            <div className="stat-item">
              <h3>5+</h3>
              <p>Years Experience</p>
            </div>
            <div className="stat-item">
              <h3>100+</h3>
              <p>Projects Completed</p>
            </div>
            <div className="stat-item">
              <h3>50+</h3>
              <p>Happy Clients</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
