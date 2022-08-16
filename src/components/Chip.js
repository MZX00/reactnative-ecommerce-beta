import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { blue50 } from "../utils/Constants";

const Chip = ({ text }) => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.5}>
      <Text style={styles.txt}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 15,
    backgroundColor: blue50,
    marginHorizontal: 8,
  },
  txt: {
    color: "#ffffff",
    fontSize: 16,
  },
});

export default Chip;
