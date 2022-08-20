import { View, StyleSheet, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import HomePageMenu from "../components/HomePageMenu";
import ProfileComponent from "../components/ProfileComponent";
import { background } from "../utils/Constants";

const MyProfile = () => {
  const admin = useSelector((state) => state.user.admin);
  return (
    <SafeAreaView style={styles.container}>
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

      <View style={styles.scrollContainer}>
        <ScrollView style={{ flex: 1 }}>
          {!admin && (
            <View>
              <ProfileComponent
                mainText="My Orders"
                secText="Already have 12 orders"
                goTo="OrderPanel"
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
            </View>
          )}
          {
            <View>
              <ProfileComponent
                mainText="Add Product"
                secText="Create a new product listing"
                goTo="AddProduct"
              />
            </View>
          }
          <ProfileComponent
            mainText="Settings"
            secText="Password, Delete account"
            goTo="UserSettings"
          />

          {/* <ProfileComponent
            mainText="Delete Account"
            secText="Use current password to delete your account"
            goTo="DeleteAccount"
          /> */}
          <ProfileComponent mainText="Logout" log={true} />
        </ScrollView>
      </View>
      <HomePageMenu profilePage={true} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: background,
    flex: 1,
  },
  scrollContainer: {
    marginTop: "5%",
    alignSelf: "center",
    // backgroundColor: "#F1CBAE",
    width: "93%",
    flex: 1,
    marginBottom: 50,
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
