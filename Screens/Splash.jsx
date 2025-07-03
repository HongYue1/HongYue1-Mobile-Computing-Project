import React, { useEffect } from "react";
import { View, Text, ActivityIndicator, Image, StyleSheet, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../Context/UserContext";
import { MyColor } from "../Utils/MyColors";

const APP_NAME = "HH-NG";
const LOGO = require("../assets/logo.png");

const Splash = () => {
  const navigation = useNavigation();
  const { user, loading } = useUser();

  useEffect(() => {
    if (!loading) {
      const timeout = setTimeout(() => {
        if (user && user.isAuthenticated) {
          navigation.replace("MainApp");
        } else {
          navigation.replace("Login");
        }
      }, 2000); // 2 seconds
      return () => clearTimeout(timeout);
    }
  }, [user, loading]);

  return (
    <View style={styles.container}>
      <View style={styles.logoWrapper}>
        <Image
          source={LOGO}
          style={styles.logo}
          accessibilityLabel="App logo"
        />
        <Text style={styles.appName}>HarvestHub</Text>
      </View>
      <ActivityIndicator size="large" color={MyColor.primary} style={{ marginTop: 32 }} />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MyColor.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
  logoWrapper: {
    alignItems: "center",
    marginBottom: 16,
  },
  logo: {
    width: 110,
    height: 110,
    resizeMode: "contain",
    marginBottom: 12,
    tintColor: Platform.OS === "android" ? MyColor.primary : undefined,
  },
  appName: {
    fontFamily:"pacifico",
    fontSize: 36,
    color: MyColor.primary,
    letterSpacing: 2,
    marginBottom: 4,
  },
  loadingText: {
    marginTop: 16,
    fontFamily: "LatoRegular",
    fontSize: 16,
    color: MyColor.neutral,
    textAlign: "center",
  },
});

export default Splash;
