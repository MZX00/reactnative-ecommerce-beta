import { Pressable, StyleSheet, View } from "react-native";
import Home from "../../assets/svgs/Home";
import Profile from "../../assets/svgs/Profile";
import { useNavigation, CommonActions } from "@react-navigation/native";
import Cart from "../../assets/svgs/Cart";
import Logout from "../../assets/svgs/Logout";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/user";
import { clearCart } from "../features/cart";
import { init } from "../features/validation";
import Document from "../../assets/svgs/Document";

const HomePageMenu = () => {
  const navigation = useNavigation();
  const admin = useSelector((state) => state.user.admin);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Pressable
          style={styles.component}
          onPress={() => {
            navigation.navigate("HomePage");
          }}
        >
          <Home />
        </Pressable>
        <Pressable
          style={styles.component}
          onPress={() => {
            navigation.navigate("UserPanel");
          }}
        >
          <Profile />
        </Pressable>
        {!admin && (
          <Pressable
            style={styles.component}
            onPress={() => {
              navigation.navigate("Cart");
            }}
          >
            <Cart height={22} width={22} />
          </Pressable>
        )}

        {admin && (
          <Pressable
            style={styles.component}
            onPress={() => {
              navigation.navigate("CartAdmin");
            }}
          >
            <Document />
            <Cart height={22} width={22} />
          </Pressable>
        )}
        <Pressable
          style={styles.component}
          onPress={() => {
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
          }}
        >
          <Logout />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  component: {
    justifyContent: "center",
  },
  card: {
    justifyContent: "space-evenly",
    width: "100%",
    backgroundColor: "#F5F8FA",
    // backgroundColor: "red",
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    elevation: 2,
  },
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    // backgroundColor: "blue",
    position: "absolute",
    bottom: 0,
  },
});

export default HomePageMenu;
