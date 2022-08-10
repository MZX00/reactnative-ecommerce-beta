import { StyleSheet, View, Text } from "react-native";
import Chip from "../components/Chip";

const CartAdmin = () => {
  return (
    <View style={styles.container}>
      <Chip text={"text 1"} />
      <Chip text={"text 2"} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginLeft: 20,
    flexDirection: "row",
  },
});

export default CartAdmin;
