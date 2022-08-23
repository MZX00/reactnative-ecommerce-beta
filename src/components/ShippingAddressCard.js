import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { blue, foreground, textBlue } from "../utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import api from "../utils/Api";
import { setAddress } from "../features/checkout";

const ShippingAddressCard = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const address = useSelector((state) => state.checkout.address);

  const loadData = async () => {
    const result = await api("user/address/view", "post", { token });
    if (result && result.body) {
      dispatch(setAddress(result.body.address[0]));
    }
  };

  useEffect(() => {
    if (address._id === "") {
      loadData();
    }
  }, [address]);

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
