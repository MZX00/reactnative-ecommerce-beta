import Svg, { Path } from "react-native-svg";

const ProfileFilled = ({ width = 16, height = 21 }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 16 21" fill="none">
      <Path
        d="M0 17.575c0-2.722 3.685-3.4 8-3.4 4.339 0 8 .7 8 3.425 0 2.725-3.685 3.4-8 3.4-4.338 0-8-.7-8-3.425zM2.706 6.291A5.294 5.294 0 118 11.583a5.275 5.275 0 01-5.294-5.292z"
        fill="#200E32"
      />
    </Svg>
  );
};

export default ProfileFilled;
