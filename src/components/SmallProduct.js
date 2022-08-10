import { useEffect, useState } from "react";
import { Image, StyleSheet, View, Text } from "react-native";
import Constants from "expo-constants";
import EmptyImage from "../../assets/svgs//EmptyImage";

const SmallProduct = ({ product, admin }) => {
  const baseUrl = Constants.manifest.extra.baseUrl;
  let imagePath;
  if (product && product.image) {
    imagePath = baseUrl + product.image;
  }

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
      <Text style={styles.price}>$ {product.price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFDFF",
    elevation: 5,
    marginHorizontal: 15,
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
  },
  img: { alignSelf: "center", width: 100, height: 100, marginTop: 10 },
  name: { paddingTop: 10, fontSize: 16 },
  price: { paddingBottom: 5 },
});

export default SmallProduct;
