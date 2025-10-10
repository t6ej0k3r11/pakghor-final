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
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const Contact: React.FC = () => {
  const { width } = Dimensions.get("window");
  const isLargeScreen = width > 400;

  const styles = StyleSheet.create({
    container: {
      padding: isLargeScreen ? 25 : 20,
      backgroundColor: "#f8f9fa",
      paddingHorizontal: width * 0.05,
    },
    hero: { marginBottom: isLargeScreen ? 25 : 20, alignItems: "center" },
    heroTitle: {
      fontSize: isLargeScreen ? 32 : 28,
      fontWeight: "700",
      color: "#333",
    },
    heroSubtitle: {
      fontSize: isLargeScreen ? 18 : 16,
      color: "#666",
      textAlign: "center",
      marginTop: 10,
    },
    cardGrid: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 25,
    },
    card: {
      flex: 1,
      backgroundColor: "#f97316",
      borderRadius: 16,
      padding: isLargeScreen ? 20 : 16,
      marginHorizontal: 5,
      alignItems: "center",
    },
    iconWrapper: { marginBottom: 10 },
    cardTitle: {
      fontWeight: "700",
      color: "#fff",
      fontSize: isLargeScreen ? 18 : 16,
      marginBottom: 6,
    },
    cardBody: {
      color: "#fff",
      fontSize: isLargeScreen ? 16 : 14,
      textAlign: "center",
    },
    formWrapper: {
      backgroundColor: "#fff",
      borderRadius: 16,
      padding: isLargeScreen ? 20 : 16,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 5,
    },
    formTitle: {
      fontSize: isLargeScreen ? 24 : 20,
      fontWeight: "700",
      marginBottom: 6,
      textAlign: "center",
    },
    formSubtitle: {
      fontSize: isLargeScreen ? 16 : 14,
      color: "#666",
      marginBottom: 15,
      textAlign: "center",
    },
    input: {
      borderWidth: 1,
      borderColor: "#d1d5db",
      borderRadius: 12,
      padding: 14,
      marginBottom: 15,
      backgroundColor: "#f9fafb",
      fontSize: isLargeScreen ? 16 : 14,
    },
    submitBtn: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f97316",
      padding: 14,
      borderRadius: 12,
    },
    submitText: {
      color: "#fff",
      fontWeight: "700",
      marginLeft: 8,
      fontSize: isLargeScreen ? 16 : 14,
    },
  });

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
    console.log("Message sent:", formData);
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavBar
        brandName="PakGhor"
        navItems={["Home", "About", "Services", "Contact"]}
      />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Reach Us</Text>
          <Text style={styles.heroSubtitle}>
            We’d love to hear from you! Reach out with any questions, feedback,
            or just to say hello.
          </Text>
        </View>

        {/* Contact Cards */}
        <View style={styles.cardGrid}>
          {contactInfo.map((info, idx) => (
            <View key={idx} style={styles.card}>
              <View style={styles.iconWrapper}>{info.icon}</View>
              <Text style={styles.cardTitle}>{info.title}</Text>
              <Text style={styles.cardBody}>{info.body}</Text>
            </View>
          ))}
        </View>

        {/* Contact Form */}
        <View style={styles.formWrapper}>
          <Text style={styles.formTitle}>Send Us a Message</Text>
          <Text style={styles.formSubtitle}>
            Fill out the form below and we’ll get back to you as soon as
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

          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
            <PaperAirplaneIcon size={20} color="#fff" />
            <Text style={styles.submitText}>Send Message</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Footer />
    </SafeAreaView>
  );
};

export default Contact;
