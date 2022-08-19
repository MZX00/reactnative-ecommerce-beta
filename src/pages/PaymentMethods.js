import { StyleSheet, TouchableOpacity, View, FlatList } from "react-native";
import { CheckBox } from "@rneui/themed";
import PaymentCard from "../components/PaymentCard";
import Header from "../components/Header";
import Add from "../../assets/svgs/Add";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setPayment } from "../features/checkout";
import { background } from "../utils/Constants";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    type: "mastercard",
    cardNumber: "5134620098662680",
    name: "John Doe 0",
    expDate: "07/27",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    type: "mastercard",
    cardNumber: "5363807760088078",
    name: "John Doe 1",
    expDate: "04/23",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    type: "mastercard",
    cardNumber: "5238320152969409",
    name: "John Doe 2",
    expDate: "11/29",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d88",
    type: "mastercard",
    cardNumber: "5238320152961319",
    name: "John Doe 2",
    expDate: "9/25",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d99",
    type: "mastercard",
    cardNumber: "5403826459344685",
    name: "John Doe 2",
    expDate: "03/21",
  },
];

const PaymentMethods = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cashOnDelivery = useSelector(
    (state) => state.checkout.payment === "cod"
  );
  const selectedId = useSelector((state) => {
    if (state.checkout.payment === "cod") {
      return null;
    } else {
      return state.checkout.payment;
    }
  });

  const checkCash = () => {
    dispatch(setPayment("cod"));
  };

  const rItem = ({ item }) => {
    const backgroundColor =
      item.cardNumber === selectedId ? "#00086D" : "#ACA4FE";

    const checkCard = () => {
      dispatch(setPayment(item.cardNumber));
    };

    console.log(item);

    return (
      <PaymentCard
        item={item}
        onPress={checkCard}
        backgroundColor={{ backgroundColor }}
        selectedId={selectedId}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Header content="Payment methods" back={true} />
      <View style={styles.cashStyle}>
        <CheckBox
          title="Cash on delivery"
          checked={cashOnDelivery}
          style={styles.cash}
          onPress={checkCash}
        ></CheckBox>
      </View>

      <View>
        <FlatList
          contentContainerStyle={styles.contentContainer}
          data={DATA}
          renderItem={rItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
        />
      </View>

      <TouchableOpacity
        style={styles.add}
        activeOpacity={0.5}
        onPress={() => {
          navigation.navigate("AddNewCard");
        }}
      >
        <Add width={70} height={70} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: background,
  },
  cashStyle: {
    marginLeft: 20,
  },
  add: {
    position: "absolute",
    bottom: 10,
    right: 5,
    resizeMode: "contain",
    height: 60,
  },
  cash: {
    padding: 20,
  },
  contentContainer: {
    paddingBottom: 130,
  },
});

export default PaymentMethods;
