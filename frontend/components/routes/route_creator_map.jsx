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

class RouteCreatorMap extends React.Component {

  componentDidMount() {
    const map = this.refs.map;
    this.map = new google.maps.Map(map, mapOptions);
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
