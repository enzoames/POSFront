import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { Passcode } from 'components';
import { loadUser } from 'actions/Auth/actions';

class Salon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //user: '',
      passcode: '',
      error: false,
      passcodesArray: [
        {name: 'Maria', passcode: '1234'},
        {name: 'Patricia', passcode: '5678'},
        {name: 'empty', passcode: '0000'},
      ],
      selectedArray: [
        { 'maria': false},
        { 'patricia': false},
        { 'empty': false},
      ]
    }
  }

  handlePassCode = (e, item) =>{
    const { error, passcode } = this.state;
    const newPassCode = passcode + item;

    if (newPassCode.length > 4){
      this.setState({passcode: '', error: true});    
    }
    else{
      this.setState({passcode: newPassCode, error: false });
    }
  }

  // handleSelectUser = (e, user) => {
  //   const { selectedArray } = this.state;
  //   const teampSelectedArray = [ { 'maria': false}, { 'patricia': false}, { 'empty': false}, ];
  //   switch(user){
  //     case 'maria':
  //       teampSelectedArray.maria = selectedArray.maria ? false : true;
  //       this.setState({selectedArray: teampSelectedArray, user: user });
  //       break;
  //     case 'patricia':
  //       teampSelectedArray.patricia = selectedArray.patricia ? false : true;
  //       this.setState({selectedArray: teampSelectedArray, user: user });
  //       break;
  //     case 'empty':
  //       teampSelectedArray.empty = selectedArray.empty ? false : true;
  //       this.setState({selectedArray: teampSelectedArray, user: user });
  //       break;
  //     default:
  //       break;
  //   }
  // }

  handleEnter = () => {
    const { passcodesArray, passcode} = this.state;
    let isAuthenticated = false;
    let user = ''
    passcodesArray.map( (instance) => { if(instance.passcode == passcode) { isAuthenticated = true; user = instance.name} } );
    isAuthenticated ? this.props.actions.loadUser(user) : this.setState({passcode: '', error: true })
  }

  handleClear = () => {
    this.setState({passcode: ''})
  }

  render() {
    const { error, passcode, selectedArray } = this.state;

    return (
      <div>
        <Helmet title="Star Beauty" />
        <div className="container-fluid salon-background">
          {/* NAMES BOX
          <div className="col-md-offset-3 col-sm-6 col-md-6">
            <div className="col-sm-4 col-md-4" onClick={ (e) => this.handleSelectUser(e, "patricia")}><div className={`col-sm-12 col-md-12 ${selectedArray.patricia ? "name-box-selected": "name-box"}`}><h3 className="text-center">Patricia</h3></div></div>
            <div className="col-sm-4 col-md-4" onClick={ (e) => this.handleSelectUser(e, "maria")}><div className={`col-sm-12 col-md-12 ${selectedArray.maria ? "name-box-selected": "name-box"}`}><h3 className="text-center">Maria</h3></div></div>
            <div className="col-sm-4 col-md-4" onClick={ (e) => this.handleSelectUser(e, "empty")}><div className={`col-sm-12 col-md-12 ${selectedArray.empty ? "name-box-selected": "name-box"}`}><h3 className="text-center"></h3></div></div>
          </div>
          */}
          <Passcode error={error} passcode={passcode} handlePassCode={this.handlePassCode} handleEnter={this.handleEnter} handleClear={this.handleClear} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ push, loadUser }, dispatch)
});

const mapStateToProps = (state) => ({
  // auth: state.auth
});

export default connect(mapStateToProps, mapDispatchToProps)(Salon);


