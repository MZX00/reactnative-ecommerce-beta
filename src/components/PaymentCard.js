import { StyleSheet, Text, View } from "react-native";
import Chip from "../../assets/svgs/Chip.js";
import CheckBox from "./CheckBox";

const PaymentCard = ({
  item,
  onPress,
  backgroundColor,
  selectedId,
  def = true,
}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.card, backgroundColor]}>
        <View style={styles.chip}>
          <Chip height={40} width={40} />
        </View>
        <View style={styles.test}>
          <Text style={styles.number}>
            **** **** ****{" "}
            {item.cardNumber.substring(item.cardNumber.length - 4)}
          </Text>
          <View style={styles.cardBottom}>
            <View>
              <Text style={styles.label}>Card Holder Name</Text>
              <Text style={styles.value}>{item.holderName}</Text>
            </View>
            <View>
              <Text style={styles.label}>Expiry Date</Text>
              <Text style={styles.value}>{item.expDate}</Text>
            </View>
          </View>
        </View>
      </View>

      {def && (
        <CheckBox
          label="Use for payment"
          selected={item.cardNumber === selectedId}
          onPress={onPress}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  number: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "bold",
    marginHorizontal: 20,
  },
  label: {
    fontSize: 12,
    color: "#ffffff",
  },
  value: {
    color: "#ffffff",
    justifyContent: "flex-end",
    fontSize: 16,
    fontWeight: "bold",
  },
  chip: { padding: 20 },
  container: { flex: 1, margin: 15 },
  card: {
    borderRadius: 15,
    marginHorizontal: 20,
    marginVertical: 10,
    height: 186,
    elevation: 6,
    shadowOpacity: 0.36,
  },
});

export default PaymentCard;
