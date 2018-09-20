import React from 'react';
import ReactDOM from 'react-dom';
import { Link, withRouter } from 'react-router-dom';

// let route;
class RouteShow extends React.Component {
  

  constructor(props) {
    super(props);
    
}

componentDidMount() {
    this.props.fetchRoute(this.props.match.params.id);
  }

  render() {
    let route = this.props.route;
    console.log(route);
    return (
    <div className="show-page">This is the page</div>
    );
  }
}

export default RouteShow; 
