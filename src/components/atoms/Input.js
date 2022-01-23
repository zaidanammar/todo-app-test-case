const Input = ({
  children,
  type,
  isDisabled,
  className,
  onChange,
  value,
  name,
  errors,
}) => {
  return (
    <input
      value={value}
      placeholder="Input here"
      name={name}
      type={type ? type : "text"}
      disabled={isDisabled ? isDisabled : false}
      className={
        className
          ? className
          : "w-full border border-gray-300 rounded-sm focus:outline-none focus:ring-1 h-9 p-3 text-sm focus:ring-blue-500"
      }
      onChange={onChange}
    >
      {children}
    </input>
  );
};

export default Input;
