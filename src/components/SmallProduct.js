import { useEffect, useState } from "react";
import { Image, StyleSheet, View, Text } from "react-native";

const SmallProduct = ({ product, admin }) => {
  const imagePath = product
    ? "http://192.168.8.103:8000/" + product.image
    : "https://picsum.photos/200";

  return (
    <View style={styles.container}>
      <Image style={styles.img} source={{ uri: imagePath }} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>$ {product.price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F8FA",
    margin: 15,
    padding: 15,
  },
  img: { alignSelf: "center", aspectRatio: 1, width: 100, height: null },
  name: {},
  price: {},
});

export default SmallProduct;
