import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { blue, foreground, textBlue } from "../utils/Constants";

const ShippingAddressCard = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.line1}>
        <Text style={styles.name}>John Doe</Text>
        <Text
          style={styles.change}
          onPress={() => {
            navigation.navigate("ShippingAddress");
          }}
        >
          Change
        </Text>
      </View>
      <View>
        <Text>3 NewBridge Court</Text>
      </View>
      <View>
        <Text>Chino Hills, CA 91709, United States</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 15,
    borderRadius: 0,
    backgroundColor: foreground,
    borderRadius: 5,
    elevation: 5,
  },
  line1: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  name: {},
  change: {
    color: textBlue,
    fontSize: 16,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  line2: {},
  line3: {},
});

export default ShippingAddressCard;
