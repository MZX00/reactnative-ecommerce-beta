import Svg, { Path } from "react-native-svg";
import { blue50 } from "../../src/utils/Constants";

const HomeFilled = ({ width = 20, height = 21 }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 21" fill="none">
      <Path
        d="M7.144 19.686v-3.067a1.418 1.418 0 011.414-1.415h2.874a1.42 1.42 0 011.424 1.413v3.058a1.23 1.23 0 001.227 1.229h1.961a3.46 3.46 0 002.443-1 3.411 3.411 0 001.013-2.422V8.77a2.474 2.474 0 00-.9-1.9l-6.657-5.292a3.115 3.115 0 00-3.958.07l-6.518 5.22A2.474 2.474 0 00.5 8.77v8.7a3.444 3.444 0 003.456 3.434h1.916a1.231 1.231 0 001.14-.75c.063-.148.095-.307.095-.468h.037z"
        fill={blue50}
      />
    </Svg>
  );
};

export default HomeFilled;
