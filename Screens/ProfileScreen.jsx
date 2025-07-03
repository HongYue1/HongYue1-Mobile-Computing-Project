import React, { useMemo } from "react";
import { View, Text, Image, StyleSheet, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../Context/UserContext";
import CustomButton from "../Components/CustomButton.jsx";
import { MyColor } from "../Utils/MyColors";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const AVATARS = [
  //require("../assets/People/man1.jpg"),
 // require("../assets/People/man2.jpg"),
  require("../assets/People/woman1.jpg"),
  require("../assets/People/woman2.jpg"),
];

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { user } = useUser();

  // Pick a random avatar for demo (stable per session)
  const avatar = useMemo(() => {
    // Use name hash for stable avatar selection
    const idx = user.name
      ? user.name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % AVATARS.length
      : 0;
    return AVATARS[idx];
  }, [user.name]);

  const handleLogout = async () => {
    await signOut(auth);
    navigation.replace("Login");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Image source={avatar} style={styles.avatar} accessibilityLabel="Profile avatar" />
          <Text style={styles.name}>{user.name || user.email || "User"}</Text>
          {user.username && (
            <Text style={styles.username}>@{user.username}</Text>
          )}
          <Text style={styles.role}>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</Text>
          {/* Future: Email, phone, etc. */}
          <CustomButton
            title="User Information"
            onPress={() => navigation.navigate("EditProfile")}
            style={[styles.button, styles.editButton]}
            textStyle={styles.editButtonText}
            accessibilityLabel="Edit profile"
          />
          <CustomButton
            title="My Orders"
            onPress={() => navigation.navigate("MyOrders")}
            style={styles.button}
            accessibilityLabel="View my orders"
          />
        </View>
        <CustomButton
          title="Logout"
          onPress={handleLogout}
          style={[styles.button, styles.logoutButton]}
          accessibilityLabel="Logout"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: MyColor.secondary,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: MyColor.secondary,
    padding: 24,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 32,
    alignItems: "center",
    width: "100%",
    maxWidth: 400,
    shadowColor: MyColor.shadow,
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 18,
    borderWidth: 3,
    borderColor: MyColor.primary,
    backgroundColor: MyColor.neutral2,
  },
  name: {
    fontFamily: "LatoBold",
    fontSize: 24,
    color: MyColor.text,
    marginBottom: 6,
    textAlign: "center",
  },
  username: {
    fontFamily: "LatoRegular",
    fontSize: 16,
    color: MyColor.neutral,
    marginBottom: 6,
    textAlign: "center",
  },
  role: {
    fontFamily: "LatoRegular",
    fontSize: 16,
    color: MyColor.primary,
    marginBottom: 24,
    textAlign: "center",
  },
  button: {
    width: "100%",
    marginTop: 12,
    height: 50,
    borderRadius: 10,
  },
  editButton: {
    backgroundColor: MyColor.neutral2,
  },
  editButtonText: {
    color: MyColor.primary,
  },
  logoutButton: {
    marginTop: 32,
    backgroundColor: MyColor.error,
  },
});

export default ProfileScreen;
