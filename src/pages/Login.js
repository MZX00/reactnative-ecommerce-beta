import {
  StyleSheet,
  View,
  Text,
  Keyboard,
  Pressable,
  Image,
} from "react-native";
import Footer from "../components/Footer";
import LargeBlackButton from "../components/LargeBlackButton";
import CustomTextInput from "../components/CustomTextInput";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  background,
  black,
  blue,
  marginVertical,
  smallFontSize,
  textBlue,
} from "../utils/Constants";
import { useDispatch } from "react-redux";
import { resetReq, resetRes } from "../features/api";
import { resetV, resetValidation } from "../features/validation";
import { init } from "../features/validation";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

const Login = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [visible, setVisible] = useState(true);

  useEffect(() => {
    dispatch(resetReq());
    dispatch(resetRes());
  }, []);

  const onPress = () => {
    navigation.navigate("ForgotPassword");
  };

  const keyboardShowListener = Keyboard.addListener("keyboardDidShow", () => {
    setVisible(false);
  });
  const keyboardHideListener = Keyboard.addListener("keyboardDidHide", () => {
    setVisible(true);
  });

  return (
    <Pressable
      style={styles.container}
      onPressIn={Keyboard.dismiss}
      accessible={false}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require("../../assets/images/icon2.png")}
            style={styles.icon}
          />
          <Text style={styles.headText}>Exclusive Furnitures</Text>
        </View>
        <View style={styles.center}>
          <CustomTextInput
            type="email"
            placeholderText="Email"
            required={true}
          />
          <CustomTextInput
            type="password"
            placeholderText="Password"
            required={true}
          />
        </View>
        <LargeBlackButton btnText="LOGIN" changeTo="HomePage" fields={2} />

        {visible && (
          <Text onPress={onPress} style={styles.link}>
            Forgot your password?
          </Text>
        )}
        {visible && <Footer content="Don't have an account? " link="Sign Up" />}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
    backgroundColor: background,
  },
  header: {
    alignItems: "center",
    justifyContent: "flex-end",
    height: 250,
  },
  headText: {
    fontSize: 18,
    color: blue,
    fontWeight: "bold",
    paddingVertical: 10,
  },
  icon: {
    height: 100,
    width: 100,
  },
  center: {
    flex: 2,
    paddingVertical: 30,
  },
  link: {
    alignSelf: "center",
    fontSize: smallFontSize,
    marginVertical: marginVertical,
    textDecorationLine: "underline",
    color: textBlue,
    flex: 1.5,
  },
});

export default Login;
