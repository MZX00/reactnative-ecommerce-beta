import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { buttonFontSize } from "../utils/Constants";

const TotalAmmountLabel = () => {
  const total = useSelector((state) => {
    return state.cart.items.reduce((sum, { price, quantity }) => {
      return sum + price * quantity;
    }, 0);
  });
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Total:</Text>
      <Text style={styles.text}>$ {total}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: "#CBD0D3",
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "stretch",
    marginHorizontal: 20,
    paddingTop: 15,
    paddingRight: 5,
  },
  text: {
    fontSize: buttonFontSize,
  },
});

export default TotalAmmountLabel;
