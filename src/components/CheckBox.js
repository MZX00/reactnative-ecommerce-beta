import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Tick from "../../assets/svgs/Tick";
import TickFilled from "../../assets/svgs/TickFilled";

const CheckBox = ({ label, selected, onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      {!selected && <Tick />}
      {selected && <TickFilled />}
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  text: {
    marginHorizontal: 10,
  },
});

export default CheckBox;
