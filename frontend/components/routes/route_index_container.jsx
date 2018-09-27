import { connect } from 'react-redux';
import { fetchRoutes, deleteRoute } from '../../actions/route_actions';
import RouteIndex from './route_index';

const mapStateToProps = (state = {}, ownProps) => {
  return {
    currentUser: state.session.currentUser,
    routes: Object.values(state.entities.routes)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchRoutes: routes => dispatch(fetchRoutes(routes)),
    deleteRoute: routeId => (dispatch(deleteRoute(routeId)))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RouteIndex);
