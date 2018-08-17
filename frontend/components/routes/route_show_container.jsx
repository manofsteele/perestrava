import { connect } from 'react-redux';
import { fetchRoute } from '../../actions/route_actions';
import RouteShow from './route_show';

const mapStateToProps = (state = {}, ownProps) => {
  return {
    currentUser: state.session.currentUser,
    route: state.entities.routes[ownProps.id]
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchRoute: route => dispatch(fetchRoute(route))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RouteShow);
