import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Helmet from 'react-helmet';
import { push } from 'react-router-redux';
import config from 'config';
import { asyncConnect } from 'redux-connect';

import { isLoaded as isAuthLoaded, isTokenChecked } from 'redux/modules/auth';
import { load as loadAuth, logoutRemoveUser as logout, checkToken } from '../../actions/Auth/actions';

import { Footer } from 'components';

import '../../helpers/app.css';
import '../../helpers/css/salon.css';

import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import 'react-select/dist/react-select.css';


@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    const promises = [];
    // if (!isAuthLoaded(getState())) {
    //   console.log("-=-=-=-=-=-=-=-=-=-=- SENDING REQUEST FROM APP =-=-=-=-=-=-=-=-=-=-");
    //   promises.push(dispatch(loadAuth()));
    // }
    // if (!isTokenChecked(getState())) {
    //   console.log("-=-=-=-=-=-=-=-=-=-=- SENDING REQUEST FROM APP =-=-=-=-=-=-=-=-=-=-");
    //   promises.push(dispatch(loadAuth()));
    // }
    return Promise.all(promises);
  }
}])

@connect(
  (state, ownProps) => ({
    auth: state.auth,
    params: ownProps.params,
    location: ownProps.location
  }),
  { logout, checkToken, pushState: push })

export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    auth: PropTypes.object,
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    console.log("====> App.js PROPS: ", this.props);
    console.log("====> App.js NEXTPROPS: ", nextProps);
    const isLoggingIn = nextProps.auth.user ? (nextProps.auth.user.request_login && !nextProps.auth.user.request_load) : false;
    const isLoading = nextProps.auth.user ? (!nextProps.auth.user.request_login && nextProps.auth.user.request_load): false;

    if (!this.props.auth.user && nextProps.auth.user) {
      if (isLoggingIn){
        console.log(" -=-=-=-=- LOGGING IN -=-=-=-=- ");
        this.props.pushState('/home'); 
      }
      else if (isLoading){
        console.log(" -=-=-=-=- LOADING USER DETAILS -=-=-=-=- ");
      }
      else if (nextProps.auth.user.new_register){
        console.log(" -=-=-=-=- NEWLY REGISTERED -=-=-=-=- ");
        // debugger;
        this.props.pushState('/home');
      }
    }
    else if (this.props.auth.user && !nextProps.auth.user) {
      console.log(" -=-=-=-=- LOGGING OUT -=-=-=-=- ");
      // debugger;
      // this.props.pushState('/');
      window.location.assign("http://localhost:7000/");
      // window.location.reload();
    }
  }

  handleLogout = (event) => {
    //event.preventDefault();
    this.props.logout();
  };

  componentDidMount(){
    this.props.checkToken();
  }

  render() {
    const { user } = this.props.auth;
    const styles = require('./App.scss');

    return (
      <div className={styles.app}>
        <Helmet {...config.app.head} />
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <IndexLink to="/" activeStyle={{ color: 'black' }}>
                <div className={styles.brand} /> {/*  {styles.brand} */}
                <span>START BEAUTY SALON</span>
              </IndexLink>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>

          <Navbar.Collapse>
            <Nav navbar>
              {/* NONE YET */}
            </Nav>

          </Navbar.Collapse>

        </Navbar>

        <div className="app-content"> {/* {styles.appContent} */}
          {this.props.children}
        </div>     

      </div>
    );
  }
}
