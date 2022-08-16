import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { addToCart, removeOneFromCart } from "../features/cart";
import { blue, counterButtonSize } from "../utils/Constants";
import Minus from "../../assets/svgs//Minus";
import Plus from "../../assets/svgs//Plus";

const mult = 1.2;

const Counter = ({ count, _id, big }) => {
  const dispatch = useDispatch();
  const increment = () => {
    dispatch(addToCart({ _id }));
  };
  const decrement = () => {
    dispatch(removeOneFromCart(_id));
  };
  const size = big ? counterButtonSize * mult : counterButtonSize;
  return (
    <View style={styles.counter}>
      <TouchableOpacity
        style={big ? styles.bigCounterButton : styles.counterButton}
        onPress={decrement}
      >
        <Minus size={size} />
      </TouchableOpacity>
      <Text style={[styles.counterText, big && { fontSize: 30, width: 50 }]}>
        {count}
      </Text>
      <TouchableOpacity
        style={big ? styles.bigCounterButton : styles.counterButton}
        onPress={increment}
      >
        <Plus size={size} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  counter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "65%",
    marginLeft: 10,
  },
  counterButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: counterButtonSize / 2,
    marginHorizontal: 10,
    overflow: "hidden",
    height: counterButtonSize / 1.2,
    width: counterButtonSize / 1.2,
    backgroundColor: blue,
  },
  bigCounterButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: (counterButtonSize * mult) / 2,
    marginHorizontal: 10,
    overflow: "hidden",
    height: counterButtonSize * mult,
    width: counterButtonSize * mult,
    backgroundColor: "black",
  },
  counterText: {
    fontSize: 20,
    width: 30,
    textAlign: "center",
  },
});

export default Counter;
