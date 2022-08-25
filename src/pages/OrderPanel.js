import { StyleSheet, View, FlatList, Text, ToastAndroid } from "react-native";
import Header from "../components/Header";
import Chip from "../components/Chip";
import OrderMiniCard from "../components/OrderMiniCard";
import { useEffect, useRef, useState } from "react";
import api from "../utils/Api";
import { background, foreground } from "../utils/Constants";
import { useSelector } from "react-redux";
import EmptyOrder from "../../assets/svgs/EmptyStates/EmptyOrder";
import ShimmerOrder from "../components/Shimmers/ShimmerOrder";

const OrderPanel = () => {
  const admin = useSelector((state) => state.user.admin);
  const token = useSelector((state) => state.user.token);

  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState();
  const [selected, setSelected] = useState("processing");
  const [data, setData] = useState({
    processing: [],
    completed: [],
    cancelled: [],
  });

  const [empty, setEmpty] = useState(
    data.processing.length === 0 &&
      data.completed.length === 0 &&
      data.completed.length === 0
  );

  const renderItem = ({ item }) => {
    return (
      <OrderMiniCard
        id={item._id}
        cost={item.cost}
        date={item.dateCreated}
        productList={item.products}
        status={item.status}
        name={item.userName}
        setRefresh={setRefresh}
        refresh={refresh}
      />
    );
  };

  const EmptyState = () => {
    if (
      (selected === "processing" && data.processing.length === 0) ||
      (data.processing.length === 0 &&
        data.completed.length === 0 &&
        data.completed.length === 0)
    ) {
      return (
        <View style={styles.empty}>
          <EmptyOrder />
          <Text style={styles.emptyText}>No Orders placed.</Text>
          <Text>Your orders appear here.</Text>
        </View>
      );
    } else if (selected === "completed" && data.completed.length === 0) {
      return (
        <View style={styles.empty}>
          <EmptyOrder />
          <Text style={styles.emptyText}>No Orders Delivered.</Text>
          <Text>Your completed orders appear here.</Text>
        </View>
      );
    } else if (selected === "cancelled" && data.cancelled.length === 0) {
      return (
        <View style={styles.empty}>
          <EmptyOrder />
          <Text style={styles.emptyText}>No Orders Cancelled.</Text>
          <Text>Your cancelled orders appear here.</Text>
        </View>
      );
    } else {
      return <Text>Error</Text>;
    }
  };

  const loadData = async () => {
    const endpath = admin ? "order/admin/view" : "order/view";
    setLoading(true);
    const result = await api(endpath, "post", { token: token });
    if (result && result.body) {
      setData(result.body);
      setLoading(false);
    } else {
      ToastAndroid.show("Error: Please refresh", ToastAndroid.LONG);
    }
  };

  useEffect(() => {
    loadData();
  }, [refresh]);

  useEffect(() => {
    setEmpty(
      (data.processing.length === 0 && selected == "processing") ||
        (data.completed.length === 0 && selected == "completed") ||
        (data.cancelled.length === 0 && selected == "cancelled")
    );
  }, [data, selected]);

  return (
    <View style={styles.container}>
      <Header
        content={admin ? "Admin Order" : "My Orders"}
        back
        elevate={false}
      />
      <View style={styles.chipContainer}>
        <Chip
          text={"Processing"}
          target={"processing"}
          selected={selected}
          setSelected={setSelected}
        />
        <Chip
          text={admin ? "Completed" : "Delivered"}
          target={"completed"}
          selected={selected}
          setSelected={setSelected}
        />
        <Chip
          text={"Cancelled"}
          target={"cancelled"}
          selected={selected}
          setSelected={setSelected}
        />
      </View>
      <View style={styles.line}></View>

      <View style={styles.list}>
        {loading ? (
          <ShimmerOrder />
        ) : (
          <View style={styles.inner}>
            {empty ? (
              <EmptyState />
            ) : (
              <FlatList
                contentContainerStyle={styles.contentContainer}
                data={data[selected]}
                keyExtractor={(item) => item._id}
                renderItem={renderItem}
                extraData={[data, refresh]}
              />
            )}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: background,
    paddingBottom: 10,
  },
  container: { backgroundColor: foreground },

  chipContainer: {
    justifyContent: "center",
    marginBottom: 10,
    marginLeft: 10,
    flexDirection: "row",
  },
  line: {
    borderTopColor: "lightgrey",
    elevation: 5,
    borderTopWidth: 1,
  },
  list: { marginBottom: "78%" },
  empty: {
    alignItems: "center",
    justifyContent: "center",
    height: "60%",
  },
  emptyText: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
  },
  inner: {
    height: "100%",
  },
});

export default OrderPanel;
