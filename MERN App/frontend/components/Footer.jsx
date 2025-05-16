import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="waves">
        <div className="wave" id="wave1"></div>
        <div className="wave" id="wave2"></div>
        <div className="wave" id="wave3"></div>
        <div className="wave" id="wave4"></div>
      </div>

      <div className="footer-content">
        <div className="footer-section brand">
          <h2>TechVibe</h2>
          <p>Innovating the future, one line of code at a time.</p>
          <div className="footer-gif">
            <img
              src="https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif"
              alt="Coding Animation"
            />
          </div>
        </div>

        <div className="footer-section">
          <h3>Explore</h3>
          <ul>
            <li>
              <a href="#">Our Projects</a>
            </li>
            <li>
              <a href="#">Technology Stack</a>
            </li>
            <li>
              <a href="#">Blog & News</a>
            </li>
            <li>
              <a href="#">Careers</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Stay Connected</h3>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </form>
          <div className="social-links">
            <a href="#" className="social-btn">
              <i className="fa-brands fa-github"></i>
            </a>
            <a href="#" className="social-btn">
              <i className="fa-brands fa-x-twitter"></i>
            </a>
            <a href="#" className="social-btn">
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
            <a href="#" className="social-btn">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="#" className="social-btn">
              <i className="fa-brands fa-youtube"></i>
            </a>
            <a href="#" className="social-btn">
              <i className="fa-brands fa-discord"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; 2024 TechVibe | Crafted with <span className="heart">♥</span>{" "}
          by Developers
        </p>
      </div>
    </footer>
  );
};

export default Footer;
