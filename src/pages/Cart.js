import { StyleSheet, View } from "react-native";
import CartList from "../components/CartList";
import Header from "../components/Header";
import TotalAmmountLabel from "../components/TotalAmmountLabel";
import LargeBlackButton from "../components/LargeBlackButton";
import { useSelector } from "react-redux";
import { background } from "../utils/Constants";
import HomePageMenu from "../components/HomePageMenu";

const Cart = () => {
  const empty = useSelector((state) => state.cart.items.length === 0);
  return (
    <View style={styles.container}>
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
      <HomePageMenu cartPage={true} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: background,
  },
  bottomBuffer: {
    padding: 30,
  },
});

export default Cart;
