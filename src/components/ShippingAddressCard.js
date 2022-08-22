import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { blue, foreground, textBlue } from "../utils/Constants";
import { useSelector } from "react-redux";

const ShippingAddressCard = () => {
  const navigation = useNavigation();
  const address = useSelector((state) => state.checkout.address);

  return (
    <View style={styles.container}>
      <View style={styles.line1}>
        <Text style={styles.name}>{address.fullName}</Text>
        <Text
          style={styles.change}
          onPress={() => {
            navigation.navigate("ShippingAddress");
          }}
        >
          Change
        </Text>
      </View>
      <View>
        <Text style={styles.address}>{address.address}</Text>
        <Text style={styles.address}>{address.city + " " + address.state}</Text>
        <Text style={styles.address}>{address.country}</Text>
      </View>
      <View style={styles.checkbox}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 10,
    marginHorizontal: 15,
    borderRadius: 0,
    backgroundColor: foreground,
    borderRadius: 5,
    elevation: 5,
  },
  line1: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  checkbox: {
    marginLeft: -20,
  },
  name: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },
  change: {
    color: "blue",
    fontSize: 16,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  address: { marginBottom: 5 },
});

export default ShippingAddressCard;
