import { StyleSheet, View, ScrollView, SafeAreaView } from "react-native";
import CustomTextInput from "../components/CustomTextInput";
import Header from "../components/Header";
import LargeBlackButton from "../components/LargeBlackButton";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { background } from "../utils/Constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

const Signup = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header content="Personal details" flex={2} back={true} />
      <KeyboardAwareScrollView>
        <CustomTextInput
          type="email"
          placeholderText="Email address"
          required={true}
        />
        <CustomTextInput
          type="name"
          placeholderText="Full Name"
          required={true}
        />
        <CustomTextInput
          type="password"
          placeholderText="Password"
          required={true}
        />
        <CustomTextInput
          type="phone"
          placeholderText="Phone Number"
          required={true}
        />
        <CustomTextInput
          type="date"
          placeholderText="Date of Birth"
          required={true}
        />
        {/* <CustomTextInput
          type="address"
          placeholderText="Address"
          required={false}
        /> */}

        <LargeBlackButton
          btnText="Sign Up"
          changeTo="goBack"
          fields={5}
        ></LargeBlackButton>
        <Footer content="Already have an account?" link="Sign In"></Footer>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "space-around",
    backgroundColor: background,
  },
});

export default Signup;
