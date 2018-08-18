import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';

// Thank you BenchBnB for the below

const mapStyles = {
  hide: [
    {featureType: "poi",
    elementType: "labels",
    stylers: [{visibility: "off"}]
    }
  ]
};

const mapOptions = {
  center: {
    lat: 37.773942,
    lng: -122.431297
  },
  zoom: 13,
  clickableIcons: false,
  gestureHandling: 'greedy',
  styles: mapStyles['hide'],
  zoomControlOptions: {
    position: google.maps.ControlPosition.LEFT_TOP
  }
};

//Much of the below is from the Google Maps API, and slightly modified

class RouteCreatorMap extends React.Component {

  constructor(props) {
    super(props);
    this.placeMarkerAndPanTo = this.placeMarkerAndPanTo.bind(this);
    this.calculateAndDisplayRoute = this.calculateAndDisplayRoute.bind(this);
    this.clearMarkers = this.clearMarkers.bind(this);
    this.undo = this.undo.bind(this);
    this.redo = this.redo.bind(this);
    this.plotElevation = this.plotElevation.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleWorkoutTypeToggle = this.handleWorkoutTypeToggle.bind(this);
    this.toggleElevationPane = this.toggleElevationPane.bind(this);
    this.saveButtonOpenModal = this.saveButtonOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.formatRouteType = this.formatRouteType.bind(this);
    this.formatDistance = this.formatDistance.bind(this);
    this.formatElevation = this.formatElevation.bind(this);
    this.formatTime = this.formatTime.bind(this);

    this.errors = [];
    this.markers = [];
    this.removedMarkers = [];

    this.path = []; // this is for calculating elevations
    this.state = {
      name: "",
      description: "",
      length: 0,
      polyline: "",
      duration: 0,
      routeType: "bike",
      elevationGain: 0,
      searchInput: "",
      markerString: ""
    };

  }


  componentDidMount() {
    const map = this.refs.map;
    this.map = new google.maps.Map(map, mapOptions);

    this.map.addListener('click', (e) => {
      this.placeMarkerAndPanTo(e.latLng, map);
    });
    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer();
    this.elevator = new google.maps.ElevationService;
    this.directionsDisplay.setMap(this.map);
    this.geocoder = new google.maps.Geocoder();

  }

  renderErrors() {
    return(
      <ul>
        {this.props.errors.map((error, i) => (
          <li className="errors" key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }


  handleWorkoutTypeToggle(routeType) {
    this.setState({routeType: routeType}, () => this.calculateAndDisplayRoute(this.DirectionsService, this.directionsDisplay));
    let rideButton = document.getElementById('ride-button');
    let runButton = document.getElementById('run-button');
    if (routeType === 'bike') {
      if (!rideButton.classList.contains("active")) {
        rideButton.classList.add("active");
        runButton.classList.remove("active");
      }
    }
    if (routeType === 'run') {
      if (!runButton.classList.contains("active")) {
        rideButton.classList.remove("active");
        runButton.classList.add("active");
      }
    }
    // this.calculateAndDisplayRoute(this.DirectionsService, this.directionsDisplay);
  }

  toggleElevationPane(showState) {
    let elevationPane = document.getElementById('elevation-chart');
    let showElevation = document.getElementById('show-elevation');
    let hideElevation = document.getElementById('hide-elevation');
    if (showState === 'show') {
      showElevation.classList.add("hidden");
      elevationPane.classList.remove("hidden");
      hideElevation.classList.remove("hidden");
      this.calculateAndDisplayRoute(this.DirectionsService, this.directionsDisplay);
    }
    if (showState === 'hide') {
      showElevation.classList.remove("hidden");
      elevationPane.classList.add("hidden");
      hideElevation.classList.add("hidden");
    }
  }

  saveButtonOpenModal() {
    if (this.markers.length < 2) {
      return;
    }
    let modal = document.getElementById('formModal');
    modal.style.display = "block";
    window.onclick = (event) => {
      if (event.target === modal) {
          modal.style.display = "none";
          this.props.clearRouteErrors();
      }
    };
  }

  closeModal() {
    let modal = document.getElementById('formModal');
    modal.style.display = "none";
    console.log(this);
    this.props.clearRouteErrors();
  }

  handleSave(e) {
    e.preventDefault();
    let route = {
      name: this.state.name,
      description: this.state.description,
      length: this.state.length,
      polyline: this.state.polyline,
      elevation_gain: this.state.elevationGain,
      routeType: this.state.routeType,
      duration: this.state.duration,
      marker_string: this.state.markerString,
    };
    this.props.createRoute(route).then( () => this.props.history.push("/routes/index"));
  }

  handleSearch(e) {
    e.preventDefault();
    let address = this.state.searchInput;
    this.geocoder.geocode( {'address': address}, (results, status) => {
      if (status === 'OK') {
        this.map.setCenter(results[0].geometry.location);
        this.map.setZoom(13);
      }  else {
      alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  placeMarkerAndPanTo(latLng, map) {
    let marker = new google.maps.Marker({
      position: latLng,
      animation: google.maps.Animation.DROP,
      draggable: true
    });
    let markerPos = marker.getPosition().lat();

    this.map.panTo(latLng);
    marker.setMap(this.map);
    this.markers.push(marker);
    if (this.markers.length > 1) {
      this.calculateAndDisplayRoute(this.DirectionsService, this.directionsDisplay);
    }
}

// this function taken from
// https://developers.google.com/maps/documentation/javascript/directions#Waypoints
// modified heavily, 13 Aug. 2018

  calculateAndDisplayRoute(directionsService, directionsDisplay) {
    if (this.markers.length < 1) {
      return;
    }
    let saveButton = document.getElementById('saveButton');
    if (this.markers.length >= 2) {
      if (saveButton.classList.contains('disabled')) {
        saveButton.classList.remove('disabled');
      }
    } else {
      if (!saveButton.classList.contains('disabled') ) {
        saveButton.classList.add('disabled');
      }
    }

    let positions = [];
    let path = [];
    this.markers.forEach(marker => {
      let location = { location: { lat: marker.position.lat(), lng: marker.position.lng() } };
      positions.push(location);

      path.push({lat: marker.position.lat(), lng: marker.position.lng()});

      if (this.markers.length === 1) {
        path.push({lat: marker.position.lat(), lng: marker.position.lng()});
        directionsDisplay.setOptions({ preserveViewport: true });
      } else {
        directionsDisplay.setOptions({ preserveViewport: false});
      }

    });

    let origin = {lat: positions[0].location.lat, lng: positions[0].location.lng};
    let destination = {lat: positions[positions.length - 1].location.lat, lng: positions[positions.length -1].location.lng};

    this.state.markerString = [origin.lat, origin.lng, destination.lat, destination.lng].join(",");

    let mode;
    if (this.state.routeType === "bike") {
      mode = 'BICYCLING';
    }
    if (this.state.routeType === "run") {
      mode = 'WALKING';
    }
    this.directionsService.route({

      origin: {lat: positions[0].location.lat, lng: positions[0].location.lng},
      destination: {lat: positions[positions.length - 1].location.lat, lng: positions[positions.length -1].location.lng},
      waypoints: positions.slice(1, positions.length - 1),
      optimizeWaypoints: false,
      travelMode: mode,
    }, (response, status) => {
      directionsDisplay.setDirections(response);
      let route = response.routes[0];
      this.setState({
        length: 0,
        duration: 0,
        polyline: route.overview_polyline,
      });
      for (let i = 0; i < response.routes[0].legs.length; i++) {
        this.setState({
          length: this.state.length + parseFloat(response.routes[0].legs[i].distance.value),
          duration: this.state.duration + parseFloat(response.routes[0].legs[i].duration.value)
        });
      }
    });
    this.elevator.getElevationAlongPath({
      'path': path,
      'samples': 256
    }, this.plotElevation);
  }

  undo() {
    if (this.markers.length > 0) {
      let lastMarker = this.markers.pop();
      lastMarker.setMap(null);
      this.removedMarkers.push(lastMarker);
      this.directionsDisplay.set('directions', null);
      this.setState({
        length: 0,
        duration: 0
      });
      this.calculateAndDisplayRoute(this.directionsService, this.directionsDisplay);
    }

    if ( this.markers.length === 0 && this.removedMarkers.length > 0) {
      if (this.removedMarkers[this.removedMarkers.length - 1] === null) {
        this.removedMarkers.pop();
        let nextMarker = this.removedMarkers[this.removedMarkers.length - 1];
        while (nextMarker !== null && this.removedMarkers.length > 1) {
          nextMarker = this.removedMarkers[this.removedMarkers.length - 1];
          this.markers.push(nextMarker);
          this.removedMarkers.pop();
          nextMarker = this.removedMarkers[this.removedMarkers.length - 1];
          if (this.removedMarkers.length === 1 && nextMarker === null) {
            this.removedMarkers = [];
          }
        }
      }
      this.setState({
        length: 0,
        duration: 0
      });
      this.markers.forEach(marker => {
        marker.setMap(this.map);
      });
      this.calculateAndDisplayRoute(this.directionsService, this.directionsDisplay);
    }

  }

  redo() {
    if (this.removedMarkers.length > 0 && this.removedMarkers[this.removedMarkers.length - 1] !== null) {
      let nextMarker = this.removedMarkers.pop();
      nextMarker.setMap(this.map);
      this.markers.push(nextMarker);
      this.directionsDisplay.set('directions', null);
      this.calculateAndDisplayRoute(this.directionsService, this.directionsDisplay);
    }
  }

  clearMarkers() {
    if (this.markers.length > 0) {
      this.removedMarkers.push(null);
      this.markers.forEach(marker => {
        marker.setMap(null);
        this.removedMarkers.push(marker);
      });
      this.markers = [];
      this.removedMarkers.push(null);
      this.removedMarkers = this.removedMarkers.reverse();
      this.directionsDisplay.set('directions', null);
      this.setState({
        length: 0,
        duration: 0
      });
     }
  }

  formatRouteType() {
    return (this.state.routeType[0].toUpperCase() + this.state.routeType.slice(1));
  }

  formatDistance() {
    let feet = this.state.length * 3.2808399;
    let miles = feet / 5280;
    return (miles.toFixed(2) + " miles");
  }

  formatElevation() {
    let feet = this.state.elevationGain * 3.2808399;
    return (feet.toFixed(0) + " feet");
  }

  formatTime() {
    let minutes = (this.state.duration / 60).toFixed(0);
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
  // below is from Google Maps API page,
  // https://developers.google.com/maps/documentation/javascript/examples/elevation-paths

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
      this.setState({elevationGain: 0});
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
        vAxis: {maxValue: 100}
      });

    } else {
      for (let i = 0; i < elevations.length - 1; i++) {
        change = elevations[i + 1].elevation - elevations[i].elevation;
        if (change > 0) {
          gain += change;
        }
      }
      this.setState({elevationGain: gain});

      // Draw the chart using the data within its DIV.
      chart.draw(data, {
        height: 150,
        legend: 'none',
        titleY: 'Elevation (m)',
      });
    }

  }



  render() {
    return (
      <div className="map-container">
        <div className="map-tool-bar">
          <form onSubmit={this.handleSearch}>
          <input className="location-search"
            placeholder="Enter a location"
            type="text"
            value={this.state.searchInput}
            onChange={this.update('searchInput')}></input>
          <button className="search-button" title="Search"
            onClick={this.handleSearch}>
            <i className="fas fa-search"></i>
          </button>
        </form>
          <div className="button" title="Undo last marker"
            onClick={this.undo}><i className="fas fa-undo"></i>
            <div className="button-label">Undo</div>
          </div>
          <div className="button" title="Redo last marker"
            onClick={this.redo}><i className="fas fa-redo"></i>
            <div className="button-label">Redo</div>
          </div>
          <div className="button" title="Clear all markers"
            onClick={this.clearMarkers}><i className="fas fa-times"></i>
            <div className="button-label">Clear</div>
          </div>
          <div className="button active" title="Ride" id="ride-button"
            onClick={() => this.handleWorkoutTypeToggle('bike')}><i className="fas fa-bicycle"></i>
            <div className="button-label">Ride</div>
          </div>
          <div className="button" title="Run" id="run-button"
            onClick={() => this.handleWorkoutTypeToggle('run')}><i className="fas fa-walking"></i>
            <div className="button-label">Run</div>
          </div>
          <div className="float-right">
            <div className="button-save disabled" title="Save" id="saveButton"
              onClick={ () => this.saveButtonOpenModal()}>
              <div className="button-save-label">Save</div>
            </div>
          </div>
        </div>

        <div className="map" ref="map">
          Map

        </div>
        <div className="bottom-panel">
          <div className="route-stats-bar">
            <ul>
              <li>
                 <strong id="">{this.formatRouteType()}</strong>
                 <div className="button-label" >Route Type</div>
              </li>
              <li>
                 <strong id="">{this.formatDistance()}</strong>
                 <div className="button-label" >Distance</div>
              </li>
              <li>
                 <strong id="">{this.formatElevation()}</strong>
                 <div className="button-label" >Elevation Gain</div>
              </li>
              <li>
                 <strong id="">{this.formatTime()}</strong>
                 <div className="button-label" >Estimated Moving Time</div>
              </li>
              <li className="button-label" id="show-elevation"
                onClick={() => this.toggleElevationPane('show')}>
                 <strong id=""> </strong>
                 <div >Show Elevation</div>
              </li>
              <li className="button-label hidden" id="hide-elevation"
                onClick={() => this.toggleElevationPane('hide')}>
                 <strong id=""> </strong>
                 <div >Hide Elevation</div>
              </li>
            </ul>
          </div>
          <div className="elevation-chart hidden" id="elevation-chart">

          </div>
        </div>

        <div id="formModal" className="modal">
          <div className="modal-content">
            <header className="modal-header">
              <h1>Save</h1>
            </header>
            <form onSubmit={this.handleSave} className="modal-form" id="formModal">
              <p>Enter a name and description for your route below. On the next page,
              you'll be able to see and edit your route.</p>
            <div className="route-errors" >
              {this.renderErrors()}
            </div>
            <label>Route Name (required)</label>
            <input type="text"
              value={this.state.name}
              onClick={() => this.props.clearRouteErrors()}
              onChange={this.update('name')}
              className="save-input"
              />
            <br/>
            <label>Description</label>
            <textarea
              value={this.state.description}
              onClick={() => this.props.clearRouteErrors()}
              onChange={this.update('description')}
              className="save-input"
              />
            <div className="modal-buttons">
              <div className="cancel" onClick={() => this.closeModal()}>Cancel</div>
              <input type="submit" className="modal-submit modal-save" value="Save"/>
            </div>
          </form>
          </div>
        </div>
      </div>
    );
  }

}

export default withRouter(RouteCreatorMap);
