import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { blue, foreground, textBlue } from "../utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import api from "../utils/Api";
import { setAddress } from "../features/checkout";
import React from "react";

const ShippingAddressCard = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const address = useSelector((state) => state.checkout.address);

  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    setLoading(true);
    const result = await api("user/address/view", "post", { token });
    if (result && result.body) {
      if (result.body.address.length > 0) {
        dispatch(setAddress(result.body.address[0]));
      }
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      if (address._id === "") {
        loadData();
      }
    }, [address])
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator color={blue}></ActivityIndicator>
      ) : (
        <View>
          {address._id === "" ? (
            <View style={styles.empty}>
              <Pressable
                onPress={() => {
                  navigation.navigate("AddAddress");
                }}
              >
                <Text style={styles.emptyText}>No address found.</Text>
                <Text style={styles.change}>Click here to add.</Text>
              </Pressable>
            </View>
          ) : (
            <View>
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
                <Text style={styles.address}>
                  {address.city + " " + address.state}
                </Text>
                <Text style={styles.address}>{address.country}</Text>
              </View>
            </View>
          )}
        </View>
      )}
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
    color: textBlue,
    fontSize: 16,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  address: { marginBottom: 5 },
  empty: {
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default ShippingAddressCard;
