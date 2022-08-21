import { SafeAreaView, StyleSheet, View } from "react-native";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LargeBlackButton from "../components/LargeBlackButton";
import CustomTextInput from "../components/CustomTextInput";
import { useState } from "react";
import { background } from "../utils/Constants";

const ForgotPassword = () => {
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Header content="Forgot password" flex={2} back={true} />
      <Footer
        content="Please enter your email address. You will receive a link you will receive a link to create a new password via email"
        link=""
      />
      <CustomTextInput
        type="Email"
        required={true}
        toggleError={error}
        setIsValid={setIsValid}
      />
      <LargeBlackButton
        btnText="Send"
        isValid={isValid}
        setError={setError}
        changeTo="goBack"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: background,
    alignItems: "stretch",
    justifyContent: "flex-start",
    marginBottom: 150,
  },
});

export default ForgotPassword;
