import Svg, { Path } from "react-native-svg";

const CloseA = ({ height = 16, width = 16 }) => {
  return (
    <Svg width={height} height={width} viewBox="0 0 124 124">
      <Path
        d="M1.426 8.313a4.87 4.87 0 016.886-6.886l53.127 53.127 53.127-53.127a4.87 4.87 0 116.887 6.886L68.324 61.439l53.128 53.128a4.87 4.87 0 01-6.887 6.886L61.438 68.326 8.312 121.453a4.868 4.868 0 11-6.886-6.886l53.127-53.128L1.426 8.313z"
        fill="#000000"
      />
    </Svg>
  );
};

export default CloseA;
