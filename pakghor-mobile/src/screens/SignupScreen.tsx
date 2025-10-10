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
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const Signup = () => {
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
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdfdfd",
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 15,
    width: "85%",
    alignSelf: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  logo: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "#333",
    marginBottom: 15,
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 12,
  },
  signupBtn: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },
  signupText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  loginBtn: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },
  loginText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  msg: {
    marginTop: 15,
    fontSize: 15,
    fontWeight: "500",
    color: "#28a745",
  },
});
