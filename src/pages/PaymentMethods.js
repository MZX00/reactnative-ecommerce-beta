import {
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
  Text,
} from "react-native";
import React from "react";
import PaymentCard from "../components/PaymentCard";
import Header from "../components/Header";
import Add from "../../assets/svgs/Add";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setPayment } from "../features/checkout";
import { background } from "../utils/Constants";
import { useState } from "react";
import api from "../utils/Api";
import CheckBox from "../components/CheckBox";
import ShimmerPayment from "../components/Shimmers/ShimmerPayment";
import EmptyPayment from "../../assets/svgs/EmptyStates/EmptyPayment";

const PaymentMethods = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const selectedId = useSelector((state) => {
    if (state.checkout.payment === "cod") {
      return null;
    } else {
      return state.checkout.payment;
    }
  });

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const checkCash = () => {
    dispatch(setPayment("cod"));
  };

  const loadData = async () => {
    setLoading(true);
    const result = await api("user/card/view", "post", { token });
    if (result) {
      setData(result.body.cards);
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [])
  );

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
    <View style={styles.container}>
      <Header content="Payment methods" back={true} />
      <View style={styles.cashStyle}>
        <CheckBox
          label={"Cash on Delivery"}
          selected={selectedId == null}
          onPress={checkCash}
          disabled={loading}
        ></CheckBox>
      </View>

      <View>
        {loading ? (
          <ShimmerPayment />
        ) : (
          <View>
            {data.length === 0 ? (
              <View style={styles.empty}>
                <EmptyPayment />
                <Text style={styles.emptyText}>No cards found.</Text>
                <Text>Click the button to add a new card as payment.</Text>
              </View>
            ) : (
              <FlatList
                contentContainerStyle={styles.contentContainer}
                data={data}
                renderItem={rItem}
                extraData={selectedId}
              />
            )}
          </View>
        )}
      </View>

      <TouchableOpacity
        style={styles.add}
        activeOpacity={0.5}
        onPress={() => {
          navigation.navigate("AddNewCard", { isNewCard: true });
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
    paddingBottom: 150,
  },
  empty: {
    alignItems: "center",
    justifyContent: "center",
    height: "90%",
  },
  emptyText: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
  },
});

export default PaymentMethods;
