import { View, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import Header from "../components/Header";
import AddressCard from "../components/AddressCard";
import Add from "../../assets/svgs/Add";
import { useNavigation } from "@react-navigation/native";
import { background } from "../utils/Constants";

const ShippingAddress = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Header content="Shipping Addresses" back={true} />
      <AddressCard />
      <AddressCard />
      <AddressCard />
      <AddressCard />

      <TouchableOpacity
        style={styles.add}
        activeOpacity={0.5}
        onPress={() => {
          navigation.navigate("AddAddress");
        }}
      >
        <Add width={70} height={70} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: background,
  },
  add: {
    position: "absolute",
    bottom: 10,
    right: 5,
    resizeMode: "contain",
    height: 60,
    zIndex: 1,
  },
});

export default ShippingAddress;
