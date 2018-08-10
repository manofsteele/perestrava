import React from 'react';
import { Link } from 'react-router-dom';


  const Navbar = ({ currentUser, logout }) => {

    const sessionLinks = () => (
      <div className="navbar">
      <a href="#/login" className="logo">Perestrava</a>
      <nav className="login-signup">
        <Link className="navlink" to="/login">Log In</Link>
        <Link className="navlink" to="/signup">Sign Up</Link>
      </nav>
      </div>
    );

    const greeting = () => (
      <hgroup className="header-group">
        <h1>Perestrava</h1>
        <p className="header-name">Welcome, {currentUser.username}</p>
        <button className="header-button" onClick={logout}>Log Out</button>
      </hgroup>
    );

    return currentUser ? greeting() : sessionLinks();
  };


  export default Navbar;
