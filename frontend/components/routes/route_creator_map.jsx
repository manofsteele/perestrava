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


  }


  componentDidMount() {
    const map = this.refs.map;
    this.map = new google.maps.Map(map, mapOptions);

    this.map.addListener('click', (e) => {
      this.placeMarkerAndPanTo(e.latLng, map);
    });
    this.labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    this.labelIndex = 0;
  }

  placeMarkerAndPanTo(latLng, map) {
    let marker = new google.maps.Marker({
      position: latLng,
      animation: google.maps.Animation.DROP,
      label: this.labels[this.labelIndex++ % this.labels.length],
    });
    this.map.panTo(latLng);
    marker.setMap(this.map);
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
          <div className="button" title="Undo last marker">
            <div className="button-label">Undo</div>
          </div>
          <div className="button" title="Redo last marker">
            <div className="button-label">Redo</div>
          </div>
          <div className="button" title="Clear all markers">
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

          </ul>
        </div>
      </div>
    );
  }

}

export default withRouter(RouteCreatorMap);
