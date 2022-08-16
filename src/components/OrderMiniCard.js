import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { blue, foreground, grey } from "../utils/Constants";

const OrderMiniCard = ({ id, cost, date, productList, status, name }) => {
  const navigation = useNavigation();
  const [statusColor, setStatusColor] = useState("#FF980E");

  useEffect(() => {
    if (status == "inprogress") {
      setStatusColor("#FF980E");
    } else if (status == "cancelled") {
      setStatusColor("#D3212C");
    } else {
      setStatusColor("#069C56");
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.verticle}>
        <Text style={styles.id}>
          Order id : {id ? id.slice(-7) : "Loading..."}
        </Text>
        <Text style={styles.date}>
          Date : {date ? date.substring(0, 10) : "Loading..."}
        </Text>
      </View>
      <View style={styles.verticle}>
        <Text style={styles.quantity}>
          Quantity: {productList ? productList.length : "Loading..."}
        </Text>
        <Text style={styles.cost}>Cost : ${cost ? cost : "Loading..."}</Text>
      </View>
      <Text style={styles.quantity}>
        Customer Name: {name ? name : "Loading..."}
      </Text>
      <View style={styles.verticle}>
        <Pressable
          onPress={() => {
            navigation.navigate("OrderDetails", {
              id: id,
              cost: cost,
              date: date,
              productList: productList,
              status: status,
              name: name,
            });
          }}
        >
          <View style={styles.btn}>
            <Text style={styles.details}>Details</Text>
          </View>
        </Pressable>
        <View>
          <Text style={styles.status}>
            Status :<Text style={{ color: statusColor }}>{" " + status}</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: foreground,
    elevation: 4,
    color: "#000000",
    margin: 10,
    padding: 15,
    borderRadius: 4,
  },
  verticle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  id: {
    fontWeight: "bold",
    fontSize: 16,
  },
  date: {
    color: grey,
    fontSize: 14,
  },
  btn: {
    backgroundColor: blue,
    minWidth: 60,
    borderRadius: 15,
    fontSize: 14,
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    margin: 5,
  },
  details: {
    color: "#ffffff",
  },
  quantity: {
    marginVertical: 5,
  },
  status: {
    fontSize: 14,
  },
});

export default OrderMiniCard;
