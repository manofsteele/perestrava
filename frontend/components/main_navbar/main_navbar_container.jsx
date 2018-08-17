import { connect } from 'react-redux';
import MainNavbar from './main_navbar';
import { logout } from '../../actions/session_actions.js';

const mapStateToProps = state => ({
  currentUser: state.entities.users[state.session.id],
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(MainNavbar);
