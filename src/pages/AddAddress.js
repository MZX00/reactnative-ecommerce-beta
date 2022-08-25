import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { useDispatch, useSelector } from "react-redux";
import CustomTextInput from "../components/CustomTextInput";
import Header from "../components/Header";
import LargeBlackButton from "../components/LargeBlackButton";
import { setReq } from "../features/api";
import { background } from "../utils/Constants";

const AddAddress = ({ navigation, route }) => {
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setReq({ property: "token", value: token }));
  }, []);

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <Header content="Add Shipping Address" back={true} />
      <CustomTextInput
        type="fullName"
        placeholderText="Label"
        required={true}
      />
      <CustomTextInput
        type="address"
        placeholderText="Address"
        required={true}
      />
      <CustomTextInput type="city" placeholderText="City" required={true} />
      <CustomTextInput
        type="state"
        placeholderText="State/Province/Region"
        required={false}
      />
      <CustomTextInput
        type="country"
        placeholderText="Country"
        required={true}
      />

      <LargeBlackButton
        btnText="Add New Address"
        fields={4}
        changeTo={route.params ? "goBack" : "Checkout"}
      />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: background,
  },
});

export default AddAddress;
