import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { useSelector } from "react-redux";
import { blue, foreground, grey } from "../utils/Constants";

const OrderMiniCard = ({ id, cost, date, productList, status, name }) => {
  const navigation = useNavigation();
  const admin = useSelector((state) => state.user.admin);
  const [statusColor, setStatusColor] = useState("#FF980E");

  useEffect(() => {
    if (status == "processing") {
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
          Order N.o: {id ? id.slice(-7) : "Loading..."}
        </Text>
        <Text style={styles.date}>
          {date ? date.substring(0, 10) : "Loading..."}
        </Text>
      </View>
      <View style={styles.verticle}>
        <Text style={[styles.label, !admin && styles.name]}>
          Items:{" "}
          <Text style={styles.value}>
            {productList ? productList.length : "Loading..."}
          </Text>
        </Text>
        <Text style={styles.label}>
          Total Ammount :
          <Text style={styles.value}> ${cost ? cost : "Loading..."}</Text>
        </Text>
      </View>
      {admin && (
        <Text style={[styles.name, styles.label]}>
          Customer Name:{" "}
          <Text style={styles.value}>{name ? name : "Loading..."}</Text>
        </Text>
      )}
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
            <Text style={{ color: statusColor, textTransform: "capitalize" }}>
              {" " + status}
            </Text>
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
    marginVertical: 10,
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 25,
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
    paddingHorizontal: 5,
  },
  quantity: {
    marginTop: 10,
  },
  status: {
    fontSize: 14,
    fontWeight: "bold",
  },
  name: {
    marginVertical: 5,
  },
  label: {
    marginTop: 10,
    color: grey,
  },
  value: {
    color: "black",
  },
});

export default OrderMiniCard;
