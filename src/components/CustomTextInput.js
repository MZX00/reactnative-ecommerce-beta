import Eye from "../../assets/svgs/Eye";
import EyeSlashed from "../../assets/svgs/EyeSlashed";
import ProfileFilled from "../../assets/svgs/ProfileFilled";
import CreditCardIcon from "../../assets/svgs/CreditCardIcon";
import Calander from "../../assets/svgs/Calander";
import Lock from "../../assets/svgs/Lock";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { black, grey, marginHorizontal } from "../utils/Constants";
import validateText from "../utils/Validation";
import { setReq } from "../features/api";
import { setValid, setInvalid, toggleError } from "../features/validation";
import { useDispatch, useSelector } from "react-redux";

const CustomTextInput = ({
  required,
  type,
  placeholderText,
  Icon,
  content,
}) => {
  const [text, setText] = useState(content ? content : "");
  const [error, setError] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(content ? true : false);
  const [isSecureEntry, setIsSecureEntry] = useState(false);
  const [errorText, setErrorText] = useState("*This field is required");
  const [maxLength, setMaxLength] = useState();
  const [keypress, setKeyPress] = useState();

  const anim = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();
  const globalError = useSelector((state) => state.validation.error);

  // Label animation
  useEffect(() => {
    Animated.timing(anim, {
      toValue: isFocused ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused]);

  useEffect(() => {
    if (type === "phone") {
      setMaxLength(11);
    } else if (type === "expDate") {
      setMaxLength(5);
    } else if (type === "cv") {
      setMaxLength(3);
    } else if (type === "cardNumber") {
      setMaxLength(12);
    } else if (type === "date") {
      setMaxLength(8);
    }
    //Password field
    if (
      type &&
      (type === "password" || type === "newPassword" || type === "prevPassword")
    ) {
      setIsPassword(true);
      setIsSecureEntry(true);
    }

    if (content) {
    }
  }, []);

  // Set Global error
  useEffect(() => {
    if (globalError) {
      let result = validateText(text, type);
      setError(result[0]);
      setErrorText(result[1]);
      dispatch(toggleError());
    }
  }, [globalError]);

  const onBlur = () => {
    if (text === "") {
      setIsFocused(false);
    }

    if (required) {
      let result = validateText(text, type);
      if (type) {
        if (!result[0]) {
          dispatch(setReq({ property: type, value: text }));
        }
      }
      result[0] ? dispatch(setInvalid()) : dispatch(setValid());
      setError(result[0]);
      setErrorText(result[1]);
    } else {
      dispatch(setReq({ property: type, value: text }));
    }
  };

  const onFocus = () => {
    setIsFocused(true);
  };

  const onChange = ({ nativeEvent }) => {
    //exp date handling
    if (type === "expDate" && keypress != "Backspace") {
      if (nativeEvent.text.length === 1) {
        if (keypress > 2) {
          setText(0 + nativeEvent.text + "/");
        } else {
          setText(nativeEvent.text);
        }
      } else if (nativeEvent.text.length === 2) {
        if (keypress == 0 && nativeEvent.text.charAt(0) == "0") {
        } else if (keypress > 2 && nativeEvent.text.charAt(0) == "1") {
        } else {
          setText(nativeEvent.text + "/");
        }
      } else if (nativeEvent.text.length === 3) {
        setText(
          nativeEvent.text.substring(0, 2) +
            "/" +
            nativeEvent.text.charAt(nativeEvent.text.length - 1)
        );
      } else {
        setText(nativeEvent.text);
      }
    } else if (type === "date" && keypress != "Backspace") {
      if (nativeEvent.text.length === 1) {
        if (keypress > 4) {
          setText(0 + nativeEvent.text + "/");
        } else {
          setText(nativeEvent.text);
        }
      } else if (nativeEvent.text.length === 2) {
        if (keypress == 0 && nativeEvent.text.charAt(0) == "0") {
        } else if (keypress > 1 && nativeEvent.text.charAt(1) == "3") {
        } else {
          setText(nativeEvent.text + "/");
        }
      } else if (nativeEvent.text.length === 3) {
        if (keypress > 1) {
          setText(
            nativeEvent.text.substring(0, 2) +
              "/" +
              0 +
              nativeEvent.text.charAt(nativeEvent.text.length - 1)
          );
        } else {
          setText(
            nativeEvent.text.substring(0, 2) +
              "/" +
              nativeEvent.text.charAt(nativeEvent.text.length - 1)
          );
        }
      } else if (nativeEvent.text.length === 4) {
        if (keypress > 1) {
          setText(
            nativeEvent.text.substring(0, nativeEvent.text.length - 1) +
              0 +
              nativeEvent.text.charAt(nativeEvent.text.length - 1) +
              "/"
          );
        } else {
          setText(nativeEvent.text);
        }
      } else if (nativeEvent.text.length === 5) {
        if (keypress == 0 && nativeEvent.text.charAt(3) == "0") {
        } else if (keypress > 2 && nativeEvent.text.charAt(3) == "1") {
        } else {
          setText(nativeEvent.text + "/");
        }
      } else {
        setText(nativeEvent.text);
      }
    } else {
      setText(nativeEvent.text);
    }
  };

  const onKeyPress = ({ nativeEvent }) => {
    setKeyPress(nativeEvent.key);
  };

  return (
    <View style={[styles.container, { marginTop: isFocused ? 10 : 0 }]}>
      <Animated.Text
        style={[
          styles.placeholderText,
          {
            top: anim.interpolate({
              inputRange: [0, 1],
              outputRange: [!Icon ? 25 : 26, 0],
            }),
            left: anim.interpolate({
              inputRange: [0, 1],
              outputRange: [!Icon ? 4 : 30, 2],
            }),
            fontSize: anim.interpolate({
              inputRange: [0, 1],
              outputRange: [!Icon ? 20 : 18, 14],
            }),
            color: anim.interpolate({
              inputRange: [0, 1],
              outputRange: [grey, "black"],
            }),
          },
        ]}
      >
        {placeholderText}
      </Animated.Text>
      <View
        style={[
          styles.eyeContainer,
          Icon !== undefined && { alignItems: "stretch" },
        ]}
      >
        {Icon !== undefined && (
          <View style={[styles.icon, error && styles.inputError]}>
            <Icon color={"#97AABD"} />
          </View>
        )}
        <TextInput
          style={[
            styles.input,
            error && styles.inputError,
            !isPassword && { marginRight: marginHorizontal },
            Icon !== undefined && { marginLeft: 0 },
          ]}
          value={text}
          placeholderTextColor="#afafaf"
          onBlur={onBlur}
          onChange={onChange}
          onKeyPress={
            type === "expDate" || type === "date" ? onKeyPress : undefined
          }
          secureTextEntry={isSecureEntry}
          onFocus={onFocus}
          keyboardType={
            type === "phone" ||
            type === "date" ||
            type === "cv" ||
            type === "expDate" ||
            type === "price" ||
            type === "discount" ||
            type === "cardNumber" ||
            type === "stock"
              ? "numeric"
              : undefined
          }
          maxLength={maxLength}
        />
        {isPassword && (
          <View
            style={[
              styles.eye,
              error && styles.inputError,
              Icon !== undefined && {
                paddingVertical: 6,
                alignSelf: "flex-end",
              },
            ]}
          >
            <TouchableOpacity
              onPress={() => {
                setIsSecureEntry(!isSecureEntry);
              }}
            >
              {isSecureEntry ? <Eye /> : <EyeSlashed />}
            </TouchableOpacity>
          </View>
        )}
      </View>
      {error && <Text style={styles.error}>{errorText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 5,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
    minHeight: 30,
  },
  input: {
    flex: 1,
    color: black,
    marginLeft: marginHorizontal,
    fontSize: 16,
    paddingLeft: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: grey,
  },
  inputError: {
    borderBottomColor: "red",
  },
  placeholderText: {
    color: grey,
    marginLeft: marginHorizontal,
    alignSelf: "flex-start",
  },
  error: {
    alignSelf: "flex-start",
    color: "red",
    marginHorizontal: marginHorizontal,
  },
  eye: {
    paddingRight: 5,
    paddingVertical: 4,
    marginRight: marginHorizontal,
    borderBottomWidth: 0.5,
    borderBottomColor: grey,
  },
  eyeContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  icon: {
    marginLeft: 40,
    paddingVertical: 4,
    paddingHorizontal: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: grey,
  },
});

export default CustomTextInput;
