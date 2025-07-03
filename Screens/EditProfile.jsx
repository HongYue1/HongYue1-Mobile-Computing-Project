import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "../Context/UserContext";
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import CustomTextInput from "../Components/CustomTextInput";
import CustomButton from "../Components/CustomButton";
import { MyColor } from "../Utils/MyColors";

const EditProfile = ({ navigation }) => {
  const { user, setUser } = useUser();
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [initialState, setInitialState] = useState({ username: "", phone: "", address: "" });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.uid) return;
      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUsername(data.username || "");
          setPhone(data.phone || "");
          setAddress(data.address || "");
          setInitialState({
            username: data.username || "",
            phone: data.phone || "",
            address: data.address || "",
          });
        }
      } catch (e) {
        // ignore
      }
    };
    fetchProfile();
  }, [user?.uid]);

  const validateUsername = (text) => {
    if (!text) {
      setUsernameError("Username is required");
      return false;
    }
    if (!/^[a-zA-Z0-9_]{3,20}$/.test(text)) {
      setUsernameError("3-20 chars, letters, numbers, underscores only");
      return false;
    }
    setUsernameError("");
    return true;
  };

  const validatePhone = (text) => {
    if (!text) {
      setPhoneError("");
      return true;
    }
    if (!/^\+?\d{7,15}$/.test(text)) {
      setPhoneError("Enter a valid phone number");
      return false;
    }
    setPhoneError("");
    return true;
  };

  const validateAddress = (text) => {
    setAddressError("");
    return true;
  };

  const handleSave = async () => {
    if (!validateUsername(username) | !validatePhone(phone) | !validateAddress(address)) return;
    setLoading(true);
    try {
      await setDoc(doc(db, "users", user.uid), {
        username,
        phone,
        address,
        email: user.email,
      }, { merge: true });
      setUser({ ...user, username });
      setInitialState({ username, phone, address });
      setEditing(false);
      Alert.alert("Profile Updated", "Your profile has been updated.");
    } catch (e) {
      Alert.alert("Error", "Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setUsername(initialState.username);
    setPhone(initialState.phone);
    setAddress(initialState.address);
    setEditing(false);
    setUsernameError("");
    setPhoneError("");
    setAddressError("");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>User Information</Text>
          <CustomTextInput
            label="Username"
            value={username}
            onChangeText={(text) => {
              setUsername(text);
              if (usernameError) validateUsername(text);
            }}
            onBlur={() => validateUsername(username)}
            placeholder="your_username"
            maxLength={20}
            error={usernameError}
            autoCapitalize="none"
            editable={editing}
          />
          <CustomTextInput
            label="Phone Number"
            value={phone}
            onChangeText={(text) => {
              setPhone(text);
              if (phoneError) validatePhone(text);
            }}
            onBlur={() => validatePhone(phone)}
            placeholder="e.g. +1234567890"
            keyboardType="phone-pad"
            error={phoneError}
            editable={editing}
          />
          <CustomTextInput
            label="Address"
            value={address}
            onChangeText={(text) => {
              setAddress(text);
              if (addressError) validateAddress(text);
            }}
            onBlur={() => validateAddress(address)}
            placeholder="Your address"
            error={addressError}
            editable={editing}
          />
          {editing ? (
            <View style={{ flexDirection: "row", gap: 16, marginTop: 30 }}>
              <CustomButton
                title="Save Changes"
                onPress={handleSave}
                loading={loading}
                style={[styles.saveButton, { flex: 1 }]}
              />
              <CustomButton
                title="Cancel"
                onPress={handleCancel}
                style={[styles.cancelButton, { flex: 1 }]}
              />
            </View>
          ) : (
            <CustomButton
              title="Edit"
              onPress={() => setEditing(true)}
              style={styles.editButton}
            />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: MyColor.secondary,
  },
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: MyColor.secondary,
  },
  title: {
    fontSize: 28,
    fontFamily: "LatoBold",
    color: MyColor.primary,
    marginBottom: 24,
    textAlign: "center",
  },
  saveButton: {
    height: 60,
  },
  cancelButton: {
    height: 60,
    backgroundColor: MyColor.neutral2,
  },
  editButton: {
    marginTop: 30,
    height: 60,
  },
});

export default EditProfile; 