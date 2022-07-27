import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { marginHorizontal, marginVertical } from "../utils/Constants";

const AddressCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.line1}>
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.change}>Change</Text>
      </View>
      <View>
        <Text>3 NewBridge Court</Text>
      </View>
      <View>
        <Text>Chino Hills, CA 91709, United States</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    // width: "80%",
    marginVertical: 10,
    marginHorizontal: 10,
    // backgroundColor: "#849DFE",
    borderColor: "#849DFE",
    borderWidth: 2,
    borderRadius: 15,
  },
  line1: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  name: {},
  change: {},
  line2: {},
  line3: {},
});

export default AddressCard;
