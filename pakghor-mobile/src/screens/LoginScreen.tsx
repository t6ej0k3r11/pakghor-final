import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";

const logo = require("../assets/logo.jpg");

const LoginScreen: React.FC = () => {
  const { width } = Dimensions.get("window");
  const isLargeScreen = width > 400;

  const navigation = useNavigation<any>();
  const { login } = useAuth();

  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
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
    } catch {
      setMsg("⚠️ Server error, please try again later.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.card}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate("LandingPage")}
            >
              <Image source={logo} style={styles.logo} />
            </TouchableOpacity>

            <Text style={styles.title}>Welcome to PakGhor</Text>

            <TextInput
              placeholder="Username or Email"
              value={usernameOrEmail}
              onChangeText={setUsernameOrEmail}
              style={styles.input}
              placeholderTextColor="#888"
              autoCapitalize="none"
            />

            <TextInput
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              placeholderTextColor="#888"
            />

            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.loginBtn}
              onPress={handleLogin}
            >
              <Text style={styles.loginBtnText}>Log In</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.signupBtn}
              onPress={() => navigation.navigate("Signup")}
            >
              <Text style={styles.signupBtnText}>Create New Account</Text>
            </TouchableOpacity>

            {msg ? <Text style={styles.message}>{msg}</Text> : null}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get("window");
const isLargeScreen = width > 400;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fffaf3",
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: isLargeScreen ? 32 : 26,
    width: "90%",
    maxWidth: 420,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
    alignItems: "center",
  },
  logo: {
    width: isLargeScreen ? 100 : 85,
    height: isLargeScreen ? 100 : 85,
    borderRadius: 50,
    marginBottom: 18,
  },
  title: {
    fontSize: isLargeScreen ? 24 : 22,
    fontWeight: "700",
    color: "#ff7e5f",
    marginBottom: 14,
    textAlign: "center",
  },
  input: {
    width: "100%",
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    marginBottom: 15,
    fontSize: isLargeScreen ? 18 : 16,
    backgroundColor: "#fffdf9",
  },
  loginBtn: {
    width: "100%",
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: "#ff7e5f",
    shadowColor: "#ff7e5f",
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 4,
    marginTop: 10,
  },
  loginBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: isLargeScreen ? 18 : 16,
    textAlign: "center",
  },
  signupBtn: {
    width: "100%",
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: "#fff4ee",
    marginTop: 14,
  },
  signupBtnText: {
    color: "#ff7e5f",
    fontWeight: "600",
    fontSize: isLargeScreen ? 16 : 14,
    textAlign: "center",
  },
  message: {
    marginTop: 20,
    fontSize: isLargeScreen ? 16 : 14,
    color: "#444",
    textAlign: "center",
  },
});

export default LoginScreen;
