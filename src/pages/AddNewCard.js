import { useState } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import CustomTextInput from "../components/CustomTextInput";
import Header from "../components/Header";
import LargeBlackButton from "../components/LargeBlackButton";
import { background } from "../utils/Constants";
import BlueTexture from "../../assets/svgs/BlueTexture";
import PaymentCard from "../components/PaymentCard";
import ProfileFilled from "../../assets/svgs/ProfileFilled";
import CreditCardIcon from "../../assets/svgs/CreditCardIcon";
import Calander from "../../assets/svgs/Calander";
import Lock from "../../assets/svgs/Lock";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

const DATA = {
  id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
  type: "mastercard",
  cardNumber: "5134620098662680",
  name: "John Doe 0",
  expDate: "07/27",
};

const AddNewCard = () => {
  const [checked, setChecked] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Mastercard", value: "mastercard" },
    { label: "Visa", value: "visa" },
  ]);

  const [name, setName] = useState("Matilda Brown");
  const [cardNumber, setCardNumber] = useState("090078601");
  const [expDate, setExpDate] = useState("06/25");

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView>
        <Header content="Add New Card" back={true} />

        <View style={styles.textureBuffer}>
          <BlueTexture height={275} width={400} />
        </View>
        <View style={styles.cardBuffer}>
          <PaymentCard
            item={DATA}
            backgroundColor={{ backgroundColor: "#00086D" }}
            def={false}
            selectedId={DATA.selectedId}
          />
        </View>

        <View style={styles.inputBuffer}>
          <CustomTextInput
            type="name"
            placeholderText="Card Holder"
            required={true}
            Icon={ProfileFilled}
          />

          <CustomTextInput
            type="number"
            placeholderText="Card number"
            required={true}
            Icon={CreditCardIcon}
          />

          <View style={styles.row}>
            <CustomTextInput
              type="Name"
              placeholderText="Expiry Date"
              required={true}
              Icon={Calander}
            />

            <CustomTextInput
              type="number"
              placeholderText="CCV"
              required={true}
              Icon={Lock}
            />
          </View>
        </View>
        <LargeBlackButton btnText="ADD CARD" changeTo="Checkout" />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: background,
  },
  textureBuffer: {
    alignItems: "center",
  },
  cardBuffer: {
    width: 375,
    position: "absolute",
    top: 90,
    left: 10,
  },
  inputBuffer: {
    flex: 0.7,
    marginBottom: 30,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    flex: 1,
  },
});

export default AddNewCard;
