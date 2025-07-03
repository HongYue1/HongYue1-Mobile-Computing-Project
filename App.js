import React from "react";
import { Platform, ScrollView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BottomTabBar as TabBar } from '@react-navigation/bottom-tabs';
import { useFontsLoader } from "./Utils/MyFonts";

// Screen imports
import Splash from "./Screens/Splash";
import Login from "./Screens/Login";
import Signup from "./Screens/Signup";
import Home from "./Screens/Home";
import MapScreen from "./Screens/MapScreen";
import Details from "./Screens/Details";
import ProfileScreen from "./Screens/ProfileScreen";
import CartScreen from "./Screens/CartScreen"; // New screen
import CheckoutScreen from "./Screens/CheckoutScreen"; // New screen
import OrderConfirmationScreen from "./Screens/OrderConfirmationScreen"; // New screen
import Shop from "./Screens/Shop";
import AuctionsList from "./Screens/AuctionsList";
import MonitorScreen from "./Screens/MonitorScreen";
import BlogList from "./Screens/BlogList";
import ControlCenter from "./Screens/ControlCenter";
import ManageProducts from "./Screens/ManageProducts";
import AuctionDetails from "./Screens/AuctionDetails";
import ProductScreen from './Screens/ProductScreen';
import BlogDetail from "./Screens/BlogDetail";
import MyOrders from "./Screens/MyOrders";
import EditProfile from "./Screens/EditProfile";

import { MyColor } from "./Utils/MyColors";
import { CartProvider, useCart } from "./Context/CartContext";
import { UserProvider, useUser } from "./Context/UserContext";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

/**
 * Bottom Tab Navigator for the main application sections
 */
function AppTabs() {
  const { cartItemCount } = useCart();
  const { user } = useUser();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: MyColor.primary,
        tabBarInactiveTintColor: MyColor.neutral,
        tabBarStyle: {
          backgroundColor: MyColor.secondary,
          borderTopWidth: Platform.OS === "ios" ? 0.3 : 0.5,
          borderTopColor: MyColor.neutral2,
        },
        tabBarLabelStyle: {
          fontFamily: "LatoRegular",
          fontSize: 12,
          marginBottom: Platform.OS === "android" ? 5 : 0,
          flexWrap: 'nowrap',
          minWidth: 80,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "HomeTab") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "ShopTab") {
            iconName = focused ? "pricetags" : "pricetags-outline";
          } else if (route.name === "AuctionsTab") {
            iconName = focused ? "cash" : "cash-outline";
          } else if (route.name === "MonitorTab") {
            iconName = focused ? "analytics" : "analytics-outline";
          } else if (route.name === "BlogTab") {
            iconName = focused ? "book" : "book-outline";
          } else if (route.name === "ManageProductsTab") {
            iconName = focused ? "construct" : "construct-outline";
          } else if (route.name === "ControlCenterTab") {
            iconName = focused ? "settings" : "settings-outline";
          } else if (route.name === "CartTab") {
            iconName = focused ? "cart" : "cart-outline";
          } else if (route.name === "ProfileTab") {
            iconName = focused ? "person-circle" : "person-circle-outline";
          }

          if (!iconName) {
            iconName = "help-circle-outline";
          }
          return (
            <Ionicons
              name={iconName}
              size={focused ? size + 4 : size + 2}
              color={focused ? MyColor.primary : MyColor.neutral}
              style={focused ? { top: -3, shadowColor: MyColor.primary, shadowOpacity: 0.3, shadowRadius: 6 } : {}}
            />
          );
        },
        tabBarScrollEnabled: true,
      })}
    >
      <Tab.Screen name="HomeTab" component={Home} options={{ tabBarLabel: "Home" }} />
      <Tab.Screen name="ShopTab" component={Shop} options={{ tabBarLabel: "Shop" }} />
      <Tab.Screen name="AuctionsTab" component={AuctionsList} options={{ tabBarLabel: "Auctions" }} />
      <Tab.Screen name="MonitorTab" component={MonitorScreen} options={{ tabBarLabel: "Monitor" }} />
      <Tab.Screen name="BlogTab" component={BlogList} options={{ tabBarLabel: "Blog" }} />
      <Tab.Screen
        name="CartTab"
        component={CartScreen}
        options={{
          tabBarLabel: "Cart",
          tabBarBadge: cartItemCount > 0 ? cartItemCount : null,
          tabBarBadgeStyle: {
            backgroundColor: MyColor.error,
            color: MyColor.primary,
            fontSize: 10,
          },
        }}
      />
      <Tab.Screen name="ProfileTab" component={ProfileScreen} options={{ tabBarLabel: "Profile" }} />
      {/* Merchant/Admin only tabs */}
      {user.role === 'merchant' || user.role === 'admin' ? (
        <Tab.Screen name="ManageProductsTab" component={ManageProducts} options={{ tabBarLabel: "Manage Products" }} />
      ) : null}
      {/* Admin only tab */}
      {user.role === 'admin' ? (
        <Tab.Screen name="ControlCenterTab" component={ControlCenter} options={{ tabBarLabel: "Control Center" }} />
      ) : null}
    </Tab.Navigator>
  );
}

const App = () => {
  const [fontsLoaded, fontsError] = useFontsLoader();

  if (!fontsLoaded) {
    // Optionally, show a blank screen or a loading indicator
    return null;
  }

  return (
    <SafeAreaProvider>
      <UserProvider>
        <CartProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Splash"
              screenOptions={{
                headerShown: false,
                navigationBarColor: MyColor.primary,
                contentStyle: { backgroundColor: MyColor.secondary },
              }}
            >
              <Stack.Screen name="Splash" component={Splash} options={{ animationEnabled: false }} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Signup" component={Signup} />
              <Stack.Screen name="MainApp" component={AppTabs} />
              <Stack.Screen name="Product" component={ProductScreen} />
              <Stack.Screen name="Checkout" component={CheckoutScreen} />
              <Stack.Screen name="OrderConfirmation" component={OrderConfirmationScreen} />
              <Stack.Screen name="AuctionDetails" component={AuctionDetails} />
              <Stack.Screen name="BlogDetail" component={BlogDetail} />
              <Stack.Screen name="MyOrders" component={MyOrders} />
              <Stack.Screen name="EditProfile" component={EditProfile} />
            </Stack.Navigator>
          </NavigationContainer>
        </CartProvider>
      </UserProvider>
    </SafeAreaProvider>
  );
};

export default App;
