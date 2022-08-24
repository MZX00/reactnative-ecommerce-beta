import { StyleSheet, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import UploadImage from "../components/UploadImage";
import CustomTextInput from "../components/CustomTextInput";
import LargeBlackButton from "../components/LargeBlackButton";
import { background } from "../utils/Constants";
import CustomDropDown from "../components/CustomDropDown";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setValid } from "../features/validation";

const AddProduct = ({ route, navigation }) => {
  const [dropdown, setDropdown] = useState("");

  const dispatch = useDispatch();

  const {
    image,
    name,
    price,
    description,
    discount,
    stock,
    brand,
    size,
    color,
  } = route.params
    ? route.params.data.product_data
    : {
        image: undefined,
        name: undefined,
        price: undefined,
        description: undefined,
        discount: undefined,
        stock: undefined,
        brand: undefined,
        size: undefined,
        color: undefined,
      };

  useEffect(() => {
    dispatch(setValid());
    dispatch(setValid());
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <UploadImage flex={1} prevImg={image}></UploadImage>
        <CustomTextInput
          placeholderText="Name"
          content={name ? name : ""}
          required={true}
          type="name"
        ></CustomTextInput>
        <CustomTextInput
          placeholderText="Description"
          content={description ? description : ""}
          type="description"
        ></CustomTextInput>
        <CustomTextInput
          placeholderText="Price"
          content={price > 0 ? price.toString() : "0"}
          required={true}
          type="price"
        ></CustomTextInput>
        <CustomTextInput
          placeholderText="Discount"
          content={discount ? discount.toString() : "0"}
          type="discount"
        ></CustomTextInput>
        <CustomTextInput
          placeholderText="stock"
          content={stock > 0 ? stock.toString() : "0"}
          type="stock"
        ></CustomTextInput>
        <CustomTextInput
          placeholderText="Brand"
          content={brand ? brand : ""}
          type="brand"
        ></CustomTextInput>
        <CustomDropDown
          placeholderText="Select a size"
          content={size ? size : ""}
          dropdown={dropdown}
          setDropdown={setDropdown}
          type="size"
        ></CustomDropDown>
        <CustomDropDown
          placeholderText="Select a color"
          content={color ? color : ""}
          dropdown={dropdown}
          setDropdown={setDropdown}
          type="color"
        ></CustomDropDown>
        <LargeBlackButton
          btnText={name ? "Edit" : "Add Product"}
          changeTo="goBack"
          fields={2}
        ></LargeBlackButton>
        <View style={{ flex: 1, padding: 10 }}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: background },
});

export default AddProduct;
