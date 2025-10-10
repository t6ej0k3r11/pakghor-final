import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

// ✅ Fix import for local image (React Native doesn’t use import)
const logo = require("../assets/logo.jpg");

const LoginScreen: React.FC = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation<any>();
  const [msg, setMsg] = useState("");

  // Replace with your API
  const apiUrl = "https://pakghor-final-658f.vercel.app/api";

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
        // In React Native, you can use AsyncStorage instead of sessionStorage
        // await AsyncStorage.setItem("token", data.token);

        setUsernameOrEmail("");
        setPassword("");

        setTimeout(() => {
          if (data.username && data.username.startsWith("a-")) {
            navigation.navigate("Admin");
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
    <View style={styles.wrapper}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fffbe6",
  },
  card: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 16,
    width: "85%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
    alignItems: "center",
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "#333",
    marginBottom: 24,
  },
  input: {
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16,
  },
  loginBtn: {
    backgroundColor: "#ff7e5f",
    width: "100%",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  loginBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  signupBtn: {
    backgroundColor: "#f4f4f4",
    width: "100%",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  signupBtnText: {
    color: "#333",
    fontWeight: "600",
  },
  message: {
    marginTop: 16,
    fontSize: 14,
    color: "#555",
  },
});

export default LoginScreen;
