import { NavLink } from "react-router-dom";
import { useAuth } from "../src/store/auth";
// import { HiBars3BottomRight } from "react-icons/hi2";

import "./Navbar.css";
import { useState } from "react";

const Navbar = () => {
  const { isLoggedIn } = useAuth();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  // const showNav = () => {
  //   setIsOpen(isOpen);
  // }

  return (
    <div className="nav-container">
      <header>
        <div className="logo">
          <NavLink to="/">Logo</NavLink>
        </div>
        <nav>
          <ul>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/services"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Services
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Contact
              </NavLink>
            </li>
            {isLoggedIn ? (
              <li>
                <NavLink
                  to="/logout"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Logout
                </NavLink>
              </li>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/register"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Register
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/login"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Login
                  </NavLink>
                </li>
              </>
            )}
            {user.isAdmin ? (
              <li>
                <NavLink
                  to="/admin/users"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Admin
                </NavLink>
              </li>
            ) : null}
          </ul>
        </nav>

        {/* <button className="bars" onClick={showNav}><HiBars3BottomRight />
        </button>
        <aside>
          <ul>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/services"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Services
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Contact
              </NavLink>
            </li>
            {isLoggedIn ? (
              <li>
                <NavLink
                  to="/logout"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Logout
                </NavLink>
              </li>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/register"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Register
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/login"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Login
                  </NavLink>
                </li>
              </>
            )}
            {user.isAdmin ? (
              <li>
                <NavLink
                  to="/admin/users"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Admin
                </NavLink>
              </li>
            ) : null}
          </ul>
        </aside> */}
      </header>
    </div>
  );
};

export default Navbar;
