import React from 'react';

const Passcode = ({error, passcode, handlePassCode, handleEnter, handleClear}) => {
  return(
    <div className="col-md-offset-4 col-sm-4 col-md-4 passcode pop-genie">
      <div className={`col-sm-12 col-md-12 ${error ? 'input-box-error' : 'input-box'}`}>
        <h1 className="text-center l-s-5">{passcode.split('').map( (x, index) => '*')}</h1>
      </div>
      <div className="col-sm-12 col-md-12 m-30-0-0-0 p-0">
        {['1', '2', '3', '4', '5', '6', '7','8', '9', '*', '0', '#'].map( (item, index) =>  
          <div key={index} className="col-sm-4 col-md-4 number-box" onClick={(e) => handlePassCode(e, item)}>
            <h1 className="text-center">{item}</h1>
          </div>
        )}
      </div>
      <div className="col-sm-12 col-md-12 enter-passcode">
        <h1 className="text-center" onClick={handleEnter}>ENTER</h1>
      </div>
      <div className="col-sm-12 col-md-12 clear-passcode">
        <h1 className="text-center" onClick={handleClear}>CLEAR</h1>
      </div>
    </div>    
  );
}

export default Passcode;