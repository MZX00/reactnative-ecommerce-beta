import {
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
  SafeAreaView,
} from "react-native";

import PaymentCard from "../components/PaymentCard";
import Header from "../components/Header";
import Add from "../../assets/svgs/Add";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setPayment } from "../features/checkout";
import { background } from "../utils/Constants";
import { useEffect, useState } from "react";
import api from "../utils/Api";
import CheckBox from "../components/CheckBox";

const PaymentMethods = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
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

  const [data, setData] = useState();

  const checkCash = () => {
    dispatch(setPayment("cod"));
  };

  useEffect(async () => {
    const result = await api("user/card/view", "post", { token });
    setData(result.body.cards);
  }, []);

  const rItem = ({ item }) => {
    const backgroundColor =
      item.cardNumber === selectedId ? "#00086D" : "#ACA4FE";

    const checkCard = () => {
      dispatch(setPayment(item.cardNumber));
    };

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
    <SafeAreaView style={styles.container}>
      <Header content="Payment methods" back={true} />
      <View style={styles.cashStyle}>
        <CheckBox
          label={"Cash on Delivery"}
          selected={selectedId == null}
          onPress={checkCash}
        ></CheckBox>
      </View>

      <View>
        <FlatList
          contentContainerStyle={styles.contentContainer}
          data={data}
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
    </SafeAreaView>
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
    paddingBottom: 150,
  },
});

export default PaymentMethods;
