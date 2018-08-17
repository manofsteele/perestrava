import React from 'react';

const MainNavbar = (props) => {
  console.log(props);
  return (
  <div className="main-navbar">
    <div className="dropdown-left">
    <a href="#/" className="logo">Perestrava</a>
    <div className="dropdown-left-dashboard">
      <span className="dashboard-top">Dashboard <i className="fas fa-angle-down"></i></span>
        <div className="dropdown-content-left" id="left-dropdown">
          <li>
            <a href="#/routes/index">My Routes</a>
          </li>
        </div>
      </div>
    </div>
    <div className="dropdown-container">
      <div className="dropdown-right"><i className="fas fa-plus-circle"></i>
        <div className="dropdown-content-right" id="right-dropdown">
          <li>
            <a href="#/routes/new">Create a new route</a>
          </li>
        </div>
      </div>
      <button className="main-nav-logout" onClick={ props.logout }>Log Out</button>
    </div>
  </div>
);
};

export default MainNavbar;
