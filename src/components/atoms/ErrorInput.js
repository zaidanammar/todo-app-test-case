import React, { Fragment } from "react";

const ErrorInput = ({ touched, errors }) => {
  return (
    <Fragment>
      {touched && errors && (
        <h1 className="text-red-500 font-medium text-xs mt-1">{errors}</h1>
      )}
    </Fragment>
  );
};

export default ErrorInput;
