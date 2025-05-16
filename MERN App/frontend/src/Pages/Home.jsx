import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Our Platform</h1>
          <p>Discover amazing features and possibilities</p>
          <button className="cta-button">Get Started</button>
        </div>
      </section>

      <section className="features">
        <h2>Our Features</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <i className="fas fa-rocket"></i>
            <h3>Fast & Reliable</h3>
            <p>Lightning-fast performance you can count on</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-shield-alt"></i>
            <h3>Secure</h3>
            <p>Your data is always protected</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-magic"></i>
            <h3>Easy to Use</h3>
            <p>Intuitive interface for the best experience</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Join?</h2>
        <p>Start your journey with us today</p>
        <button className="cta-button">Sign Up Now</button>
      </section>
    </div>
  );
};

export default Home;
