import { connect } from 'react-redux';
import { fetchRoute, deleteRoute } from '../../actions/route_actions';
import RouteShow from './route_show';

const mapStateToProps = (state = {}, ownProps) => {

  return {
    // currentUser: state.session.currentUser,
    currentUser: state.entities.users[state.session.id],
    route: state.entities.routes[ownProps.match.params.id]
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchRoute: id => dispatch(fetchRoute(id)),
    deleteRoute: routeId => (dispatch(deleteRoute(routeId)))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RouteShow);
