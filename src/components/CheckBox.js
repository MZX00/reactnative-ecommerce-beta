import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Tick from "../../assets/svgs/Tick";
import TickFilled from "../../assets/svgs/TickFilled";

const CheckBox = ({ label, selected, onPress, disabled }) => {
  const Selection = () => {
    if (disabled) {
      return <TickFilled disabled />;
    } else if (selected) {
      return <TickFilled />;
    } else {
      return <Tick />;
    }
  };
  return (
    <Pressable onPress={disabled ? () => {} : onPress} style={styles.container}>
      <Selection />
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
