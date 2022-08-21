import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import CustomTextInput from "../components/CustomTextInput";
import Header from "../components/Header";
import LargeBlackButton from "../components/LargeBlackButton";
import { background } from "../utils/Constants";

const AddAddress = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header content="Add Shipping Address" back={true} />
      <CustomTextInput
        type="Name"
        placeholderText="Full name"
        required={true}
      />
      <CustomTextInput
        type="Address"
        placeholderText="Address"
        required={true}
      />
      <CustomTextInput type="City" placeholderText="City" required={true} />
      <CustomTextInput
        type="name"
        placeholderText="State/Province/Region"
        required={false}
      />
      <CustomTextInput type="name" placeholderText="Country" required={true} />

      <LargeBlackButton btnText="Save Address" changeTo="Checkout" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: background,
  },
});

export default AddAddress;
