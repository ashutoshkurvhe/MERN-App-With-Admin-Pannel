import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import "./Register.css";
import { toast } from "react-toastify";

const URL = "http://localhost:5200/api/auth/register";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(user);
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      
      const res_data = await response.json();
      console.log("res from server", res_data.message);
      
      if (response.ok) {
        storeTokenInLS(res_data.token);
        //token ko localstorage me add krne k liye
        // localStorage.setItem("token", res_data);
        setUser({ username: "", email: "", phone: "", password: "" });
        toast("Registration Successsful")
        navigate("/login");
      } else {
        toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
      }
      // console.log(response);
    } catch (error) {
      console.log("register", error);
    }

    //same work diiferent way to write

    //    if (!response.ok) {
    //      const errorData = await response.json();
    //      console.error("Error:", errorData.message || "Something went wrong");
    //      return;
    //    }
    //   const res_data = await response.json();
    //    console.log(res_data)
    //    console.log("Registeration successful");
    //    setUser({ username: "", email: "", phone: "", password: "" });
    //    navigate("/login");

    // } catch (error) {
    //   console.log("register", error);
    // }
  };

  return (
    <section className="register">
      <div className="container">
        <div className="registration-form">
          <h1>Registration Form</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-field">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                autoComplete="off"
                value={user.username}
                onChange={handleInput}
              />
            </div>
            <div className="input-field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                autoComplete="off"
                value={user.email}
                onChange={handleInput}
              />
            </div>
            <div className="input-field">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Enter your phone"
                autoComplete="off"
                value={user.phone}
                onChange={handleInput}
              />
            </div>
            <div className="input-field">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                autoComplete="off"
                value={user.password}
                onChange={handleInput}
              />
            </div>
            <button type="submit">Register Now</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
