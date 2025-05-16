import React from "react";
import "./Error.css";

const Error = () => {
  return (
    <div className="error-container">
      <div className="error-content">
        <h1>
          4<span>0</span>4
        </h1>
        <h2>Oops! Page Not Found</h2>
        <p>
          The page you are looking for might have been removed or is temporarily
          unavailable.
        </p>
        <img
          src="https://media.giphy.com/media/A9EcBzd6t8DZe/giphy.gif"
          alt="404 animation"
          className="error-gif"
        />
        <button onClick={() => window.history.back()}>Go Back</button>
      </div>
    </div>
  );
};

export default Error;
