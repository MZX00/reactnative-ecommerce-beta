import { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import HomePageMenu from "../components/HomePageMenu";
import ProfileComponent from "../components/ProfileComponent";
import { background, grey } from "../utils/Constants";
import api from "../utils/Api";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";

const MyProfile = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [orders, setOrders] = useState(0);
  const [addresses, setAddresses] = useState(0);
  const [loading, setLoading] = useState(false);

  const token = useSelector((state) => state.user.token);
  const admin = useSelector((state) => state.user.admin);
  const payment = useSelector((state) => state.checkout.payment);

  const Shimmer = createShimmerPlaceholder(LinearGradient);

  const loadData = async () => {
    //loading data on page load
    setLoading(true);
    const result = await api("user/view", "post", { token: token });
    if (result && result.body) {
      setName(result.body.name);
      setEmail(result.body.email);
      setAddresses(result.body.addresses);
      setOrders(result.body.orders);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

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
          <Shimmer visible={!loading} shimmerStyle={styles.space}>
            <Text style={styles.name}>{name}</Text>
          </Shimmer>
          <Shimmer visible={!loading} width={100}>
            <Text style={styles.email}>{email}</Text>
          </Shimmer>
        </View>
      </View>

      <View style={styles.scrollContainer}>
        <ScrollView style={{ flex: 1 }}>
          {!admin && (
            <View>
              <ProfileComponent
                mainText="My Orders"
                secText={`You have ${orders === 0 ? "" : orders} orders`}
                goTo="OrderPanel"
              />
              <ProfileComponent
                mainText="Shipping Addresses"
                secText={`${addresses === 0 ? "" : addresses} addresses`}
                goTo="ShippingAddress"
              />
              <ProfileComponent
                mainText="Payment Methods"
                secText={
                  payment === "cod"
                    ? "Cash on Delivery"
                    : "**** **** **** " + payment.substring(payment.length - 4)
                }
                goTo="PaymentMethods"
              />
            </View>
          )}
          {admin && (
            <View>
              <ProfileComponent
                mainText="Add Product"
                secText="Create a new product listing"
                goTo="AddProduct"
              />
            </View>
          )}
          <ProfileComponent
            mainText="Settings"
            secText="Password, Delete account"
            goTo="UserSettings"
          />

          <View style={styles.line}></View>
          <ProfileComponent mainText="Logout" log={true} />
        </ScrollView>
      </View>
      <HomePageMenu profilePage={true} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: background,
    flex: 1,
  },
  scrollContainer: {
    marginTop: "2%",
    alignSelf: "center",
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
  },
  email: {
    fontSize: 14,
    color: "#9B9B9B",
  },
  line: {
    borderTopColor: "grey",
    borderTopWidth: 0.5,
    width: "87%",
    elevation: 2,
    marginVertical: 10,
    alignSelf: "center",
    justifyContent: "center",
  },
  nameContainer: {
    marginLeft: 20,
  },
  space: {
    marginBottom: 5,
  },
});

export default MyProfile;
