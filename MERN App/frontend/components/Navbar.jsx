import { NavLink } from "react-router-dom";
import { useAuth } from "../src/store/auth";
import { HiBars3BottomRight } from "react-icons/hi2";
import { useState } from "react";

import "./Navbar.css";

const Navbar = () => {
  const { isLoggedIn, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen((prev) => !prev);
  };

  const closeNav = () => setIsOpen(false);

  const renderLinks = () => (
    <>
      <li>
        <NavLink
          to="/"
          onClick={closeNav}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          onClick={closeNav}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          About
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/services"
          onClick={closeNav}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Services
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact"
          onClick={closeNav}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Contact
        </NavLink>
      </li>

      {isLoggedIn ? (
        <li>
          <NavLink
            to="/logout"
            onClick={closeNav}
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
              onClick={closeNav}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Register
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              onClick={closeNav}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Login
            </NavLink>
          </li>
        </>
      )}

      {user?.isAdmin && (
        <li>
          <NavLink
            to="/admin/users"
            onClick={closeNav}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Admin
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="nav-container">
      <header className="navbar">
        <div className="logo">
          <NavLink to="/">Logo</NavLink>
        </div>

        <nav className="nav-links desktop-nav">
          <ul>{renderLinks()}</ul>
        </nav>

        <button className="mobile-toggle bars" onClick={toggleNav}>
          <HiBars3BottomRight />
        </button>

        {/* Mobile Menu */}
        <aside className={`mobile-menu ${isOpen ? "open" : ""}`}>
          <ul>{renderLinks()}</ul>
        </aside>
      </header>
    </div>
  );
};

export default Navbar;
