import React from 'react';
import { Divider } from 'utils/LineComponents';

const Receipt = ({salon, receipt, handleDoneSession, handleRemoveItem}) => {
  const TOTAL = receipt.reduce( (accumulator, currentValue) => accumulator + currentValue.price, 0 ).toFixed(2);
  return(
    <div className="col-sm-4 col-md-4 p-0">
      <div className="col-sm-12 col-md-12 pop-genie top-banner">
        {/*TOP BAR*/}
        <div className="col-sm-6 col-md-6">
          <h1 className="text-center">{salon.user.name}</h1>
        </div>
        {receipt.length > 0 &&
          <div className="col-sm-6 col-md-6" onClick={(e) => handleDoneSession(e, TOTAL)}>
            <div className="col-sm-12 col-md-12 done-session">
              <h1 className="text-center">DONE</h1>
            </div>
          </div>
        }
        <Divider size={'xs'} />
        {/*RECEIPT*/}
        {receipt.length > 0 && receipt.map( (item, index) =>
          <div key={index} className="col-sm-12 col-md-12 m-0-0-5-0">
            <div className="col-sm-2 col-md-2" onClick={ (e) => handleRemoveItem(e, item)} >
              <div className="remove-btn"><span className="glyphicon glyphicon-remove" /></div>
            </div>
            <div className="col-sm-5 col-md-5">
              <h4 className="text-center">{item.name}</h4>
            </div>
            <div className="col-sm-5 col-md-5">
              <h4 className="text-center">{`$${item.price.toFixed(2)}`}</h4>
            </div>
          </div>
        )}
        <Divider size={'xs'} /> 
        {/*TOTAL*/}
        {receipt.length > 0 &&
          <div className="col-sm-12 col-md-12 receipt-total">
            <div className="col-sm-6 col-md-6">
              <h1 className="text-center">TOTAL</h1>
            </div>
            <div className="col-sm-6 col-md-6">
              <h1 className="text-center">${TOTAL}</h1>
            </div>
          </div>
        }
      </div>  
    </div>
  );
}

export default Receipt;
