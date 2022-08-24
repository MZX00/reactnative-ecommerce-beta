import Svg, { Path } from "react-native-svg";
import { blue50 } from "../../src/utils/Constants";

const Pencil = () => {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
      <Path
        d="M10.471 17.404a.645.645 0 01-.089-1.285l.089-.006h6.871a.645.645 0 01.09 1.285l-.09.006h-6.871zm-9.812 0a.657.657 0 01-.659-.66l.1-3.94c.02-.749.33-1.46.868-1.982L10.66 1.32a3.24 3.24 0 014.515 0l1.294 1.27a3.087 3.087 0 010 4.426l-9.728 9.537a2.98 2.98 0 01-2.1.851H.659zM1.9 11.732a1.6 1.6 0 00-.482 1.1l-.084 3.278h3.309c.385 0 .758-.131 1.057-.374l.107-.1 8.046-7.887-3.946-3.865L1.9 11.732zM14.786 6.84l.752-.737a1.814 1.814 0 000-2.6l-1.3-1.269a1.9 1.9 0 00-2.653 0l-.752.737 3.953 3.87z"
        fill={blue50}
      />
    </Svg>
  );
};

export default Pencil;
