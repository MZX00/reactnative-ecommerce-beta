import { StyleSheet, View, FlatList } from "react-native";
import Header from "../components/Header";
import Chip from "../components/Chip";
import OrderMiniCard from "../components/OrderMiniCard";
import { useEffect, useState } from "react";
import api from "../utils/Api";
import { foreground } from "../utils/Constants";
import { useSelector } from "react-redux";
import ShimmerOrder from "../components/Shimmers/ShimmerOrder";

const renderItem = ({ item, index, separators }) => {
  return (
    <OrderMiniCard
      id={item._id}
      cost={item.cost}
      date={item.dateCreated}
      productList={item.products}
      status={item.status}
      name={item.userName}
    />
  );
};

const OrderPanel = () => {
  const admin = useSelector((state) => state.user.admin);
  const token = useSelector((state) => state.user.token);

  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState("processing");
  const [data, setData] = useState({
    processing: [],
    completed: [],
    cancelled: [],
  });

  const loadData = async () => {
    const endpath = admin ? "order/admin/view" : "order/view";
    setLoading(true);
    const result = await api(endpath, "post", { token: token });
    if (result) {
      setData(result.body);
      setLoading(false);
    } else {
      console.log("API not working");
      console.log(result);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

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
          <FlatList
            data={data[selected]}
            keyExtractor={(item) => item._id}
            renderItem={renderItem}
            extraData={data}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  list: {
    height: "100%",
  },
});

export default OrderPanel;
