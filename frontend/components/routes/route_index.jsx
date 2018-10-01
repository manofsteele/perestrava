import React from 'react';
import ReactDOM from 'react-dom';
import { Link, withRouter } from "react-router-dom";
import { formatDate, formatDistance, formatElevation, formatTime } from '../../util/format_util';

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
    this.handleDelete = this.handleDelete.bind(this);
    this.parseMarkers = this.parseMarkers.bind(this);
    this.handleWorkoutTypeToggle = this.handleWorkoutTypeToggle.bind(this);
  }

  componentDidMount() {
    this.props.fetchRoutes();
  }

  handleDelete(routeId) {
    this.props.deleteRoute(routeId);
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
            return <div className="route-detail" key={route.id}>
                <Link to={`/routes/${route.id}`}>
                  <li className="route-detail-tile">
                    <div className="index-map" style={{ backgroundImage: `url(${encodeURI(src)})` }} />
                    <ul className="route-detail-stats">
                      <li className="route-detail-name">
                        <label>{route.name}</label>
                      </li>
                      <li className="route-detail-list">
                        <label className="route-detail-label">
                          Distance
                        </label>
                        <strong className="route-detail-data-big">
                          {formatDistance(route)}
                        </strong>
                      </li>
                      <li className="route-detail-list">
                        <label className="route-detail-label">
                          Elevation Gain
                        </label>
                        <strong className="route-detail-data-big">
                          {formatElevation(route)}
                        </strong>
                      </li>
                      <li className="route-detail-list">
                        <label className="route-detail-label">
                          Est. Moving Time
                        </label>
                        <strong className="route-detail-data-small">
                          {formatTime(route)}
                        </strong>
                      </li>
                      <li className="route-detail-list">
                        <label className="route-detail-label">
                          Created on{" "}
                        </label>
                        <strong className="route-detail-data-small">
                          {formatDate(route.createdAt)}
                        </strong>
                      </li>
                    </ul>
                  </li>
                </Link>
                {/* <strong className="delete-button"> */}
                  <button className="delete-button" onClick={() => this.handleDelete(route.id)}>
                    Delete Route
                  </button>
                {/* </strong> */}
              </div>;
      })}
        </ul>
        <div className="grey-bar"></div>
      </div>
    );
  }
}

export default RouteIndex;
