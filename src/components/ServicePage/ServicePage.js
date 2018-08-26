import React, { Component } from 'react';

export default class ServicePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1
    }
  }

  handleNextPage = (e, service) => {
    this.setState({page: this.state.page + 1});
  }

  handleBackPage = () => {
    this.setState({page: this.state.page - 1});
  }

  render() {
    const { salon, handleSelectedService } = this.props;
    const { page } = this.state;

    const serviceList = [
      {name: 'Manicure / Pedicure'},
      {name: 'Manicure / Pedicure'},
      {name: 'Manicure / Pedicure'},
      {name: 'Manicure / Pedicure'},
      {name: 'Manicure / Pedicure'},
      {name: 'Manicure / Pedicure'},
    ]

    const serviceList2 = [
      {id: 1, name: 'Regular Pedicure', price: 15.00},
      {id: 2, name: 'Regular Pedicure', price: 15.00},
      {id: 3, name: 'Regular Pedicure', price: 15.00},
      {id: 4, name: 'Regular Pedicure', price: 15.00},
      {id: 5, name: 'Regular Pedicure', price: 15.00},
      {id: 6, name: 'Regular Pedicure', price: 15.00},
    ]

    const renderPageBody = () => {
      switch(page){
        case 1:
          return(
            <div className="col-sm-12 col-md-12 m-15-0-0-0">
              {serviceList.map( (service, index) => 
              <div key={index} className="col-sm-4 col-md-4 m-10-0" onClick={ (e) => this.handleNextPage(e, service)}>
                <div className="col-sm-12 col-md-12 service-item p-15">
                  <h3 className="text-center">{service.name}</h3>
                </div>
              </div>
              )} 
            </div>
          );
        case 2:
          return(
            <div className="col-sm-12 col-md-12 m-15-0-0-0">
              {serviceList2.map( (service, index) => 
              <div key={index} className="col-sm-4 col-md-4 m-10-0" onClick={ (e) => handleSelectedService(e, service) }>
                <div className="col-sm-12 col-md-12 service-item">
                  <h3 className="text-center">{service.name}</h3>
                  <h3 className="text-center">{`$${service.price.toFixed(2)}`}</h3>
                </div>
              </div>
              )} 
            </div>
          );
        default:
          return(<div>ERROR</div>)
      }
    }

    return (
      <div className="col-sm-8 col-md-8 p-0">
        <h1 className="text-center">Services</h1>
        {page == 2 && <div className="back-btn" onClick={this.handleBackPage}></div>}
        {renderPageBody()}
      </div>
    );
  }
}




