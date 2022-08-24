import Svg, { Path } from "react-native-svg";
import { blue50 } from "../../src/utils/Constants";

const Tick = () => {
  return (
    <Svg width={20} height={21} viewBox="0 0 20 21" fill="none">
      <Path
        d="M14.334 1.654H5.665C2.644 1.654.75 3.793.75 6.82v8.168c0 3.027 1.885 5.166 4.915 5.166h8.668c3.031 0 4.917-2.139 4.917-5.166V6.82c0-3.027-1.886-5.166-4.916-5.166z"
        stroke={blue50}
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.44 10.904l2.374 2.373 4.746-4.746"
        stroke={blue50}
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default Tick;
