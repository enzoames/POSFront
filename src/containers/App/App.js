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
    // auth: state.auth,
    salon: state.salon,
    params: ownProps.params,
    location: ownProps.location
  }),
  { pushState: push }) // connects actions 

export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    auth: PropTypes.object,
    //logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    console.log("APP props", this.props);
    console.log("APP nextProps", nextProps);
    const login = !this.props.salon.user && !this.props.salon.loaded && nextProps.salon.user && nextProps.salon.loaded;
    const logout = this.props.salon.user && this.props.salon.loaded && !nextProps.salon.user && !nextProps.salon.loaded;
    if (login){
      this.props.pushState('/service');
    }
    else if (logout){
      this.props.pushState(''); 
    }
  }

  render() {
    const styles = require('./App.scss');

    return (
      <div className={styles.app}>
        <Helmet {...config.app.head} />
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <IndexLink to="/" activeStyle={{ color: 'black' }}>
                <div className={styles.brand} /> {/*  {styles.brand} */}
                <span>STAR BEAUTY SALON</span>
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
