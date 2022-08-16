import { StyleSheet, View, FlatList } from "react-native";
import Header from "../components/Header";
import Chip from "../components/Chip";
import OrderMiniCard from "../components/OrderMiniCard";
import { useEffect, useState } from "react";
import api from "../utils/Api";
import { background } from "../utils/Constants";

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

const CartAdmin = () => {
  const [inprogress, setInprogress] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [cancelled, setCancelled] = useState([]);

  const loadData = async () => {
    const result = await api("order/admin/view", "post", {});
    if (result) {
      setInprogress(result.inprogress);
      setCompleted(result.completed);
      setCancelled(result.cancelled);
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
      <Header content={"Admin Order"} back={true} />
      <View style={styles.chipContainer}>
        <Chip text={"In-Progress"} />
        <Chip text={"Completed"} />
        <Chip text={"Cancelled"} />
      </View>

      <FlatList
        data={inprogress}
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
    flexDirection: "row",
  },
});

export default CartAdmin;
