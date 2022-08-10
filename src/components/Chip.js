import { Text, TouchableOpacity, StyleSheet } from "react-native";

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
    paddingVertical: 10,
    borderRadius: 15,
    backgroundColor: "#000DAE",
  },
  txt: {
    color: "#ffffff",
  },
});

export default Chip;
