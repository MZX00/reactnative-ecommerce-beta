import Svg, { Path } from "react-native-svg";

const CreditCardIcon = ({ width = 24, height = 24 }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 30 20" fill="none">
      <Path
        d="M4.75 18a4 4 0 01-4-4V4a4 4 0 014-4h16a4 4 0 014 4v10a4 4 0 01-4 4h-16zm-2-4a2 2 0 002 2h16a2 2 0 002-2v-1h-20v1zm0-10v7h20V4a2 2 0 00-2-2h-16a2 2 0 00-2 2zm3 3a1 1 0 010-2h4a1 1 0 110 2h-4z"
        fill="#97AABD"
      />
    </Svg>
  );
};

export default CreditCardIcon;
