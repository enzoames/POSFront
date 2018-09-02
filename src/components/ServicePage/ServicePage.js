import React, { Component } from 'react';
import { serviceList } from 'utils/utilConstants';

export default class ServicePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      page1Selection: ''
    }
  }

  handleNextPage = (e, item) => {
    this.setState({page: this.state.page + 1, page1Selection: item.name});
  }

  handleBackPage = () => {
    this.setState({page: this.state.page - 1, page1Selection: ''});
  }

  render() {
    const { salon, handleSelectedService, handleCloseSession } = this.props;
    const { page, page1Selection } = this.state;

    const renderPageBody = () => {
      switch(page){
        case 1:
          return(
            <div className="col-sm-12 col-md-12 m-15-0-0-0">
              {serviceList.map( (item, index) => 
              <div key={index} className="col-sm-4 col-md-4 m-10-0" onClick={ (e) => this.handleNextPage(e, item)}>
                <div className="col-sm-12 col-md-12 service-item p-15">
                  <h3 className="text-center">{item.name}</h3>
                </div>
              </div>
              )} 
            </div>
          );
        case 2:
          const selectedItem = serviceList.find( item => item.name == page1Selection )

          return(
            <div className="col-sm-12 col-md-12 m-15-0-0-0">
              {selectedItem.service.map( (serv, index) =>
                <div key={index} className="col-sm-4 col-md-4 m-10-0" onClick={ (e) => handleSelectedService(e, serv) }>
                  <div className="col-sm-12 col-md-12 service-item">
                    <h3 className="text-center">{serv.name}</h3>
                    <h3 className="text-center">{`$${serv.price.toFixed(2)}`}</h3>
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
        <div className="col-sm-12 col-md-12 p-30 m-30-0-0-0">
          <div className="col-sm-2 col-md-2 close-session" onClick={handleCloseSession}>
            <h1 className="text-center">CLOSE</h1>
          </div>
        </div>
      </div>
    );
  }
}




