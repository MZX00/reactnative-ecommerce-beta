import Header from "../components/Header";
import { SafeAreaView, StyleSheet, View } from "react-native";
import CustomTextInput from "../components/CustomTextInput";
import LargeBlackButton from "../components/LargeBlackButton";
import { useEffect, useState } from "react";
import { background } from "../utils/Constants";

const DeleteAccount = ({ route }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header content="Delete Account" flex={1} back={true} />
      <CustomTextInput type="password" required={true} />
      <LargeBlackButton
        changeTo="deleteAccount"
        btnText="Delete Account"
        fields={1}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: background,
    justifyContent: "center",
  },
});

export default DeleteAccount;
