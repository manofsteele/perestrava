import React from 'react';
import ReactDOM from 'react-dom';
import { Link, withRouter } from 'react-router-dom';

// let route;
class RouteShow extends React.Component {
  

  constructor(props) {
    super(props);
}

  componentDidMount() {
      console.log(this.props.match.params.id);
    this.props.fetchRoute(this.props.match.params.id);
  }

  render() {
    let route = this.props.route || { id: "loading", name: "loading", description: "loading", length: 0, polyline: ""};
    console.log(route);
    if (route) {
        return (
            <div className="show">
                <div className="show-header">
                    <h1 className="index-headline">My Routes / <b>{route.name}</b></h1>
                </div>
            </div>
        );
    } else { 
        return (
            <div className="show">Loading!</div>
        );
    }
  }
}

export default RouteShow; 
