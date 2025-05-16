import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { useNavigate } from 'react-router-dom'; // Add this import
import { toast } from "react-toastify";

import "./Contact.css";

const URL = "http://localhost:5200/api/form/contact";

const defaultContactFormData = {
  username: "",
  email: "",
  message:"",
}


const Contact = () => {
  const [contact, setContact] = useState(defaultContactFormData);
  const [userData, setUserData] = useState(true)
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    
    if (userData && user) {
      setContact({
        username: user.username,
        email: user.email,
        message: "",
      });
      
      setUserData(false);
    }
  }, [user, userData]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setContact({
      ...contact,
      [name]: value,
    });
    // value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(contact);
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          'Content-Type': "application/json",
        },
        body: JSON.stringify(contact),
      });

      const data = await response.json();

      if (response.ok) {
        setContact(defaultContactFormData);
        toast.success("Message sent successfully");
        navigate("/");
        console.log(data);
      } else {
        // Handle error response
        toast.error(data.message || "Something went wrong!");
      }

    } catch (error) {
      console.log("Message not send");
            alert(data.message || "Something went wrong!");

    }
  };

  return (
    <div className="container">
      <div className="contact-form">
        <h1 className="form-title">Contact Us</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <div>
              <label className="form-label" htmlFor="username">
                Username
              </label>
              <input
                className="form-input"
                type="text"
                name="username"
                id="username"
                value={contact.username}
                onChange={handleChange}
                placeholder="Enter your Username"
                required
                readOnly
              />
            </div>
            <div>
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                className="form-input"
                type="email"
                name="email"
                id="email"
                value={contact.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                readOnly
              />
            </div>
            <div>
              <label className="form-label" htmlFor="message">
                Message
              </label>
              <textarea
                className="form-textarea"
                name="message"
                id="message"
                autoComplete="off"
                value={contact.message}
                onChange={handleChange}
                cols="30"
                rows="5"
                required
              />
            </div>
          </div>
          <button className="submit-button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
