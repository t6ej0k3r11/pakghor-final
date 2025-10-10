import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";

// ✅ Fix import for local image (React Native doesn’t use import)
const logo = require("../assets/logo.jpg");

const LoginScreen: React.FC = () => {
  const { width } = Dimensions.get("window");
  const isLargeScreen = width > 400;

  const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fffbe6",
      paddingHorizontal: width * 0.05,
    },
    card: {
      backgroundColor: "#fff",
      padding: isLargeScreen ? 30 : 24,
      borderRadius: 16,
      width: "90%",
      maxWidth: 400,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 20,
      elevation: 5,
      alignItems: "center",
    },
    logo: {
      width: isLargeScreen ? 90 : 80,
      height: isLargeScreen ? 90 : 80,
      borderRadius: isLargeScreen ? 45 : 40,
      marginBottom: 20,
    },
    title: {
      fontSize: isLargeScreen ? 26 : 22,
      fontWeight: "600",
      color: "#333",
      marginBottom: 30,
    },
    input: {
      width: "100%",
      paddingVertical: 14,
      paddingHorizontal: 18,
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 10,
      marginBottom: 15,
      fontSize: isLargeScreen ? 18 : 16,
    },
    loginBtn: {
      backgroundColor: "#ff7e5f",
      width: "100%",
      paddingVertical: 16,
      borderRadius: 10,
      alignItems: "center",
      marginTop: 10,
    },
    loginBtnText: {
      color: "#fff",
      fontWeight: "700",
      fontSize: isLargeScreen ? 18 : 16,
    },
    signupBtn: {
      backgroundColor: "#f4f4f4",
      width: "100%",
      paddingVertical: 16,
      borderRadius: 10,
      alignItems: "center",
      marginTop: 12,
    },
    signupBtnText: {
      color: "#333",
      fontWeight: "600",
      fontSize: isLargeScreen ? 16 : 14,
    },
    message: {
      marginTop: 20,
      fontSize: isLargeScreen ? 16 : 14,
      color: "#555",
    },
  });

  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation<any>();
  const { login } = useAuth();
  const [msg, setMsg] = useState("");

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const handleLogin = async () => {
    if (!usernameOrEmail || !password) {
      setMsg("⚠️ Please enter both username/email and password");
      return;
    }

    try {
      const res = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usernameOrEmail, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMsg("✅ Login successful!");
        // Store auth data
        await login(data.token, data);

        setUsernameOrEmail("");
        setPassword("");

        setTimeout(() => {
          if (data.username && data.username.startsWith("a-")) {
            navigation.navigate("AdminPanel");
          } else {
            navigation.navigate("Home");
          }
        }, 1000);
      } else {
        setMsg(data.error || "❌ Invalid credentials");
      }
    } catch (err) {
      setMsg("⚠️ Server error, please try again later.");
    }
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.card}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Image source={logo} style={styles.logo} />
        </TouchableOpacity>

        <Text style={styles.title}>Welcome Back 👋</Text>

        <TextInput
          placeholder="Username or Email"
          value={usernameOrEmail}
          onChangeText={setUsernameOrEmail}
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />

        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginBtnText}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signupBtn}
          onPress={() => navigation.navigate("Signup")}
        >
          <Text style={styles.signupBtnText}>Create Account</Text>
        </TouchableOpacity>

        {msg ? <Text style={styles.message}>{msg}</Text> : null}
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
