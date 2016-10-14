import _ from 'lodash';

const errorHelper = (errors, errorPath) => {

  try {

    let errorInfo = _.get(errors, errorPath, undefined);

    if (Array.isArray(errorInfo) && errorInfo.length > 0) {
      errorInfo = formatErrors(errorInfo);
    }

    return errorInfo;

  }

   catch (e) {

    // the irony
    return undefined;
  }
};


const formatErrors = (errors) => {

  let outStr = "";

  if (errors.length === 1) {
    outStr = errors[0];
  } else {
    outStr = errors.slice(0, -1).join(', ') + ', and ' + errors.slice(-1);
  }

  return outStr;
};



export default errorHelper;
