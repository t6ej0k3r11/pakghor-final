import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const AddCard: React.FC = () => {
  const { width } = Dimensions.get("window");
  const isLargeScreen = width > 400;

  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: isLargeScreen ? 50 : 40,
      paddingHorizontal: width * 0.05,
      backgroundColor: "#f8f9fa",
    },
    box: {
      width: "95%",
      maxWidth: 450,
      backgroundColor: "#fff",
      padding: isLargeScreen ? 25 : 20,
      borderRadius: 12,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.1,
      shadowRadius: 25,
      elevation: 5,
    },
    title: {
      textAlign: "center",
      fontSize: isLargeScreen ? 26 : 22,
      fontWeight: "700",
      marginBottom: 20,
      color: "#333",
    },
    input: {
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 8,
      paddingHorizontal: 14,
      paddingVertical: 12,
      fontSize: isLargeScreen ? 18 : 16,
      marginBottom: 15,
    },
    button: {
      backgroundColor: "#007bff",
      paddingVertical: 14,
      borderRadius: 8,
      marginTop: 15,
    },
    buttonText: {
      color: "#fff",
      fontWeight: "600",
      fontSize: isLargeScreen ? 18 : 16,
      textAlign: "center",
    },
  });

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    body: "",
    image: "",
    indicator: "",
  });

  const handleChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const handleSubmit = async () => {
    try {
      await fetch(`${apiUrl}/cards`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      Alert.alert("✅ Card added successfully!");
      setForm({ title: "", subtitle: "", body: "", image: "", indicator: "" });
    } catch (err) {
      Alert.alert("❌ Error adding card");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavBar
        brandName="PakGhor"
        navItems={["Home", "About", "Services", "Contact"]}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.box}>
          <Text style={styles.title}>Add New Card</Text>

          <TextInput
            style={styles.input}
            placeholder="Title"
            value={form.title}
            onChangeText={(text) => handleChange("title", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Subtitle"
            value={form.subtitle}
            onChangeText={(text) => handleChange("subtitle", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Body"
            value={form.body}
            onChangeText={(text) => handleChange("body", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Image URL"
            value={form.image}
            onChangeText={(text) => handleChange("image", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Price / Indicator"
            value={form.indicator}
            onChangeText={(text) => handleChange("indicator", text)}
          />

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Create Card</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Footer />
    </SafeAreaView>
  );
};

export default AddCard;
