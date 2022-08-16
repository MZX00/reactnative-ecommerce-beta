import { StyleSheet, View } from "react-native";
import CartList from "../components/CartList";
import Header from "../components/Header";
import TotalAmmountLabel from "../components/TotalAmmountLabel";
import LargeBlackButton from "../components/LargeBlackButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { background } from "../utils/Constants";

const Cart = () => {
  const empty = useSelector((state) => state.cart.items.length === 0);
  return (
    <SafeAreaView style={styles.container}>
      <Header flex={0} content="My Cart" back={true}></Header>
      <CartList></CartList>
      {!empty && <TotalAmmountLabel></TotalAmmountLabel>}
      {!empty && (
        <LargeBlackButton
          btnText="Checkout"
          changeTo="Checkout"
          flex={0}
        ></LargeBlackButton>
      )}

      <View style={styles.bottomBuffer}></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: background,
  },
  bottomBuffer: {
    padding: 5,
  },
});

export default Cart;
