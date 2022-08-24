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

  //Password field
  useEffect(() => {
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

  const onChange = (e) => {
    setText(e.nativeEvent.text);
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
          secureTextEntry={isSecureEntry}
          onFocus={onFocus}
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
