import React from 'react';
import ReactDOM from 'react-dom';
import { Link, withRouter } from 'react-router-dom';
import { LOGOUT_CURRENT_USER } from '../../actions/session_actions';
import { formatDate, formatDistance, formatElevation, formatTime } from "../../util/format_util";


const urlBase = "https://maps.googleapis.com/maps/api/staticmap?";
const key = `key=${window.google_maps_api_key}`;
const size = "size=600x400";
const greenDot = "https://bit.ly/2PfTgwD";
const checkeredFlag = "https://bit.ly/2MirCBF";


class RouteShow extends React.Component {
  

    constructor(props) {
        super(props);
        this.parseMarkers = this.parseMarkers.bind(this);
        this.getAllMarkers = this.getAllMarkers.bind(this);
        this.plotElevation = this.plotElevation.bind(this);
        // this.markers = [];  // this is for first and last markers on map
        this.allMarkers = [];  // this is for elevation calculation
        this.elevator = new google.maps.ElevationService;

    }
  
    handleDelete(routeId) {
        this.props.deleteRoute(routeId).then( () => this.props.history.push("/routes/index"));
    }

    parseMarkers(markerString) {
        let markers = [];
        let vals = markerString.split(",");
        markers.push([vals[0], vals[1]].join(","));
        markers.push([vals[vals.length - 2], vals[vals.length - 1]].join(","));
        return markers;
    }

    getAllMarkers(markerString) {
        let allMarkers = [];
        let vals = markerString.split(",");
        for (let i = 0; i < vals.length; i += 2) {
            allMarkers.push({ lat: parseFloat(vals[i]), lng: parseFloat(vals[i + 1]) });
        }
        this.allMarkers = allMarkers;
    }

    plotElevation(elevations, status) {
        console.log(this.allMarkers);
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
        if (this.allMarkers.length <= 1) {
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
  }

  render() {
    let route = this.props.route; 
    // || { id: "loading", name: "loading", description: "loading", length: 0, polyline: ""};

    if (route !== undefined) {
        let markers = this.parseMarkers(route.markerString);
        this.getAllMarkers(route.markerString);
        let startMarkerKey = `&markers=icon:${greenDot}|${markers[0]}`;
        let endMarkerKey = `&markers=icon:${checkeredFlag}|${markers[markers.length - 1]}`;
        let src = urlBase + size + "&path=weight:2|color:blue|enc:" + route.polyline + startMarkerKey + endMarkerKey + "&" + key;
        let workoutType = route.routeType === "bike" ? "Cycling" : "Running";
        console.log(this.allMarkers);
        this.elevator.getElevationAlongPath({
            'path': this.allMarkers,
            'samples': 256
        }, this.plotElevation);
        return (

            <div className="show">
                <div className="show-header">
                    <h2 className="show-headline"><Link to={`/routes/index/`}>My Routes </Link>/ <b>{route.name}</b></h2>
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
                        <label className="show-date-created">Created on {formatDate(route.createdAt)}</label> 
                      </div>
                      <div className="show-stats-line1">
                      <ul className="show-stats-list">
                        <li>
                        <label className="show-stats-stat-item">{formatDistance(route.length)}</label><br/>
                        <label className="show-stats-stat-name">Distance</label>
                        </li>
                        <li>
                        <label className="show-stats-stat-item">{formatElevation(route.elevationGain)}</label><br/>
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
                        <label className="show-stats-stat-item">{formatTime(route.duration)}</label>
                      </div>
                    </div>
                </div>    
                <div className="show-elevation">
                    <div className="show-elevation-chart" id="elevation-chart">

                    </div>
                </div>
                <div className="delete-button-div">    
                <button className="show-delete-button" onClick={() => this.handleDelete(route.id)}>
                    Delete Route
                </button>
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
