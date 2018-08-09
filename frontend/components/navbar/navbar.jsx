import React from 'react';
import { Link } from 'react-router-dom';


  const Navbar = ({ currentUser, logout }) => {
    const sessionLinks = () => (
      <nav className="login-signup">
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </nav>
    );

    const greeting = () => (
      <hgroup className="header-group">
        <h2 className="header-name">Welcome, {currentUser.username}</h2>
        <button className="header-button" onClick={logout}>Log Out</button>
      </hgroup>
    );

    return currentUser ? greeting() : sessionLinks();
  };


  export default Navbar;
