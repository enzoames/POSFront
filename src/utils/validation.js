import { hasValue } from './utilfunctions';

const isEmpty = value => value === undefined || value === null || value === '' || value.length === 0;
const join = (rules) => (value, data) => rules.map(rule => rule(value, data)).filter(error => !!error)[0 /* first error */ ];

export function email(value) {
  // Let's not start a debate on email regex. This is just for an example app!
  if (!isEmpty(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return 'Invalid email address ';
  }
  else
    return '';
}

export function required(value) {
  if (isEmpty(value)) {
    return 'Required';
  }
  else
    return '';
}

export function minLength(min) {
  return value => {
    if (!isEmpty(value) && value.length < min) {
      return `Must be at least ${min} characters `;
    }
    else
      return '';
  };
}

export function maxLength(max) {
  return value => {
    if (!isEmpty(value) && value.length > max) {
      return `Must be no more than ${max} characters `;
    }
    else
      return '';
  };
}

export function integer(value) {
  if (!Number.isInteger(Number(value))) {
    return 'Must be an integer ';
  }
  else
    return '';
}

export function oneOf(enumeration) {
  return value => {
    if (!~enumeration.indexOf(value)) {
      return `Must be one of: ${enumeration.join(', ')} `;
    }
    else
      return '';
  };
}

export function checkbox(value) {
  if(!value){
    return 'check required';
  }
  else
    return '';
}

export function minInteger(target, value) {
  if(value<target){
    return 'Not the minimum amount allowed';
  }
  else
    return '';
}

export function match(field) {
  return (value, data) => {
    if (data) {
      if (value !== data[field]) {
        return 'Do not match';
      }
    }
  };
}

// custom url validator
export function customURL(value) {
  if (/^[a-zA-Z][a-zA-Z0-9-]*$/.test(value)) {
    return '';
  } else {
    return 'Invalid URL';
  }
}

// check password match
export function checkPasswordMatch(password, confirmPassword) {
  if (password == confirmPassword) {
    return '';
  } else {
    return 'Passwords do not match';
  }
}

//function from boiler plate
export function createValidator(rules) {
  return (data = {}) => {
    const errors = {};
    Object.keys(rules).forEach((key) => {
      const rule = join([].concat(rules[key])); // concat enables both functions and arrays of functions
      const error = rule(data[key], data);
      if (error) {
        errors[key] = error;
      }
    });
    return errors;
  };
}
