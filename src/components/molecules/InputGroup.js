import React from "react";

const InputGroup= ({ children, label }) => {
  return (
    <div className="my-3 w-full">
      <h1 className="text-sm font-medium text-gray-500 my-1">{label}</h1>
      {children}
    </div>
  );
};

export default InputGroup;
