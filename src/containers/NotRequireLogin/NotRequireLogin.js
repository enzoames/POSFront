import React, {Component} from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { setRedirectUrl } from '../../actions/Auth/actions';
import { load } from '../../actions/Auth/actions';

class NotRequireLogin extends Component {
  
  componentDidMount() {
    const { auth, currentURL, dispatch } = this.props;
    if (!auth.isLogedIn) {
      // set the current url/path for future redirection
      // then redirect (we use a React Router method)
      if(localStorage && localStorage.getItem('id_token')){
        // console.log("*NOT REQUIRE LOGIN TOKEN*", localStorage.getItem('id_token'));
        dispatch(setRedirectUrl(currentURL));
        dispatch(load()) // LOAD USER, user is null on refresh,   
      }
      
      //browserHistory.replace(`/${currentURL}`);
    }
    // else{
    //   if (auth.user.credential===null) { 
    //     dispatch(setRedirectUrl(currentURL));
    //     browserHistory.replace("/home")
    //   }
    // }
  }

  render() {
    return (this.props.children);
  }
}

// Grab a reference to the current URL use `ownProps` to find the URL.
function mapStateToProps(state, ownProps) {
  return {
    auth: state.auth,
    currentURL: ownProps.location.pathname
  }
}

export default connect(mapStateToProps)(NotRequireLogin)
