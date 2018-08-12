import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';

// Thank you BenchBnB for the below

const mapOptions = {
  center: {
    lat: 37.773942,
    lng: -122.431297
  },
  zoom: 13
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
      <div className="map" ref="map">
        Map
      </div>
    );
  }

}

export default withRouter(RouteCreatorMap);
