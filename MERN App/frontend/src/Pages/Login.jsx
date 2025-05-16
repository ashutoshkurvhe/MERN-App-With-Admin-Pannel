import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import styled from "styled-components";
import { toast } from "react-toastify";


const URL = "http://localhost:5200/api/auth/login";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();

  const handleinput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //   console.log(user);
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user),
      });
      console.log(response);
      
      const res_data = await response.json();
      console.log("res from server", res_data.message);

      if (response.ok) {
        toast("Login Successful");
        storeTokenInLS(res_data.token)
        setUser({ email: "", password: "" });
        navigate("/");
      }
      else {
        toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
        setUser({ email: "", password: "" });
        console.log("Invalid credential");
      }


    } catch (error) {
      console.error("network error", error);
    }
  };
  return (
    <Wrapper>
      <div className="container">
        <div className="login-form">
          <h1>Login Form</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-feild">
              <label htmlFor="email">Email</label>
              <input
                type="Email"
                id="email"
                onChange={handleinput}
                name="email"
                value={user.email}
                required
                autoComplete="off"
                placeholder="Enter your email"
                />
            </div>
            <div className="input-feild">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                onChange={handleinput}
                name="password"
                value={user.password}
                required
                autoComplete="off"
                placeholder="Enter your password"
              />
            </div>
            <button type="submit">Login Now</button>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .login-form {
    background: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
  }

  h1 {
    text-align: center;
    color: #333;
    margin-bottom: 2rem;
  }

  .input-field {
    margin-bottom: 1.5rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    color: #666;
  }

  input {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;

    &:focus {
      outline: none;
      border-color: #4caf50;
    }
  }

  button {
    width: 100%;
    padding: 1rem;
    margin-top: 20px;
    background: black;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1.1rem;
    cursor: pointer;
    transition: background 0.3s ease;

    &:hover {
      background: rgb(224, 222, 222);
      color: black;
    }
  }
`;

export default Login;
