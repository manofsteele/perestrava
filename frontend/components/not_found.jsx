import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="not-found-container">
    <h1>Sorry, the page you were looking for was not found.</h1>
    <center><Link className="not_found" to="/">Return to Home Page</Link></center>
    <img className="not-found" src={window.not_found}/>
  </div>
);

export default NotFound;
