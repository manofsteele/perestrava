import React from 'react';
import ReactDOM from 'react-dom';
import { Link, withRouter } from 'react-router-dom';
import { LOGOUT_CURRENT_USER } from '../../actions/session_actions';

const urlBase = "https://maps.googleapis.com/maps/api/staticmap?";
const key = `key=${window.google_maps_api_key}`;
const size = "size=600x400";
const greenDot = "https://bit.ly/2PfTgwD";
const checkeredFlag = "https://bit.ly/2MirCBF";


class RouteShow extends React.Component {
  

  constructor(props) {
    super(props);
    this.parseMarkers = this.parseMarkers.bind(this);
    this.formatTime = this.formatTime.bind(this);
    this.formatDistance = this.formatDistance.bind(this);
    this.formatElevation = this.formatElevation.bind(this);
    this.formatDate = this.formatDate.bind(this);
    this.plotElevation = this.plotElevation.bind(this);
    this.markers = [];

  }
  
  parseMarkers(markerString) {
    let markers = [];
    let vals = markerString.split(",");
    markers.push([vals[0], vals[1]].join(","));
    markers.push([vals[vals.length - 2], vals[vals.length - 1]].join(","));
    return markers;
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

    plotElevation(elevations, status) {
        var chartDiv = document.getElementById('elevation-chart');
        if (status !== 'OK') {
            // Show the error code inside the chartDiv.
            chartDiv.innerHTML = 'Cannot show elevation: request failed because ' +
                status;
            return;
        }
        // Create a new chart in the elevation_chart DIV.
        let chart = new google.visualization.ColumnChart(chartDiv);

        // Extract the data from which to populate the chart.
        // Because the samples are equidistant, the 'Sample'
        // column here does double duty as length along the
        // X axis.
        let data = new google.visualization.DataTable();
        data.addColumn('string', 'Sample');
        data.addColumn('number', 'Elevation');
        for (let i = 0; i < elevations.length; i++) {
            data.addRow(['', elevations[i].elevation]);
        }

        let gain = 0;
        let change = 0;
        if (this.markers.length <= 1) {
            this.setState({ elevationGain: 0 });
            data = new google.visualization.DataTable();
            data.addColumn('string', 'Sample');
            data.addColumn('number', 'Elevation');
            for (let i = 0; i < elevations.length; i++) {
                data.addRow(['', 0]);
            }
            chart.draw(data, {
                height: 120,
                legend: 'none',
                titleY: 'Elevation (m)',
                vAxis: { maxValue: 100 }
            });

        } else {
            for (let i = 0; i < elevations.length - 1; i++) {
                change = elevations[i + 1].elevation - elevations[i].elevation;
                if (change > 0) {
                    gain += change;
                }
            }
            this.setState({ elevationGain: gain });

            // Draw the chart using the data within its DIV.
            chart.draw(data, {
                height: 200,
                legend: 'none',
                titleY: 'Elevation (m)',
            });
        }
    }

  componentDidMount() {
    this.props.fetchRoute(this.props.match.params.id);
    this.elevator = new google.maps.ElevationService;

  }

  render() {
    let route = this.props.route; 
    // || { id: "loading", name: "loading", description: "loading", length: 0, polyline: ""};
    console.log(route);
      console.log(this.props);

    if (route !== undefined) {
        this.markers = this.parseMarkers(route.markerString);
        console.log(this.markers);
        let startMarkerKey = `&markers=icon:${greenDot}|${this.markers[0]}`;
        let endMarkerKey = `&markers=icon:${checkeredFlag}|${this.markers[this.markers.length - 1]}`;
        let src = urlBase + size + "&path=weight:2|color:blue|enc:" + route.polyline + startMarkerKey + endMarkerKey + "&" + key;
        let workoutType = route.routeType === "bike" ? "Cycling" : "Running";
        return (

            <div className="show">
                <div className="show-header">
                    <h2 className="show-headline">My Routes / <b>{route.name}</b></h2>
                    <h1 className="show-title">{route.name}</h1>
                </div>
                <div className="show-map-and-stats" >
                    <div className="show-map" style={{ backgroundImage: `url(${encodeURI(src)})` }}>
                    </div>
                    <div className="show-stats"> 
                      <div className="show-author">
                      <label className="show-author-name">By {this.props.currentUser.username}</label>
                      </div>
                      <div className="show-date">
                        <label className="show-date-created">Created on {this.formatDate(route.createdAt)}</label> 
                      </div>
                      <div className="show-stats-line1">
                      <ul className="show-stats-list">
                        <li>
                        <label className="show-stats-stat-item">{this.formatDistance(route)}</label><br/>
                        <label className="show-stats-stat-name">Distance</label>
                        </li>
                        <li>
                        <label className="show-stats-stat-item">{this.formatElevation(route)}</label><br/>
                        <label className="show-stats-stat-name">Elevation Gain</label>
                        </li>
                        <li>
                        <label className="show-stats-stat-item">{workoutType}</label><br/>
                        <label className="show-stats-stat-name">Route Type</label>
                        </li>
                      </ul>
                      </div>

                      <div className="show-stats-time">
                        <label className="show-stats-stat-name">Est. Moving Time</label>
                        <label className="show-stats-stat-item">{this.formatTime(route)}</label>
                      </div>
                    </div>
                </div>    
                <div className="show-elevation">
                    <div className="elevation-chart" id="elevation-chart">

                    </div>
                </div>            
            </div>
        );
    } else { 
        return (
            <div className="show"></div>
        );
    }
  }
}

export default RouteShow; 
