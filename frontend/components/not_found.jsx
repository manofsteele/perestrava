import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="not-found-container">
    <h1>Sorry, the page you were looking for was not found.</h1>
    <center><Link className="not_found" to="/">Click here to return to Home Page</Link></center>
  </div>
);

export default NotFound;
