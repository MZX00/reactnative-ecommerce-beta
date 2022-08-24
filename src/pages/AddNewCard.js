import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
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
import { useDispatch, useSelector } from "react-redux";
import { setReq } from "../features/api";

const DATA = {
  cardNumber: "****************",
  holderName: "Name",
  expDate: "mm/yy",
};

const AddNewCard = ({ navigation, route }) => {
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setReq({ property: "token", value: token }));
  }, []);

  return (
    <View style={styles.container}>
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
            type="holderName"
            placeholderText="Card Holder"
            required={true}
            Icon={ProfileFilled}
          />

          <CustomTextInput
            type="cardNumber"
            placeholderText="Card number"
            required={true}
            Icon={CreditCardIcon}
          />

          <View style={styles.row}>
            <CustomTextInput
              type="expDate"
              placeholderText="Expiry Date"
              required={true}
              Icon={Calander}
            />

            <CustomTextInput
              type="cv"
              placeholderText="CVV"
              required={true}
              Icon={Lock}
            />
          </View>
        </View>
        <LargeBlackButton
          btnText="ADD CARD"
          changeTo={route.params.isNewCard ? "goBack" : "Checkout"}
          fields={4}
        />
      </KeyboardAwareScrollView>
    </View>
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
    top: 125,
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
