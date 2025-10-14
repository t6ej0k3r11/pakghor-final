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

  const [username, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPass] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const handleSignup = async () => {
    if (!username || !email || !mobile || !password) {
      setMsg("⚠️ Please fill all fields");
      return;
    }

    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff9f7" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.box}>
            {/* Logo clickable */}
            <TouchableOpacity
              onPress={() => navigation.navigate("LandingPage" as never)}
            >
              <Image
                source={require("../assets/logo.jpg")}
                style={styles.logo}
                resizeMode="cover"
              />
            </TouchableOpacity>

            <Text style={styles.title}>Create Your PakGhor Account</Text>

            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor="#888"
              value={username}
              onChangeText={setUser}
            />

            <TextInput
              style={styles.input}
              placeholder="Email Address"
              keyboardType="email-address"
              placeholderTextColor="#888"
              value={email}
              onChangeText={setEmail}
            />

            <TextInput
              style={styles.input}
              placeholder="Mobile Number"
              keyboardType="phone-pad"
              placeholderTextColor="#888"
              value={mobile}
              onChangeText={setMobile}
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              placeholderTextColor="#888"
              value={password}
              onChangeText={setPass}
            />

            {/* Gradient Signup Button */}
            <TouchableOpacity
              onPress={handleSignup}
              activeOpacity={0.9}
              style={{ width: "100%" }}
            >
              <LinearGradient
                colors={["#f7e169", "#ff7e5f"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[
                  styles.signupBtn,
                  { paddingVertical: isLargeScreen ? 16 : 14 },
                ]}
              >
                <Text style={styles.signupText}>
                  {loading ? "Creating Account..." : "Sign Up"}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Secondary Button */}
            <TouchableOpacity
              style={styles.loginBtn}
              onPress={() => navigation.navigate("Login" as never)}
            >
              <Text style={styles.loginText}>
                Already have an account? Log In
              </Text>
            </TouchableOpacity>

            {msg ? <Text style={styles.msg}>{msg}</Text> : null}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  box: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 6,
    alignItems: "center",
  },
  logo: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ffcc99",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#333",
    backgroundColor: "#fff9f7",
    marginBottom: 15,
  },
  signupBtn: {
    width: "100%",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  signupText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  loginBtn: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ff7e5f",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  loginText: {
    color: "#ff7e5f",
    fontSize: 16,
    fontWeight: "600",
  },
  msg: {
    marginTop: 20,
    fontSize: 15,
    fontWeight: "500",
    color: "#28a745",
    textAlign: "center",
  },
});

export default Signup;
