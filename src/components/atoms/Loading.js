import { TailSpin } from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Loading = ({ color, height, width }) => {
  return (
    <TailSpin
      color={color || "#ffffff"}
      height={height || "10"}
      width={width || "10"}
    />
  );
};

export default Loading;
