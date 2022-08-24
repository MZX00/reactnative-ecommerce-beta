import Svg, { Path } from "react-native-svg";
import { blue50 } from "../../src/utils/Constants";

const ProfileOutline = ({ width = 17, height = 22 }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 17 22" fill="none">
      <Path
        d="M8.579 10.96a4.778 4.778 0 100-9.556 4.778 4.778 0 000 9.556zM1 17.605a2.215 2.215 0 01.22-.97 4.043 4.043 0 012.819-1.62 16.801 16.801 0 012.343-.326 25.065 25.065 0 014.385 0c.788.056 1.57.166 2.343.33 1.071.22 2.362.66 2.819 1.62a2.27 2.27 0 010 1.95c-.458.961-1.748 1.4-2.819 1.611-.771.172-1.555.285-2.343.34a25.815 25.815 0 01-3.567.05 4.06 4.06 0 01-.815-.056 15.416 15.416 0 01-2.334-.339c-1.083-.206-2.364-.649-2.831-1.606a2.279 2.279 0 01-.22-.984v0z"
        stroke={blue50}
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default ProfileOutline;
