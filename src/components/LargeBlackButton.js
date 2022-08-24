import {
  StyleSheet,
  Text,
  Alert,
  View,
  Keyboard,
  Pressable,
  ActivityIndicator,
} from "react-native";
import {
  blue,
  blue50,
  buttonFontSize,
  marginHorizontal,
  marginVertical,
} from "../utils/Constants";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import api from "../utils/Api";
import { successMessages, endpoints } from "../utils/Constants";
import { resetReq, setRes } from "../features/api";
import { init, toggleError } from "../features/validation";
import { addToCart } from "../features/cart";

const LargeBlackButton = ({ changeTo, btnText, flex, cartItem, fields }) => {
  //redux
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.apiData.req);
  const isValid = useSelector((state) => {
    return state.validation.target === state.validation.valid;
  });

  const [disable, setDisable] = useState(false);

  useEffect(() => {
    if (fields && fields > -1) {
      dispatch(init(fields));
    }
  }, [fields]);

  const onPress = async () => {
    if (isValid) {
      setDisable(true);
      try {
        // api calling
        if (endpoints[btnText] && (fields || cartItem)) {
          let resp = { data: {} };
          // to call image api
          if (data.image) {
            const form = new FormData();

            form.append("name", data.name);
            form.append("price", data.price);
            form.append("image", data.image);

            data.discount && form.append("description", data.description);
            data.stock && form.append("stock", data.stock);
            data.brand && form.append("brand", data.brand);
            data.color && form.append("color", data.color);
            data.size && form.append("size", data.size);

            resp.data = await api(endpoints[btnText], "image", form);
          } else {
            resp.data = await api(endpoints[btnText], "post", data);
          }
          if (resp && resp.data.body) {
            dispatch(setRes(resp.data.body));
            dispatch(resetReq());
            let success = successMessages[btnText];
          } else {
            throw resp.data.error;
          }
        }

        // navigation
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
        } else if (btnText === "ADD TO CART" && data) {
          dispatch(addToCart(cartItem));
        } else if (data && btnText === "Edit") {
          // edit article
          navigation.navigate(changeTo, { edit: true, data });
        } else if (changeTo) {
          // for only navigation
          navigation.navigate(changeTo);
        }

        if (btnText == "Delete" && changeTo == "HomePage") dispatch(init(0));
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
          {disable ? (
            <ActivityIndicator size="large" color={blue50} />
          ) : (
            btnText
          )}
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
