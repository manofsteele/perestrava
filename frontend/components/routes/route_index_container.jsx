import { connect } from 'react-redux';
import { fetchRoutes } from '../../actions/route_actions';
import RouteIndex from './route_creator_map';

const mapStateToProps = (state = {}, ownProps) => {
  return {
    currentUser: state.session.currentUser,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchRoutes: routes => dispatch(fetchRoutes(routes))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RouteIndex);
