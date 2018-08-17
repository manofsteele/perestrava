import { connect } from 'react-redux';
import { createRoute, clearRouteErrors} from '../../actions/route_actions';
import RouteCreatorMap from './route_creator_map';

const mapStateToProps = (state = {}, ownProps) => {
  return {
    currentUser: state.session.currentUser,
    errors: state.errors.route
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createRoute: route => dispatch(createRoute(route)),
    clearRouteErrors: () => dispatch(clearRouteErrors())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RouteCreatorMap);
