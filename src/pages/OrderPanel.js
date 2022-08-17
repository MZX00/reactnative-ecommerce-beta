import { StyleSheet, View, FlatList } from "react-native";
import Header from "../components/Header";
import Chip from "../components/Chip";
import OrderMiniCard from "../components/OrderMiniCard";
import { useEffect, useState } from "react";
import api from "../utils/Api";
import { background, grey } from "../utils/Constants";
import { useSelector } from "react-redux";

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

  const [selected, setSelected] = useState("inprogress");
  const [data, setData] = useState({
    inprogress: [],
    completed: [],
    cancelled: [],
  });

  const loadData = async () => {
    const endpath = admin ? "order/admin/view" : "order/view";
    const result = await api(endpath, "post", { token: token });
    if (result) {
      setData(result);
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
      <Header content={admin ? "Admin Order" : "My Orders"} back={true} />
      <View style={styles.chipContainer}>
        <Chip
          text={"In-Progress"}
          target={"inprogress"}
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

      <FlatList
        data={data[selected]}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 10, flex: 1, backgroundColor: background },

  chipContainer: {
    marginLeft: 10,
    marginBottom: 7,
    flexDirection: "row",
  },
  line: {
    borderTopColor: "lightgrey",
    elevation: 5,
    borderTopWidth: 1,
  },
});

export default OrderPanel;
