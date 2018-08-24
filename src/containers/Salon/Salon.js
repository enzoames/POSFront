import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

class Salon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passcode: '',
      error: false,
      passcodesArray: [
        {'maria': '1234'},
        {'patricia': '5678'}
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

  handleEnter = () => {
    
  }

  handleClear = () => {
    this.setState({passcode: ''})
  }

  render() {
    console.log("STATE", this.state);
    const { error, passcode } = this.state

    return (
      <div>
        <Helmet title="Star Beauty" />
        <div className="container-fluid salon-background">
          
          <div className="col-md-offset-4 col-sm-4 col-md-4 passcode pop-genie">
            <div className={`col-sm-12 col-md-12 ${error ? 'input-box-error' : 'input-box'}`}>
              <h1 className="text-center l-s-5">{passcode.split('').map( (x, index) => '*')}</h1>
            </div>
            <div className="col-sm-12 col-md-12 m-30-0-0-0 p-0">
              {['1', '2', '3', '4', '5', '6', '7','8', '9', '*', '0', '#'].map( (item, index) =>  
                <div key={index} className="col-sm-4 col-md-4 number-box" onClick={(e) => this.handlePassCode(e, item)}>
                  <h1 className="text-center">{item}</h1>
                </div>
              )}
            </div>
            <div className="col-sm-12 col-md-12 enter-passcode">
              <h1 className="text-center" onClick={this.handleEnter}>ENTER</h1>
            </div>
            <div className="col-sm-12 col-md-12 clear-passcode">
              <h1 className="text-center" onClick={this.handleClear}>CLEAR</h1>
            </div>
          </div>
        
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ }, dispatch)
});

const mapStateToProps = (state) => ({
  // auth: state.auth
});

export default connect(mapStateToProps, mapDispatchToProps)(Salon);


