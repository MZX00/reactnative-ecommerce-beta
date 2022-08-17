import { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import Header from "../components/Header";
import Constants from "expo-constants";
import { background, foreground } from "../utils/Constants";
import { useSelector } from "react-redux";

const renderItem = ({ item, index, separators }) => {
  const baseUrl = Constants.manifest.extra.baseUrl;
  let imagePath;

  if (item && item.image) {
    imagePath = baseUrl + item.image;
  }
  return (
    <View style={styles.cardConatiner}>
      <View style={styles.horizontal}>
        <Image style={styles.img} source={{ uri: imagePath }} />
        <View style={styles.labels}>
          <Text>name: </Text>
          <Text>color: </Text>
          <Text>size: </Text>
          <Text>quantity: </Text>
          <Text>price: </Text>
        </View>

        <View style={styles.values}>
          <Text>{item.name}</Text>
          <Text>{item.color ? item.color : "White"}</Text>
          <Text>{item.size ? item.size : "Large"}</Text>
          <Text>{item.quantity}</Text>
          <Text>$ {item.price}</Text>
        </View>
      </View>
    </View>
  );
};

const OrderDetails = ({ navigation, route }) => {
  const admin = useSelector((state) => state.user.admin);
  const { id, cost, date, productList, status, name } = route.params;

  return (
    <View style={styles.container}>
      <Header content={"Order Details"} back={true} />
      <View style={styles.orderDetails}>
        <View style={styles.horizontal}>
          <View style={styles.labels}>
            <Text style={styles.order}>Order id: </Text>
            {admin && <Text style={styles.name}>Customer name : </Text>}
            <Text style={styles.name}>Status: </Text>
            <Text style={styles.name}>Order date : </Text>
            <Text style={styles.name}>Total Ammount: </Text>
          </View>

          <View style={styles.values}>
            <Text style={styles.order}>{id.slice(-7)}</Text>
            {admin && <Text style={styles.name}>{name}</Text>}
            <Text style={styles.name}>{status}</Text>
            <Text style={styles.name}>{date.substring(0, 10)}</Text>
            <Text style={styles.name}>$ {cost}</Text>
          </View>
        </View>
        <Text style={styles.order}>{productList.length} items</Text>
      </View>

      <FlatList
        data={productList}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: background, flex: 1 },
  cardConatiner: {
    elevation: 5,
    backgroundColor: foreground,
    marginVertical: 10,
    justifyContent: "center",
    borderRadius: 4,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  img: {
    width: 100,
    height: 100,
    marginLeft: 10,
    borderRadius: 4,
    marginRight: 10,
  },
  orderDetails: {
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  order: {
    fontWeight: "bold",
    fontSize: 16,
    marginVertical: 5,
  },
  name: {
    fontSize: 16,
    marginVertical: 5,
  },

  horizontal: {
    flexDirection: "row",
    alignItems: "center",
  },
  values: {},
  labels: {
    marginRight: 10,
    marginVertical: 10,
  },
});

export default OrderDetails;
