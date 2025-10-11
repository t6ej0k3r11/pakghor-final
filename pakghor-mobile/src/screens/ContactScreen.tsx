import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  PaperAirplaneIcon,
} from "react-native-heroicons/solid";
import { LinearGradient } from "expo-linear-gradient";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const { width } = Dimensions.get("window");
const isLargeScreen = width > 400;

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.message) {
      Alert.alert("Error", "Please fill in all fields!");
      return;
    }
    Alert.alert("✅ Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  const contactInfo = [
    {
      title: "Phone",
      body: "+880 123 456 789",
      icon: <PhoneIcon size={24} color="#fff" />,
    },
    {
      title: "Email",
      body: "pakghor@gmail.com",
      icon: <EnvelopeIcon size={24} color="#fff" />,
    },
    {
      title: "Location",
      body: "Mymensingh, Bangladesh",
      icon: <MapPinIcon size={24} color="#fff" />,
    },
  ];

  const styles = StyleSheet.create({
    container: {
      padding: isLargeScreen ? 25 : 20,
      backgroundColor: "#fff9f7",
      paddingHorizontal: width * 0.05,
    },
    hero: { marginBottom: isLargeScreen ? 25 : 20, alignItems: "center" },
    heroTitle: {
      fontSize: isLargeScreen ? 32 : 28,
      fontWeight: "800",
      color: "#333",
    },
    heroSubtitle: {
      fontSize: isLargeScreen ? 18 : 16,
      color: "#555",
      textAlign: "center",
      marginTop: 8,
      maxWidth: 350,
      lineHeight: isLargeScreen ? 24 : 22,
    },
    card: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#ff7e5f",
      borderRadius: 16,
      padding: 20,
      marginBottom: 15,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    iconWrapper: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: "#f7e169",
      justifyContent: "center",
      alignItems: "center",
      marginRight: 15,
    },
    cardText: { color: "#fff", fontWeight: "600", fontSize: 16 },
    cardSubText: { color: "#fff", fontSize: 14, marginTop: 4 },
    formWrapper: {
      backgroundColor: "#fff",
      borderRadius: 16,
      padding: isLargeScreen ? 25 : 20,
      shadowColor: "#000",
      shadowOpacity: 0.05,
      shadowRadius: 10,
      elevation: 5,
      marginTop: 10,
    },
    formTitle: {
      fontSize: isLargeScreen ? 24 : 20,
      fontWeight: "700",
      marginBottom: 8,
      textAlign: "center",
    },
    formSubtitle: {
      fontSize: isLargeScreen ? 16 : 14,
      color: "#555",
      marginBottom: 20,
      textAlign: "center",
      lineHeight: isLargeScreen ? 22 : 20,
    },
    input: {
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 12,
      padding: 14,
      marginBottom: 15,
      backgroundColor: "#fff9f7",
      fontSize: isLargeScreen ? 16 : 14,
    },
    submitBtn: {
      borderRadius: 12,
      overflow: "hidden",
      marginTop: 5,
    },
    submitBtnContent: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 14,
    },
    submitText: {
      color: "#fff",
      fontWeight: "700",
      marginLeft: 8,
      fontSize: isLargeScreen ? 16 : 14,
    },
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff9f7" }}>
      <NavBar
        brandName="PakGhor"
        navItems={["Home", "About", "Menu", "Contact"]}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Contact Us</Text>
          <Text style={styles.heroSubtitle}>
            We’d love to hear from you! Any questions, feedback, or orders, just
            reach out.
          </Text>
        </View>

        {/* Contact Cards */}
        {contactInfo.map((info, idx) => (
          <View key={idx} style={styles.card}>
            <View style={styles.iconWrapper}>{info.icon}</View>
            <View>
              <Text style={styles.cardText}>{info.title}</Text>
              <Text style={styles.cardSubText}>{info.body}</Text>
            </View>
          </View>
        ))}

        {/* Contact Form */}
        <View style={styles.formWrapper}>
          <Text style={styles.formTitle}>Send Us a Message</Text>
          <Text style={styles.formSubtitle}>
            Fill out the form below and we'll get back to you as soon as
            possible.
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Your Name"
            value={formData.name}
            onChangeText={(text) => handleChange("name", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Your Email"
            value={formData.email}
            onChangeText={(text) => handleChange("email", text)}
            keyboardType="email-address"
          />
          <TextInput
            style={[styles.input, { height: 100 }]}
            placeholder="Your Message"
            value={formData.message}
            onChangeText={(text) => handleChange("message", text)}
            multiline
          />

          <TouchableOpacity
            style={styles.submitBtn}
            onPress={handleSubmit}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={["#ff7e5f", "#f7e169"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.submitBtnContent}
            >
              <PaperAirplaneIcon size={20} color="#fff" />
              <Text style={styles.submitText}>Send Message</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Footer />
    </SafeAreaView>
  );
};

export default Contact;
