import Svg, { Path } from "react-native-svg";

const Lock = ({ width, height }) => {
  const w = width ? width : 16;
  const h = height ? height : 24;
  return (
    <Svg width={w} height={h} viewBox="0 0 20 26" fill="none">
      <Path
        d="M12.982 20.904H4.519A4.227 4.227 0 01.25 16.73v-4.938a4.165 4.165 0 012.977-3.959V6.304a5.472 5.472 0 015.508-5.4 5.576 5.576 0 013.915 1.58 5.3 5.3 0 011.623 3.82v1.529a4.165 4.165 0 012.977 3.959v4.937a4.227 4.227 0 01-4.268 4.175zM8.75 12.288a.875.875 0 00-.884.865v2.206a.889.889 0 101.778 0v-2.206a.881.881 0 00-.894-.865zm.01-9.645A3.711 3.711 0 005.006 6.28v1.338h7.489V6.304a3.7 3.7 0 00-3.74-3.661h.005z"
        fill="#97AABD"
      />
    </Svg>
  );
};

export default Lock;
