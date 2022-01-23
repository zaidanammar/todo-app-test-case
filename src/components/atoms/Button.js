import React from "react";
import Loading from "./Loading";
import { isUndefined } from "lodash";
const Button = ({ children, type, isSubmitting, handleClick, color }) => {
  return (
    <button
      onClick={type === "button" ? handleClick : () => {}}
      disabled={isSubmitting}
      type={type || 'button'}
      className={
        "rounded-sm w-full h-9 text-white font-semibold flex items-center justify-center " +
        (isSubmitting
          ? "cursor-not-allowed "
          : "cursor-pointer hover:bg-opacity-70 ") +
        (isUndefined(color) ? "bg-blue-500 " : color)
      }
    >
      {isSubmitting ? (
        <Loading color="white" width={15} height={15} />
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
