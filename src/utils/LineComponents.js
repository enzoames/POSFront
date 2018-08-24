import React, { Component } from 'react';
import { Link } from 'react-router';
import { Photo } from 'components';


export const Line = {
  Single: function Single ({outerClassName, label}) {
    return(
      <div className={outerClassName}>
        <span>{label}</span>
      </div>
    );
  },
  Icon: function Icon ({outerClassName, icon, label=""}) {
    return(
      <div className={outerClassName}>
        <span className={icon} /><span>{label}</span>
      </div>
    );
  },
  Linked: function Linked ({outerClassName, linkurl, label=""}) {
    return(
     <div className={outerClassName}>
        <Link to={`${linkurl}`}>{label}</Link>
      </div> 
    );
  },
  LinkIcon: function LinkIcon ({outerClassName, linkurl, icon, label=""}) {
    return(
     <div className={outerClassName}>
        <Link to={`${linkurl}`}><span className={icon} />{label}</Link>
      </div> 
    );
  },
  Pair: function Pair ({outerClassName, labelClassName, valueClassName, label, value}) {
    return(
      <div className={outerClassName}>
        <div className={labelClassName}>
          {label}
        </div>
        <div className={valueClassName}>
          {value}
        </div>
      </div>
    );
  },
  PairRightMultiple: function PairRightMultiple ({outerClassName, labelClassName, valueClassName, label, array, arrayTarget, linkurl=false, slug=false}) {
    const result = array.length > 0 ? array.map( (field) => {
      return(
        <div key={field.id}>
          {linkurl ? 
            (<Link to={`${linkurl}${field[slug]}`}>{field[arrayTarget]}</Link>) :
            (field[arrayTarget])
          }
        </div>
    )}) : 'N/A'
    return(
      <div className={outerClassName}>
        <div className={labelClassName}>
          {label}
        </div>
        <div className={valueClassName}>
          {result}
        </div>
      </div>
    );
  }
}


export const BulletPoints = ({outerClassName, title, bulletList}) => {
  const renderBulletList = bulletList.map( (bullet, index) =>       
    <div key={index} className="col-sm-12 col-md-12 m-0-0-5-0">
      <span className="glyphicon glyphicon-triangle-right m-0-10-0-0"/>
      <span>{bullet.label}</span>
    </div>  
  );

  return(
    <div className={outerClassName + " m-0-0-10-0"}>
      {title && <Line.Single outerClassName={"col-sm-12 col-md-12 p-0 m-0-0-5-0"} label={title}/>}
      <div className="col-sm-12 col-md-12 p-0">
        {renderBulletList}
      </div>
    </div>
  );
}


export const LineBoxHeader = ({outerClassName, innerClassName, label}) => {
  return(
    <div className={`${outerClassName} header-box`}>
      <Line.Single outerClassName={`${innerClassName} title-single-line`} label={label} />
    </div>
  );
}


export const MiniBoxHeader = ({outerClassName, title, children}) => {
  return(
    <div className={`${outerClassName} mini-box`}>
      <div className="mini-box-header"><Line.Single outerClassName={"col-sm-12 col-md-12"} label={title} /></div>
        <div className="col-sm-12 col-md-12 p-10-0">
        {children}
        </div>
    </div>
  );
}


export const DetailsBox = ({outerClassName, photoLink, photoPlaceHolder, title, description, children}) => {
  return(
    <div className={`${outerClassName} details-box`}>
      {/*HEADER*/}
      <div className="col-sm-12 col-md-12 details-header">
        {/*PROFILE PHOTO*/}
        <div className="details-header-left">
          <div className="details-photo-wrapper">
            <Link to={photoLink}>
              <div className="details-photo">
                <Photo src={null} placeHolder={photoPlaceHolder} />
              </div>
            </Link>
          </div>
        </div>
        {/*INFO*/}
        <div className="details-header-right">
          <Line.Single outerClassName={"col-sm-12 col-md-12 p-0 text-bold m-0-0-5-0"} label={title} />
          <Line.Single outerClassName={"col-sm-12 col-md-12 onliner"} label={description} />
        </div>
      </div>
      {/*BODY*/}
      <div className="col-sm-12 col-md-12 p-20-0">
        {children}
      </div>
    </div>
  );
}


export const Divider = ({ className="", size="m" }) =>{
  let sizeClassName;
  switch(size){
    case 'm':
      sizeClassName = "sporta-divider-m";
      break;
    case 's':
      sizeClassName = "sporta-divider-s";
      break;
    case 'xs':
      sizeClassName = "sporta-divider-xs";
    default:
      break;
  }
  return(
    <div className={`${className} ${sizeClassName}`}></div>
  );
}


export const Alert = {
  Success: function Success({outerClassName, label, children}) {
    return(
      <div className={outerClassName}>
        <div className="sporta-success">
          <span className="glyphicon glyphicon-ok"/><span>{label}</span>
          {children}
        </div>
      </div>
    )
  },
  Warning: function Warning({outerClassName, label, children}) {
    return(
      <div className={outerClassName}>
        <div className="sporta-warning">
          <span className="glyphicon glyphicon-warning-sign"/><span>{label}</span>
          {children}
        </div>
      </div>
    )
  },
  Danger: function Danger({outerClassName, label, children}) {
    return(
      <div className={outerClassName}>
        <div className="sporta-danger">
          <span className="glyphicon glyphicon-remove"/><span>{label}</span>
          {children}
        </div>
      </div>
    )
  },
  Muted: function Muted({outerClassName, label, children}) {
    return(
      <div className={outerClassName}>
        <div className="sporta-muted">
          <span>{label}</span>
          {children}
        </div>
      </div>
    )
  },
}






