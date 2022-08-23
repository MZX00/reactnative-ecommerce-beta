import { Pressable, StyleSheet, View } from "react-native";
import HomeOutline from "../../assets/svgs/HomeOutline";
import HomeFilled from "../../assets/svgs/HomeFilled";
import ProfileFilled from "../../assets/svgs/ProfileFilled";
import ProfileOutline from "../../assets/svgs/ProfileOutline";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import Document from "../../assets/svgs/Document";
import DocumentFilled from "../../assets/svgs/DocumentFilled";
import { foreground } from "../utils/Constants";
import CartFilled from "../../assets/svgs/CartFilled";
import CartOutline from "../../assets/svgs/CartOutline";
import CategoriesFilled from "../../assets/svgs/CategoriesFilled";
import CategoriesOutline from "../../assets/svgs/CategoriesOutline";

const HomePageMenu = ({
  cartPage = false,
  homeP = false,
  profilePage = false,
  categoriesPage = false,
}) => {
  const navigation = useNavigation();
  const admin = useSelector((state) => state.user.admin);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Pressable
          style={styles.component}
          onPress={() => {
            if (!homeP) {
              navigation.navigate("HomePage");
            }
          }}
        >
          {homeP && <HomeFilled />}
          {!homeP && <HomeOutline />}
        </Pressable>
        {!admin && (
          <Pressable
            style={styles.component}
            onPress={() => {
              navigation.navigate("Categories");
            }}
          >
            {categoriesPage && <CategoriesFilled />}
            {!categoriesPage && <CategoriesOutline />}
          </Pressable>
        )}

        {!admin && (
          <Pressable
            style={styles.component}
            onPress={() => {
              navigation.navigate("Cart");
            }}
          >
            {cartPage && <CartFilled />}
            {!cartPage && <CartOutline height={22} width={22} />}
          </Pressable>
        )}

        {admin && (
          <Pressable
            style={styles.component}
            onPress={() => {
              navigation.navigate("OrderPanel");
            }}
          >
            {cartPage && <DocumentFilled />}
            {!cartPage && <Document />}
          </Pressable>
        )}

        <Pressable
          style={styles.component}
          onPress={() => {
            navigation.navigate("MyProfile");
          }}
        >
          {profilePage && <ProfileFilled />}
          {!profilePage && <ProfileOutline />}
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  component: {
    flex: 1,
    alignItems: "center",
  },
  card: {
    justifyContent: "space-evenly",
    width: "100%",
    backgroundColor: foreground,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    height: 50,
  },
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    position: "absolute",
    bottom: 0,
  },
});

export default HomePageMenu;
