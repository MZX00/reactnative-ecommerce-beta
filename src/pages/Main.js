// Libraries
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

// Pages
import AddAddress from "./AddAddress";
import AddNewCard from "./AddNewCard";
import AddProduct from "./AddProduct";
import Checkout from "./Checkout";
import ChangePassword from "./ChangePassword";
import ContinueShopping from "./ContinueShopping";
import DeleteAccount from "./DeleteAccount";
import ForgotPassword from "./ForgotPassword";
import HomePage from "./HomePage";
import Login from "./Login";
import PaymentMethods from "./PaymentMethods";
import ShippingAddress from "./ShippingAddress";
import Signup from "./Signup";
import ViewProduct from "./ViewProduct";
import OrderPanel from "./OrderPanel";
import OrderDetails from "./OrderDetails";
import MyProfile from "./MyProfile";
import UserSettings from "./UserSettings";
import Categories from "./Categories";

import Cart from "./Cart";

const Stack = createStackNavigator();

const Main = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
            gestureEnabled: false,
            gestureDirection: "horizontal",
            ...TransitionPresets.SlideFromRightIOS,
          }}
        >
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="HomePage" component={HomePage} />
          <Stack.Screen name="DeleteAccount" component={DeleteAccount} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} />
          <Stack.Screen name="AddProduct" component={AddProduct} />
          <Stack.Screen name="ViewProduct" component={ViewProduct} />
          <Stack.Screen name="Checkout" component={Checkout} />
          <Stack.Screen name="PaymentMethods" component={PaymentMethods} />
          <Stack.Screen name="AddAddress" component={AddAddress} />
          <Stack.Screen name="AddNewCard" component={AddNewCard} />
          <Stack.Screen name="ContinueShopping" component={ContinueShopping} />
          <Stack.Screen name="ShippingAddress" component={ShippingAddress} />
          <Stack.Screen name="Cart" component={Cart}></Stack.Screen>
          <Stack.Screen name="OrderPanel" component={OrderPanel}></Stack.Screen>
          <Stack.Screen name="Categories" component={Categories}></Stack.Screen>
          <Stack.Screen
            name="OrderDetails"
            component={OrderDetails}
          ></Stack.Screen>
          <Stack.Screen name="MyProfile" component={MyProfile}></Stack.Screen>
          <Stack.Screen
            name="UserSettings"
            component={UserSettings}
          ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default Main;
