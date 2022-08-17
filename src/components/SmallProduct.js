import { useEffect, useState } from "react";
import { Image, StyleSheet, View, Text, Pressable } from "react-native";
import Constants from "expo-constants";
import EmptyImage from "../../assets/svgs/EmptyImage";
import CartPlus from "../../assets/svgs/CartPlus";
import { blue, foreground } from "../utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart";

const SmallProduct = ({ product }) => {
  //redux
  const dispatch = useDispatch();
  const quantity = useSelector((state) => {
    const i = state.cart.items.map((e) => e._id).indexOf(product._id);
    if (state.cart.items[i]) {
      return state.cart.items[i].quantity;
    } else {
      return 0;
    }
  });
  const admin = useSelector((state) => state.user.admin);

  //image
  const baseUrl = Constants.manifest.extra.baseUrl;
  let imagePath;
  if (product && product.image) {
    imagePath = baseUrl + product.image;
  }

  const onPress = () => {
    console.log(product);
    dispatch(
      addToCart({
        _id: product._id,
        name: product.name,
        // stock: product.stock,
        price: product.price,
        image: product.image,
        // color: color,
        // size: size,
      })
    );
  };

  return (
    <View style={styles.container}>
      {imagePath ? (
        <Image style={styles.img} source={{ uri: imagePath }} />
      ) : (
        <View style={{ alignItems: "center", padding: 15 }}>
          <EmptyImage width={80} height={80} />
        </View>
      )}
      <Text style={styles.name}>{product.name}</Text>
      <View style={styles.containerBottom}>
        <Text style={styles.price}>$ {product.price}</Text>
        {!admin && (
          <Pressable style={styles.cartIcon} onPress={onPress}>
            {quantity === 0 && <CartPlus />}
            {quantity != 0 && <Text style={styles.quantity}>{quantity}</Text>}
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: foreground,
    elevation: 7,
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 15,
    paddingBottom: 10,
  },
  containerBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingLeft: 10,
  },
  img: {
    alignSelf: "center",
    width: "100%",
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cartIcon: {
    width: 35,
    height: 35,
    backgroundColor: blue,
    borderRadius: 30,
    elevation: 5,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  name: { fontSize: 16, marginHorizontal: 10, paddingTop: 5 },
  price: {},
  quantity: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default SmallProduct;
