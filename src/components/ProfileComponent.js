import { CommonActions, useNavigation } from "@react-navigation/native";
import { View, StyleSheet, Text, Pressable, Alert } from "react-native";
import { useDispatch } from "react-redux";
import Forward from "../../assets/svgs/Forward";
import { foreground, grey } from "../utils/Constants";
import { logout } from "../features/user";
import { clearCart } from "../features/cart";
import { init } from "../features/validation";

const ProfileComponent = ({ mainText, secText, goTo, log = false }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const logoutFunction = () => {
    dispatch(logout());
    dispatch(clearCart());
    dispatch(init(0));
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
  };

  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        if (log) {
          Alert.alert("Log out", "Are you sure you want to log out ?", [
            { text: "Yes", onPress: () => logoutFunction() },
            { text: "No" },
          ]);
        } else {
          navigation.navigate(goTo);
        }
      }}
    >
      <View style={styles.names}>
        <Text style={styles.mainText}>{mainText}</Text>
        {secText && <Text style={styles.secText}>{secText}</Text>}
      </View>

      <View style={styles.back}>
        <Forward />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: foreground,
    marginLeft: 20,
    marginVertical: 10,
    marginRight: 20,
    elevation: 4,
    borderRadius: 10,
  },
  names: {
    margin: 20,
    elevation: 5,
  },
  mainText: {
    fontSize: 16,
  },
  secText: {
    color: grey,
    fontSize: 11,
  },
  back: {
    padding: 10,
  },
});

export default ProfileComponent;
