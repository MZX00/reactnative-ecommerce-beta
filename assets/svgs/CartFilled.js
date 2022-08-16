import Svg, { Path } from "react-native-svg";

const CartFilled = ({ width = 21, height = 20 }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 21 20" fill="none">
      <Path
        d="M15.15 18.459A1.514 1.514 0 1116.667 20a1.535 1.535 0 01-1.519-1.541zm-11.242 0A1.514 1.514 0 115.426 20a1.534 1.534 0 01-1.518-1.541zm1.68-3.164a2.51 2.51 0 01-1.727-.689 2.616 2.616 0 01-.812-1.7L2.13 1.784.62 1.518A.766.766 0 01.88.009l2.383.366a.768.768 0 01.62.694l.19 2.286a.617.617 0 00.608.572h13.495a1.69 1.69 0 011.41.684 2.25 2.25 0 01.38 1.754l-.95 6.694a2.582 2.582 0 01-2.529 2.235l-10.9.001zm5.784-6.826a.758.758 0 00.75.765h2.767a.758.758 0 00.75-.765.75.75 0 00-.75-.766h-2.768a.75.75 0 00-.749.765v.001z"
        fill="#200E32"
      />
    </Svg>
  );
};

export default CartFilled;
