import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const Signup = () => {
  const { width } = Dimensions.get("window");
  const isLargeScreen = width > 400;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fdfdfd",
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: width * 0.05,
    },
    box: {
      backgroundColor: "#fff",
      padding: isLargeScreen ? 30 : 25,
      borderRadius: 15,
      width: "90%",
      maxWidth: 400,
      alignSelf: "center",
      alignItems: "center",
      shadowColor: "#000",
      shadowOpacity: 0.15,
      shadowRadius: 10,
      elevation: 8,
    },
    logo: {
      width: isLargeScreen ? 100 : 90,
      height: isLargeScreen ? 100 : 90,
      borderRadius: isLargeScreen ? 50 : 45,
      marginBottom: 20,
    },
    title: {
      fontSize: isLargeScreen ? 26 : 22,
      fontWeight: "600",
      color: "#333",
      marginBottom: 20,
    },
    input: {
      width: "100%",
      backgroundColor: "#fff",
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 12,
      paddingVertical: 14,
      paddingHorizontal: 18,
      fontSize: isLargeScreen ? 18 : 16,
      marginBottom: 15,
    },
    signupBtn: {
      width: "100%",
      paddingVertical: 16,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 8,
    },
    signupText: {
      color: "#fff",
      fontSize: isLargeScreen ? 18 : 16,
      fontWeight: "600",
    },
    loginBtn: {
      width: "100%",
      paddingVertical: 16,
      borderRadius: 12,
      backgroundColor: "#333",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 15,
    },
    loginText: {
      color: "#fff",
      fontSize: isLargeScreen ? 16 : 14,
      fontWeight: "500",
    },
    msg: {
      marginTop: 20,
      fontSize: isLargeScreen ? 16 : 15,
      fontWeight: "500",
      color: "#28a745",
    },
  });

  const [username, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPass] = useState("");
  const [msg, setMsg] = useState("");
  const navigation = useNavigation();

  const apiUrl = process.env.EXPO_PUBLIC_API_URL; // equivalent to import.meta.env

  const handleSignup = async () => {
    if (!username || !email || !mobile || !password) {
      setMsg("⚠️ Please fill all fields");
      return;
    }

    try {
      await axios.post(`${apiUrl}/register`, {
        username,
        email,
        mobile,
        password,
      });

      setMsg("✅ Account created successfully!");
      setUser("");
      setEmail("");
      setMobile("");
      setPass("");

      setTimeout(() => {
        navigation.navigate("Login" as never);
      }, 1500);
    } catch (error) {
      setMsg("❌ Signup failed. Try again.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.box}>
            <Image
              source={require("../assets/logo.jpg")}
              style={styles.logo}
              resizeMode="cover"
            />

            <Text style={styles.title}>Create Account</Text>

            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={username}
              onChangeText={setUser}
            />

            <TextInput
              style={styles.input}
              placeholder="Email Address"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />

            <TextInput
              style={styles.input}
              placeholder="Mobile Number"
              keyboardType="phone-pad"
              value={mobile}
              onChangeText={setMobile}
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPass}
            />

            {/* Gradient Button */}
            <TouchableOpacity onPress={handleSignup} activeOpacity={0.9}>
              <LinearGradient
                colors={["#f7e169", "#ff7e5f"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.signupBtn}
              >
                <Text style={styles.signupText}>Sign Up</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Secondary Button */}
            <TouchableOpacity
              style={styles.loginBtn}
              onPress={() => navigation.navigate("Login" as never)}
            >
              <Text style={styles.loginText}>Log In</Text>
            </TouchableOpacity>

            {msg ? <Text style={styles.msg}>{msg}</Text> : null}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Signup;
