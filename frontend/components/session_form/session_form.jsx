import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
    };
    this.errors = [];
    this.handleSubmit = this.handleSubmit.bind(this);
    this.demoLogin = this.demoLogin.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  demoLogin() {
    this.props.demoLogin({
      username: "Guest",
      email: "guest@guest.com",
      password: "guestguest"});
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.clearErrors();
    this.props.history.push(this.props.otherRoute);
  }
  
  renderErrors() {
    return(
      <ul>
        {this.props.errors.map((error, i) => (
          <li className="errors" key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  render() {


    return (
      <div className="login-form-container">

        <div className="splash-text">
          <h1 className="first-head">Run. Ride. Repeat.</h1>
          <h1 className="second-head">Map. Measure. Marvel.</h1>
          <h2> <a href="#/login" className="logo">Perestrava.</a> </h2>
          <h2> Precision and Performance. </h2>
          <h3>An app for athletes of all levels to track their rides and runs.</h3>
        </div>

        <div className="login-panel">
        <form onSubmit={this.handleSubmit} className="login-form-box">
          Welcome to Perestrava!
          <br/>
          Please {this.props.formType} or
          <a
            onClick={this.handleClick}
            className="login-link" > {this.props.otherFormType}</a>
          <div className="login-errors" >
          {this.renderErrors()}
          </div>
          <div className="login-form">
            <br/>
            <label>Username:
            <br/>
              <input type="text"
                value={this.state.username}
                onChange={this.update('username')}
                className="login-input"
              />
            </label>
            <br/>
            <label>Email address:
            <br/>
              <input type="email"
                value={this.state.email}
                onChange={this.update('email')}
                className="login-input"
              />
            </label>
            <br/>
            <label>Password:
            <br/>
              <input type="password"
                value={this.state.password}
                onChange={this.update('password')}
                className="login-input"
              />
            </label>
            <br/>
            <input className="session-submit" type="submit" value={this.props.formType} />
          </div>
          </form>
          <button className="demo-submit" type="submit" onClick={this.demoLogin}>Login as Guest</button>
        </div>
        </div>
      );
    }
  }

export default withRouter(SessionForm);
