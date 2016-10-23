import React, { PropTypes } from 'react';

const ErrorMessage = ({ errorMsgID, errorMsgText }) => {
  return (
    <div id={errorMsgID}>
      {errorMsgText}
    </div>
  );
};

ErrorMessage.propTypes = {
  errorMsgID: PropTypes.string,
  errorMsgText: PropTypes.string,
};

export default ErrorMessage;