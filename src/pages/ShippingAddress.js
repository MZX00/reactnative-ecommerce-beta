import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Text,
} from "react-native";
import Header from "../components/Header";
import AddressCard from "../components/AddressCard";
import Add from "../../assets/svgs/Add";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { background } from "../utils/Constants";
import { useState } from "react";
import api from "../utils/Api";
import { useDispatch, useSelector } from "react-redux";
import EmptyAddress from "../../assets/svgs/EmptyStates/EmptyAddress";

import { setAddress } from "../features/checkout";
import ShimmerAddress from "../components/Shimmers/ShimmerAddress";

const ShippingAddress = () => {
  const navigation = useNavigation();
  const token = useSelector((state) => state.user.token);
  const defaultAdressID = useSelector((state) => state.checkout.address._id);
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    const result = await api("user/address/view", "post", { token });
    if (result && result.body) {
      setData(result.body.address);
      if (!defaultAdressID && result.body.address.length != 0) {
        dispatch(setAddress(result.body.address[0]));
      }
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [])
  );

  const renderItem = ({ item }) => {
    const { fullName, address, city, state, country } = item;
    return (
      <AddressCard
        _id={item._id}
        fullName={fullName}
        address={address}
        city={city}
        state={state}
        country={country}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Header content="Shipping Addresses" back={true} />

      {/* <View style={styles.list}> */}
      {loading ? (
        <ShimmerAddress />
      ) : (
        <View style={styles.list}>
          {data.length === 0 ? (
            <View style={styles.empty}>
              <EmptyAddress />
              <Text style={styles.emptyText}>No address found.</Text>
              <Text>Click the button to add a new adress.</Text>
            </View>
          ) : (
            <FlatList
              contentContainerStyle={styles.contentContainer}
              data={data}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              extraData={[data, defaultAdressID]}
            />
          )}
        </View>
      )}
      {/* </View> */}

      <TouchableOpacity
        style={styles.add}
        activeOpacity={0.5}
        onPress={() => {
          navigation.navigate("AddAddress", {
            addNewAddress: true,
          });
        }}
      >
        <Add width={70} height={70} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: background,
  },
  list: { flex: 1 },
  contentContainer: { paddingBottom: 10 },
  add: {
    position: "absolute",
    bottom: 10,
    right: 15,
    resizeMode: "contain",
    height: 60,
    zIndex: 1,
  },
  empty: {
    alignItems: "center",
    justifyContent: "center",
    height: "94%",
  },
  emptyText: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
  },
});

export default ShippingAddress;
