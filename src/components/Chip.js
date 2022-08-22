import { Text, Pressable, StyleSheet } from "react-native";
import { blue, blue50 } from "../utils/Constants";

const Chip = ({ text, target, selected, setSelected }) => {
  return (
    <Pressable
      onPress={() => {
        setSelected(target);
      }}
      style={[styles.container, target === selected && styles.selected]}
      activeOpacity={0.5}
    >
      <Text style={styles.txt}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 15,
    backgroundColor: blue50,
    marginRight: 15,
    elevation: 5,
  },
  selected: {
    backgroundColor: blue,
  },
  txt: {
    color: "#ffffff",
    fontSize: 16,
  },
});

export default Chip;
