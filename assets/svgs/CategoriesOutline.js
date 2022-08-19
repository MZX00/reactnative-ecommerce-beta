import Svg, { Path } from "react-native-svg";

const CategoriesOutline = () => {
  return (
    <Svg
      width={22}
      height={22}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M15.286.904h3.267A2.459 2.459 0 0121 3.374v3.294a2.46 2.46 0 01-2.448 2.47h-3.266a2.46 2.46 0 01-2.449-2.47V3.374a2.46 2.46 0 012.45-2.47v0zM3.449.904h3.265a2.46 2.46 0 012.449 2.47v3.294a2.46 2.46 0 01-2.449 2.47H3.449A2.46 2.46 0 011 6.668V3.374A2.46 2.46 0 013.449.904v0zM3.449 12.67h3.265a2.46 2.46 0 012.449 2.471v3.293a2.46 2.46 0 01-2.449 2.47H3.449A2.46 2.46 0 011 18.434v-3.293a2.46 2.46 0 012.449-2.47v0zM15.286 12.67h3.267A2.46 2.46 0 0121 15.141v3.293a2.459 2.459 0 01-2.448 2.47h-3.266a2.46 2.46 0 01-2.45-2.47v-3.293a2.46 2.46 0 012.45-2.47v0z"
        stroke="#200E32"
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default CategoriesOutline;
