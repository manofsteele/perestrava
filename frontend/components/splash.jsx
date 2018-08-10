import React from 'react';
import { Link } from 'react-router-dom';

const Splash = () => (
  <div className="splash">

    <h1>Welcome to Perestrava, the top site for cyclists and runners to track their routes and workouts.</h1>
    <img className="splash_photo" src={window.bike_under_banyans}/>
  </div>
);

export default Splash;
