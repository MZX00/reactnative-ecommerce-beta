import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  View,
  Keyboard,
  Pressable,
} from "react-native";
import {
  black,
  blue,
  buttonFontSize,
  marginHorizontal,
  marginVertical,
} from "../utils/Constants";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import api from "../utils/Api";
import { successMessages, endpoints } from "../utils/Constants";
import { setRes } from "../features/api";
import { init, toggleError } from "../features/validation";
import cart, { addToCart } from "../features/cart";
import { TextInput } from "react-native";

const LargeBlackButton = ({ changeTo, btnText, flex, cartItem, fields }) => {
  const [disable, setDisable] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.apiData.req);
  const isValid = useSelector((state) => {
    return state.validation.target === state.validation.valid;
  });

  useEffect(() => {
    if (fields) {
      dispatch(init(fields));
    }
  }, [fields]);

  const onPress = async () => {
    if (isValid) {
      setDisable(true);
      try {
        console.log("CART Data");
        console.log(data);
        if (endpoints[btnText] && (fields || cartItem)) {
          let resp = { data: {} };
          if (data.image) {
            const imgData = new FormData();
            imgData.append("image", data.image);

            resp.data = await api(endpoints[btnText], "post", {
              ...data,
              image: imgData,
            });
            // console.log(data);
          } else {
            resp.data = await api(endpoints[btnText], "post", data);
          }

          if (resp && resp.data.body) {
            // console.log(resp);
            dispatch(setRes(resp.data.body));
            // console.log("I IS WORK");
            let success = successMessages[btnText];
            // Alert.alert(success.title, success.message);
          } else {
            throw resp.data.error;
          }
        }
        if (changeTo == "goBack") {
          navigation.goBack();
        } else if (changeTo == "HomePage") {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                {
                  name: "HomePage",
                },
              ],
            })
          );
        } else if (changeTo == "deleteAccount") {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                {
                  name: "Login",
                },
              ],
            })
          );
        } else if (btnText === "ADD TO CART") {
          dispatch(addToCart(cartItem));
        } else if (changeTo) {
          navigation.navigate(changeTo);
        }
        dispatch(init(0));
      } catch (err) {
        dispatch(toggleError());
        console.log(err);
        if (err.title) {
          Alert.alert(err.title, err.message);
        } else {
          Alert.alert(
            "Error occured",
            "Unkown Error occured: \n" + err.message
          );
        }
      }
      setDisable(false);
    } else {
      dispatch(toggleError());
    }
  };

  return (
    <View style={[styles.container, { flex: flex }]}>
      <Pressable
        onPressIn={Keyboard.dismiss}
        disabled={disable}
        style={styles.btn}
        onPress={onPress}
      >
        <Text numberOfLines={1} adjustsFontSizeToFit={true} style={styles.text}>
          {btnText}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1.5,
    alignSelf: "stretch",
  },
  btn: {
    height: 55,
    paddingHorizontal: 10,
    elevation: 2,
    justifyContent: "center",
    marginTop: marginVertical,
    alignItems: "center",
    marginHorizontal: marginHorizontal,
    backgroundColor: blue,
    borderRadius: 30,
  },
  text: {
    fontWeight: "500",
    fontSize: buttonFontSize,
    color: "#ffffff",
  },
});

export default LargeBlackButton;
