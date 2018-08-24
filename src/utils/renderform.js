import React, { Component } from 'react';
import Select from 'react-select';

// ==========================
// ====== RENDER FIELD ======
// ==========================

export const RenderField = ({ input, label, type, meta: { touched, error, warning }, outerClassName="", labelClassName="", inputClassName="", placeholder="", step=""}) => {
  return(
    <div className={`${error && touched ? 'has-error' : ''} ${outerClassName}`}>
      {label && <div className={labelClassName}>{label}</div>}
      <div className={inputClassName}>
        <input {...input} className="form-control" placeholder={placeholder} type={type} step={step} />
        {touched && (error && <span className="glyphicon glyphicon-remove form-control-feedback"></span>)}
        {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
    </div>
  )
}


// ============================
// ====== RENDER TEXTBOX ======
// ============================

export const RenderTextBox = ({ input, label, meta: { touched, error, warning }, outerClassName="", labelClassName="", inputClassName="", rows=1, placeholder="" }) => {
  return(
    <div className={`${outerClassName} ${error && touched ? ' has-error' : ''}`}>
      {label && <div className={labelClassName}>{label}</div>}
      <div className={inputClassName}>
        {/* textarea className - resizes textbox vertical only */}
        <textarea {...input} className="textarea" rows={rows} placeholder={placeholder} ></textarea>
        {touched && (error && <span className="glyphicon glyphicon-remove form-control-feedback"></span>)}
        {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
    </div>
  );
}


// ===========================
// ====== RENDER SELECT ======
// ===========================

export class RenderSelect extends Component {
  constructor(props) {
    super(props);
  }
  handleBlur = () => {
    const { value } = this.props.input;
    if (!value) return this.props.input.onBlur(null)
    return value.value ? this.props.input.onBlur({ value }) : this.props.input.onBlur(value)
  }

  render() {
    // input is also passed in props when binded to redux form
    const { name, options, input, label, meta: { touched, error, warning }, initialValue="", labelClassName="", inputClassName="", placeholder="", outerClassName="", onChange=null, handleBlur=null, refEnabled=false} = this.props;
    // console.log("SELECT PROPS", this.props);
    return(
      <div className={outerClassName}>
        {label && <div className={labelClassName}>{label}</div>}
        <div className={inputClassName}>
          <Select
            name={name}
            value={(input && input.value.value) || initialValue}
            placeholder={placeholder}
            onChange={this.props.onChange ? this.props.onChange : this.props.input.onChange}
            onBlur={this.props.handleBlur ? this.props.handleBlur : this.handleBlur}
            options={options}
            ref={refEnabled ? (i) => i && i.focus() : null}
          />
          {error && touched && <div className="text-danger"><strong>{error}</strong></div>}
      </div>
    </div>
    )
  }
}


// =================================
// ====== RENDER SELECT MULTI ======
// =================================

export class RenderMultiSelect extends Component {
  constructor(props) {
    super(props);
  }
  handleChange = (value) => {
    if (!value)
      return this.props.input.onChange(null)
    return value.value ? this.props.input.onChange({ value }) : this.props.input.onChange(value)
  }
  handleBlur = () => {
    const { value } = this.props.input;
    if (!value) return this.props.input.onBlur(null)
    return value.value ? this.props.input.onBlur({ value }) : this.props.input.onBlur(value)
  }
  render() {
    const { name, options, label, meta: { touched, error, warning }, initialValue="", labelClassName="", inputClassName="", placeholder="", outerClassName=""} = this.props;

    return(
      <div className={outerClassName}>
        {label && <div className={labelClassName}>{label}</div>}
        <div className={inputClassName}>
          <Select
            multi={true}
            value={this.props.input.value || initialValue}
            placeholder={placeholder || ''}
            onChange={this.handleChange}
            // onBlur={() => {this.props.input.onBlur([...this.props.input.value])}}
            onBlur={this.handleBlur}
            options={options}
          />
          {error && touched && <div className="text-danger"><strong>{error}</strong></div>}
      </div>
    </div>
    )
  }
}


// ===========================
// ====== RENDER BUTTON ======
// ===========================

export const RenderButton = ({className, label, pristine, submitting, buttonClassName="", type="submit", onClick=null, icon=false}) => {
  return(
    <div className={className}>
      <button className={"btn "+ buttonClassName} type={type} onClick={onClick} disabled={pristine || submitting}>
        {icon ? <span className={icon}>{label}</span> : label }
      </button>
    </div>
  );
}


