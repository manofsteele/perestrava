import React from 'react';
import ReactDOM from 'react-dom';
import { Link, withRouter } from "react-router-dom";

const urlBase = "https://maps.googleapis.com/maps/api/staticmap?";
const key = `key=${window.google_maps_api_key}`;
const size = "size=300x200";
const greenDot = "https://bit.ly/2PfTgwD";
const checkeredFlag = "https://bit.ly/2MirCBF";

class RouteIndex extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      route_type: 'bike',
    };
    this.parseMarkers = this.parseMarkers.bind(this);
    this.formatTime = this.formatTime.bind(this);
    this.formatDistance = this.formatDistance.bind(this);
    this.formatElevation = this.formatElevation.bind(this);
    this.formatDate = this.formatDate.bind(this);
    this.handleWorkoutTypeToggle = this.handleWorkoutTypeToggle.bind(this);
  }

  componentDidMount() {
    this.props.fetchRoutes();
  }

  parseMarkers(markerString) {
    let markers = [];
    let vals = markerString.split(",");
    markers.push([vals[0], vals[1]].join(","));
    markers.push([vals[vals.length -2], vals[vals.length - 1]].join(","));
    return markers;
  }

  handleWorkoutTypeToggle(route_type) {
    this.setState({route_type: route_type});
    let rideButton = document.getElementById('ride-button');
    let runButton = document.getElementById('run-button');
    if (route_type === 'bike') {
      if (!rideButton.classList.contains("active")) {
        rideButton.classList.add("active");
        runButton.classList.remove("active");
      }
    }
    if (route_type === 'run') {
      if (!runButton.classList.contains("active")) {
        rideButton.classList.remove("active");
        runButton.classList.add("active");
      }
    }
  }

  formatDistance(route) {
    let feet = route.length * 3.2808399;
    let miles = feet / 5280;
    return (miles.toFixed(2) + " miles");
  }

  formatElevation(route) {
    let feet = route.elevationGain * 3.2808399;
    return (feet.toFixed(0) + " feet");
  }

  formatTime(route) {
    let minutes = (route.duration / 60).toFixed(0);
    let hours = Math.floor(minutes / 60);
    if (hours < 1) {
      if (minutes < 10) {
        return ("0:0" + minutes);
      } else {
      return ("0:" + minutes);
      }
    } else {
      minutes = (minutes % 60).toFixed(0);
      if (minutes < 10) {
        return (hours + ":0" + minutes);
      } else {
        return (hours + ":" + minutes);
      }
    }
  }

  // formatDate courtesy of an App Academy assessment

  formatDate(date) {
  const months = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December',
  };
  const daysOfWeek = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
  };
  const obj = new Date(date);
  const month = months[obj.getMonth()];
  const day = obj.getDate();
  const year = obj.getFullYear();
  const dayOfWeek = daysOfWeek[obj.getDay()];
  return `${month} ${day}, ${year}`;
}

  render() {
    let routes = this.props.routes.filter(route => route.routeType === this.state.route_type);

    return (
      <div className="index">
        <div className="index-header">
          <h1 className="index-headline">My Routes</h1>
          <a className="index-create-button" href="/#/routes/new">Create New Route</a>
        </div>
        <ul className="route-type-toggle">
          <li className="type-button active"
            onClick={() => this.handleWorkoutTypeToggle('bike')}
            id="ride-button">Cycling</li>
          <li className="type-button"
            onClick={() => this.handleWorkoutTypeToggle('run')}
            id="run-button">Running</li>
        </ul>
        <ul className="route-index-list">
          {routes.map(route => {
            let markers = this.parseMarkers(route.markerString);
            let startMarkerKey = `&markers=icon:${greenDot}|${markers[0]}`;
            let endMarkerKey = `&markers=icon:${checkeredFlag}|${markers[markers.length - 1]}`;
            let src = urlBase + size + "&path=weight:2|color:blue|enc:" + route.polyline + startMarkerKey + endMarkerKey + "&" + key;
            return (
              <Link to={`/routes/${route.id}`}>
              <li key={route.id} className="route-detail-tile">
                <div className="index-map" style={{backgroundImage: `url(${encodeURI(src)})`}}></div>
                <ul className="route-detail-stats">
                  <li className="route-detail-name">
                    <label >{route.name}</label>
                  </li>
                  <li className="route-detail-list">
                    <label className="route-detail-label">Distance</label>
                    <strong className="route-detail-data-big">{this.formatDistance(route)}</strong>
                  </li>
                  <li className="route-detail-list">
                    <label className="route-detail-label">Elevation Gain</label>
                    <strong className="route-detail-data-big">{this.formatElevation(route)}</strong>
                  </li>
                  <li className="route-detail-list">
                    <label className="route-detail-label">Est. Moving Time</label>
                    <strong className="route-detail-data-small">{this.formatTime(route)}</strong>
                  </li>
                  <li className="route-detail-list">
                    <label className="route-detail-label">Created on </label>
                    <strong className="route-detail-data-small">{this.formatDate(route.createdAt)}</strong>
                  </li>
                </ul>
              </li>
              </Link>
        );
      })}
        </ul>
        <div className="grey-bar"></div>
      </div>
    );
  }
}

export default RouteIndex;
