import { StyleSheet, View } from "react-native";
import CustomTextInput from "../components/CustomTextInput";
import Header from "../components/Header";
import LargeBlackButton from "../components/LargeBlackButton";
import Footer from "../components/Footer";
import { background } from "../utils/Constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

const Signup = () => {
  return (
    <View style={styles.container}>
      <Header content="Personal details" back={true} />
      <KeyboardAwareScrollView
        style={styles.body}
        resetScrollToCoords={{ x: 0, y: 0 }}
      >
        <View style={styles.buffer} />
        <CustomTextInput
          type="email"
          placeholderText="Email address"
          required={true}
        />
        <View style={styles.buffer} />
        <CustomTextInput
          type="name"
          placeholderText="Full Name"
          required={true}
        />
        <View style={styles.buffer} />
        <CustomTextInput
          type="password"
          placeholderText="Password"
          required={true}
        />
        <View style={styles.buffer} />
        <CustomTextInput
          type="phone"
          placeholderText="Phone Number"
          required={true}
        />
        <View style={styles.buffer} />
        <CustomTextInput
          type="date"
          placeholderText="Date of Birth"
          required={true}
        />
        <View style={styles.buffer} />

        <LargeBlackButton
          btnText="Sign Up"
          changeTo="goBack"
          fields={5}
        ></LargeBlackButton>
        <View style={styles.buffer} />
      </KeyboardAwareScrollView>
      <View style={styles.end}>
        <Footer content="Already have an account?" link="Sign In"></Footer>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "space-around",
    backgroundColor: background,
  },
  buffer: {
    paddingVertical: 10,
  },
  end: {
    flex: 1,
  },
});

export default Signup;
