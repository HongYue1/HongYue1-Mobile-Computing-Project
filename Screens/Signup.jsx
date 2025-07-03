import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import { MyColor } from "../Utils/MyColors.js";
import CustomButton from "../Components/CustomButton.jsx";
import CustomTextInput from "../Components/CustomTextInput.jsx";
import { INPUT_MAX_LENGTHS, VALIDATION_PATTERNS } from "../Utils/Constants.js";

const Signup = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const { width } = Dimensions.get("window");

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

  const validateEmail = (text) => {
    if (!text) {
      setEmailError("Email is required");
      return false;
    }
    const isValid = VALIDATION_PATTERNS.EMAIL.test(text);
    if (!isValid) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = (text) => {
    if (!text) {
      setPasswordError("Password is required");
      return false;
    }
    const isValid = text.length >= VALIDATION_PATTERNS.PASSWORD_MIN_LENGTH;
    if (!isValid) {
      setPasswordError(
        `Password must be at least ${VALIDATION_PATTERNS.PASSWORD_MIN_LENGTH} characters`
      );
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleSignup = async () => {
    if (!validateUsername(username) | !validateEmail(email) | !validatePassword(password)) return;
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const { user } = userCredential;
      // Store username in Firestore
      await setDoc(doc(db, "users", user.uid), {
        username,
        email,
      });
    } catch (error) {
      Alert.alert("Signup Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <Image
              style={[
                styles.logo,
                { height: width * 0.25, width: width * 0.25 },
              ]}
              source={require("../assets/logo.png")}
              accessibilityLabel="Harvest Hub logo"
            />
            <View style={styles.formContainer}>
              <Text style={styles.title}>Sign Up</Text>
              <Text style={styles.subtitle}>
                Create an account to get started
              </Text>
              <CustomTextInput
                label="Username"
                value={username}
                onChangeText={(text) => {
                  setUsername(text);
                  if (usernameError) validateUsername(text);
                }}
                onBlur={() => validateUsername(username)}
                placeholder="John Doe"
                maxLength={20}
                error={usernameError}
                autoCapitalize="none"
              />
              <CustomTextInput
                label="Email"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (emailError) validateEmail(text);
                }}
                onBlur={() => validateEmail(email)}
                placeholder="example@email.com"
                keyboardType="email-address"
                maxLength={INPUT_MAX_LENGTHS.EMAIL}
                error={emailError}
                autoCapitalize="none"
              />
              <CustomTextInput
                label="Password"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (passwordError) validatePassword(text);
                }}
                onBlur={() => validatePassword(password)}
                placeholder="Enter your password"
                secureTextEntry
                maxLength={INPUT_MAX_LENGTHS.PASSWORD}
                error={passwordError}
              />
              <CustomButton
                title="Sign Up"
                onPress={handleSignup}
                loading={loading}
                style={styles.signupButton}
              />
              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Already have an account? </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Login")}
                  accessibilityLabel="Go to Login"
                >
                  <Text style={styles.loginLink}>Log In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
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
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: Platform.OS === "ios" ? 30 : 50,
    paddingBottom: 20,
  },
  logo: {
    tintColor: MyColor.primary,
    alignSelf: "center",
    resizeMode: "contain",
  },
  formContainer: {
    paddingHorizontal: 20,
    marginTop: 30,
    gap: 10,
  },
  title: {
    color: MyColor.text,
    fontFamily: "LatoBold",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "LatoRegular",
    color: MyColor.neutral,
    marginBottom: 20,
    textAlign: "center",
  },
  signupButton: {
    marginTop: 20,
    height: 60,
  },
  loginContainer: {
    flexDirection: "row",
    marginTop: 30,
    alignSelf: "center",
    justifyContent: "center",
  },
  loginText: {
    fontSize: 16,
    fontFamily: "LatoRegular",
  },
  loginLink: {
    fontSize: 16,
    color: MyColor.primary,
    fontFamily: "LatoBold",
  },
});

export default Signup;
