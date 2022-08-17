import Svg, { Path } from "react-native-svg";

const DocumentFilled = ({ width = 20, height = 21 }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 21" fill="none">
      <Path
        d="M14.191 20.904H5.81c-3.057 0-4.81-1.764-4.81-4.84V5.734a4.91 4.91 0 011.265-3.56A4.863 4.863 0 015.81.905h8.382C17.247.904 19 2.664 19 5.734v10.33a4.89 4.89 0 01-1.246 3.583 4.82 4.82 0 01-3.563 1.257zM6 14.64a.78.78 0 00-.668.374.786.786 0 00.753 1.2h7.835a.79.79 0 000-1.57H6.08A.792.792 0 006 14.64zm.08-4.557a.78.78 0 100 1.56h7.84a.78.78 0 100-1.56H6.08zm0-4.53v.01a.78.78 0 000 1.56h2.99a.785.785 0 000-1.57H6.08z"
        fill="#200E32"
      />
    </Svg>
  );
};

export default DocumentFilled;
