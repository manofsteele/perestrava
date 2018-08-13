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
    this.undoMarker = this.undoMarker.bind(this);
    this.markers = [];
    this.locations = [];
    this.lastMarker = null;
    this.state = {
      distance: 0,
      duration: 0,
    };

  }


  componentDidMount() {
    const map = this.refs.map;
    this.map = new google.maps.Map(map, mapOptions);

    this.map.addListener('click', (e) => {
      this.placeMarkerAndPanTo(e.latLng, map);
    });
    this.labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    this.labelIndex = 0;
    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer();
    this.directionsDisplay.setMap(this.map);
  }

  placeMarkerAndPanTo(latLng, map) {
    let marker = new google.maps.Marker({
      position: latLng,
      animation: google.maps.Animation.DROP,
      label: this.labels[this.labelIndex++ % this.labels.length],
    });
    let markerPos = marker.getPosition().lat();

    this.map.panTo(latLng);
    this.locations.push(latLng);
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

    let positions = [];
    this.locations.forEach(location => {
      positions.push({location: {lat: location.lat(), lng: location.lng()}});
    });
    this.directionsService.route({

      origin: {lat: positions[0].location.lat, lng: positions[0].location.lng},
      destination: {lat: positions[positions.length - 1].location.lat, lng: positions[positions.length -1].location.lng},
      waypoints: positions.slice(1, positions.length - 1),
      optimizeWaypoints: true,
      travelMode: 'BICYCLING',
    }, (response, status) => {
      directionsDisplay.setDirections(response);
      let route = response.routes[0];
      for (let i = 0; i < response.routes[0].legs.length; i++) {
        this.setState({
          distance: this.state.distance + parseFloat(response.routes[0].legs[i].distance.value),
          duration: this.state.duration + parseFloat(response.routes[0].legs[i].duration.value)
        });
        console.log(response.routes[0].legs[i].duration.value);
      }

      // this summary panel came from google, not using it so far...

      //     var summaryPanel = document.getElementById('directions-panel');
      //     summaryPanel.innerHTML = '';
      //     // For each route, display summary information.
      //     for (var i = 0; i < route.legs.length; i++) {
      //       var routeSegment = i + 1;
      //     summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
      //         '</b><br>';
      //     summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
      //     summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
      //     summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
      // }
    });
  }

  clearMarkers() {
    this.markers.forEach(marker => {
      marker.setMap(null);
    });
    this.markers = [];
    this.locations = [];
    this.directionsDisplay.set('directions', null);
  }

  undoMarker() {
    this.lastMarker = this.markers.pop();
    this.lastMarker.setMap(null);
    this.locations.pop();
    this.calculateAndDisplayRoute(this.directionsService, this.directionsDisplay);
  }

  render() {
    return (
      <div className="map-container">
        <div className="map-tool-bar">
          <input className="location-search"
            placeholder="Enter a location"
            type="text" ></input>
          <div className= "search-button" title="Search">
            <div className="search-icon"></div>
          </div>
          <div className="button" title="Undo last marker"
            onClick={this.undoMarker}>
            <div className="button-label">Undo</div>
          </div>
          <div className="button" title="Redo last marker">
            <div className="button-label">Redo</div>
          </div>
          <div className="button" title="Clear all markers"
            onClick={this.clearMarkers}>
            <div className="button-label">Clear</div>
          </div>
          <div className="button" title="Ride">
            <div className="button-label">Ride</div>
          </div>
          <div className="button" title="Run">
            <div className="button-label">Run</div>
          </div>
          <div className="float-right">
            <div className="button-save" title="Save">
              <div className="button-save-label">Save</div>
            </div>
          </div>
        </div>

        <div className="map" ref="map">
          Map

        </div>
        <div className="route-stats-bar">
          <ul>
            <li>
               <strong id=""></strong>
               <div className="button-label" >Route Type</div>
            </li>
            <li>
               <strong id="">{this.state.distance}</strong>
               <div className="button-label" >Distance</div>
            </li>
            <li>
               <strong id=""></strong>
               <div className="button-label" >Elevation Gain</div>
            </li>
            <li>
               <strong id="">{this.state.duration / 60}</strong>
               <div className="button-label" >Estimated Moving Time</div>
            </li>
            <li>
               <strong id=""></strong>
               <div className="button-label" ></div>
            </li>
          </ul>
        </div>
      </div>
    );
  }

}

export default withRouter(RouteCreatorMap);
