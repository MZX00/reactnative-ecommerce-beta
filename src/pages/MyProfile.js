import { View, StyleSheet, Text, Image } from "react-native";
import Header from "../components/Header";
import ProfileComponent from "../components/ProfileComponent";

const MyProfile = () => {
  return (
    <View style={styles.container}>
      <Header content="My Profile" back={true} />
      <View style={styles.belowHeader}>
        <Image
          style={styles.profile}
          source={{
            uri: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          }}
        />
        <View style={styles.nameContainer}>
          <Text style={styles.name}>Matilda Brown</Text>
          <Text style={styles.email}>matildabrown@mail.com</Text>
        </View>
      </View>

      <ProfileComponent
        mainText="My Orders"
        secText="Already have 12 orders"
        goTo="MyOrders"
      />
      <ProfileComponent
        mainText="Shipping Addresses"
        secText="3 addresses"
        goTo="ShippingAddress"
      />
      <ProfileComponent
        mainText="Payment Methods"
        secText="Vise **34"
        goTo="PaymentMethods"
      />
      <ProfileComponent
        mainText="Settings"
        secText="Password, Delete account"
        goTo="UserSettings"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
  },
  profile: {
    borderRadius: 40,
    height: 80,
    width: 80,
    aspectRatio: 1,
  },
  belowHeader: {
    marginLeft: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    fontWeight: "bold",
    color: "#000000",
  },
  email: {
    color: "#9B9B9B",
  },
  nameContainer: {
    marginLeft: 20,
  },
});

export default MyProfile;
