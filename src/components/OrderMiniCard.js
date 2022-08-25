import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { useSelector } from "react-redux";
import { blue, foreground, grey } from "../utils/Constants";
import OrderStatusModal from "./OrderStatusModal";

const OrderMiniCard = ({
  id,
  cost,
  date,
  productList,
  status,
  name,
  setRefresh,
  refresh,
}) => {
  const navigation = useNavigation();
  const admin = useSelector((state) => state.user.admin);
  const [statusColor, setStatusColor] = useState("#FF980E");
  const [modalOpen, setModalOpen] = useState(false);

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
        <Text style={styles.id}>Order N.o: {id.slice(-7)}</Text>
        <Text style={styles.date}>{date.substring(0, 10)}</Text>
      </View>
      <View style={styles.verticle}>
        <Text style={[styles.label, !admin && styles.name]}>
          Items: <Text style={styles.value}>{productList.length}</Text>
        </Text>
        <Text style={styles.label}>
          Total Ammount :<Text style={styles.value}> ${cost}</Text>
        </Text>
      </View>
      {admin && (
        <Text style={[styles.name, styles.label]}>
          Customer Name: <Text style={styles.value}>{name}</Text>
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
          {status == "processing" && admin ? (
            <Pressable
              onPress={() => {
                setModalOpen(true);
              }}
              style={styles.status}
            >
              <Text
                style={[
                  styles.btnAdmin,
                  { backgroundColor: statusColor, textTransform: "capitalize" },
                ]}
              >
                {" " + status}
              </Text>
            </Pressable>
          ) : (
            <View style={styles.status}>
              <Text style={{ color: statusColor, textTransform: "capitalize" }}>
                {" " + status}
              </Text>
            </View>
          )}

          <OrderStatusModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            _id={id}
            setRefresh={setRefresh}
            refresh={refresh}
          />
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
    padding: 18,
    borderRadius: 10,
    marginHorizontal: 17,
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
  btnAdmin: {
    color: "#fff",
    minWidth: 60,
    borderRadius: 50,
    fontSize: 14,
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: -10,
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
    padding: 10,
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
