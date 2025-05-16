import React from "react";
import "./Services.css";
import { useAuth } from "../store/auth";

const Services = () => {
  const { services } = useAuth();
  // console.log(services)

  return (
    <div className="services-container">
      <h1 className="services-title">Our Services</h1>
      <div className="services-grid">
        {services.map((service, index) => {
          const { name, description, technologies } = service;

          return (
            <div className="service-card" key={index}>
              <h1 className="service-title">{name}</h1>
              <p className="service-description">{description}</p>
              <div className="service-techs">
                {technologies.map((tech, index) => (
                  <span className="service-tech" key={index}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Services;
