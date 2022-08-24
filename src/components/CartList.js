import { useEffect } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Counter from "./Counter";
import EmptyCart from "../../assets/svgs/EmptyCart";
import Constants from "expo-constants";
import EmptyImage from "../../assets/svgs//EmptyImage";
import { foreground } from "../utils/Constants";
import Delete from "../../assets/svgs/Delete";
import { removeFromCart } from "../features/cart";

const Item = ({
  title = "",
  price = 0,
  quantity = -1,
  image = "",
  _id = 0,
}) => {
  const dispatch = useDispatch();
  const onPress = () => {
    dispatch(removeFromCart(_id));
  };

  const productImage = image ? Constants.manifest.extra.baseUrl + image : "";
  return (
    <View style={styles.item}>
      {productImage ? (
        <Image source={{ uri: productImage }} style={styles.image}></Image>
      ) : (
        <View style={styles.svg}>
          <EmptyImage />
        </View>
      )}
      <View style={styles.itemCenter}>
        <Text numberOfLines={1} style={styles.headerText}>
          {title}
        </Text>
        <Counter count={quantity} _id={_id}></Counter>
      </View>
      <View style={styles.itemEnd}>
        <Pressable style={styles.delete} onPress={onPress}>
          <Delete />
        </Pressable>

        <Text style={styles.price}>${price}</Text>
      </View>
    </View>
  );
};

const renderItem = ({ item }) => {
  return (
    <Item
      title={item ? item.name : ""}
      price={item ? item.price : ""}
      quantity={item ? item.quantity : ""}
      image={item ? item.image : ""}
      _id={item ? item._id : ""}
    ></Item>
  );
};

const CartList = () => {
  const data = useSelector((state) => state.cart.items);

  useEffect(() => {}, []);
  return data.length ? (
    <FlatList
      data={data}
      renderItem={renderItem}
      style={styles.list}
    ></FlatList>
  ) : (
    <EmptyCart />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    alignSelf: "stretch",
  },
  headerText: {
    fontSize: 16,
    marginLeft: 10,
    width: "90%",
  },
  image: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  item: {
    marginHorizontal: 20,
    flexDirection: "row",
    marginBottom: 11,
    borderRadius: 10,
    backgroundColor: foreground,
    elevation: 5,
  },
  itemCenter: {
    flex: 2.5,
    alignItems: "flex-start",
    justifyContent: "space-around",
  },
  itemEnd: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  price: {
    fontSize: 14,
    paddingVertical: 10,
    paddingRight: 10,
  },
  svg: {
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 100,
    backgroundColor: "lightgrey",
  },
  delete: {
    marginRight: 10,
    marginBottom: 30,
  },
});

export default CartList;
