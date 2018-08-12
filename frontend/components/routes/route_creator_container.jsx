import { connect } from 'react-redux';
import { createRoute } from '../../actions/route_actions';
import RouteCreatorMap from './route_creator_map';

const mapStateToProps = (state = {}, ownProps) => {
  return {
    currentUser: state.session.currentUser,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createRoute: route => dispatch(createRoute(route))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RouteCreatorMap);
