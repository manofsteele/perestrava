import React from 'react';
import { Link } from 'react-router-dom';


  const Navbar = ({ currentUser, logout }) => {

    const sessionLinks = () => (
      <div className="navbar">
      <a href="#/" className="logo">Perestrava</a>
      <nav className="login-signup">
        <Link className="navlink" to="/login">Log In</Link>
        <Link className="navlink" to="/signup">Sign Up</Link>
      </nav>
      </div>
    );

    const greeting = () => (
      <hgroup className="header-group">
        <a href="#/" className="logo">Perestrava</a>
        <p className="header-name">Welcome, {currentUser.username}</p>
        <button className="navlink" onClick={logout}>Log Out</button>
      </hgroup>
    );

    return currentUser ? greeting() : sessionLinks();
  };


  export default Navbar;
