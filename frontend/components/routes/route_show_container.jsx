import { connect } from 'react-redux';
import { fetchRoute } from '../../actions/route_actions';
import RouteShow from './route_show';

const mapStateToProps = (state = {}, ownProps) => {

  return {
    currentUser: state.session.currentUser,
    route: state.entities.routes[ownProps.match.params.id]
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchRoute: id => dispatch(fetchRoute(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RouteShow);
