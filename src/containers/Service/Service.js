import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { logout, saveReceipt  } from 'actions/Auth/actions';
import { Receipt, ServicePage, Loader } from 'components';

class Service extends Component {
  constructor(props) {
    super(props);
    this.state = {
      receipt: []
    }
  }

  handleDoneSession = (e, total) => {
    const { receipt } = this.state;
    const { salon } = this.props;
    const result = {
      user: salon.user,
      receipt: receipt,
      total: total
    }
    console.log("\n\nTO SERVER RESULT", result);
    this.props.actions.saveReceipt(result);
    this.props.actions.logout();
  }

  handleSelectedService = (e, service) => {
    let tempReceipt = this.state.receipt;
    tempReceipt.push(service);
    this.setState({ receipt: tempReceipt });
  }

  handleRemoveItem = (e, item) => {
    let tempReceipt = this.state.receipt;
    const result = tempReceipt.filter( (receiptItem) => receiptItem.id !== item.id);
    this.setState({ receipt: result });
  }

  handleCloseSession = () => {
    this.props.actions.logout();
  }

  render() {
    const { salon } = this.props;
    const { receipt } = this.state;
    return (
      <div>
        <Helmet title="Star Beauty" />
          {!salon.isPostingReceipt ?
            <div>
              <ServicePage salon={salon} handleSelectedService={this.handleSelectedService} handleCloseSession={this.handleCloseSession} />
              <Receipt salon={salon} receipt={receipt} handleDoneSession={this.handleDoneSession} handleRemoveItem={this.handleRemoveItem} />
            </div> : <h1>LOADING  . . . </h1>
          }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ logout, saveReceipt }, dispatch)
});

const mapStateToProps = (state) => ({
  salon: state.salon
});

export default connect(mapStateToProps, mapDispatchToProps)(Service);


