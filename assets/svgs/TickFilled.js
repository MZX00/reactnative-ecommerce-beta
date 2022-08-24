import Svg, { Path } from "react-native-svg";

const TickFilled = ({ disabled }) => {
  return (
    <Svg
      width={20}
      height={21}
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M14.34 20.904H5.67C2.279 20.904 0 18.53 0 14.995v-8.17C0 3.282 2.279.904 5.67.904h8.67C17.725.904 20 3.282 20 6.823v8.171c0 3.534-2.275 5.91-5.66 5.91zM6.44 10.03a.875.875 0 00-.62 1.5l2.38 2.365a.88.88 0 001.23 0l4.75-4.75a.877.877 0 00-1.24-1.24l-4.13 4.13-1.75-1.75a.868.868 0 00-.62-.255z"
        fill={disabled ? "grey" : "#200E32"}
      />
    </Svg>
  );
};

export default TickFilled;
