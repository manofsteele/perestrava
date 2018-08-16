import { connect } from 'react-redux';
import { fetchRoutes } from '../../actions/route_actions';
import RouteIndex from './route_index';

const mapStateToProps = (state = {}, ownProps) => {
  return {
    currentUser: state.session.currentUser,
    routes: Object.values(state.entities.routes)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchRoutes: routes => dispatch(fetchRoutes(routes))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RouteIndex);
