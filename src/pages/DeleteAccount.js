import Header from "../components/Header";
import { View, StyleSheet } from "react-native";
import CustomTextInput from "../components/CustomTextInput";
import LargeBlackButton from "../components/LargeBlackButton";
import { background } from "../utils/Constants";

const DeleteAccount = () => {
  return (
    <View style={styles.container}>
      <Header content="Delete Account" flex={1} back={true} />
      <CustomTextInput type="password" required={true} />
      <LargeBlackButton
        changeTo="deleteAccount"
        btnText="Delete Account"
        fields={1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: background,
    justifyContent: "center",
  },
});

export default DeleteAccount;
