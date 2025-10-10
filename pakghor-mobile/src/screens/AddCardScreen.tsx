import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  StyleSheet,
} from "react-native";

const AddCard: React.FC = () => {
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

  const apiUrl = "YOUR_API_URL_HERE"; // replace with your actual API URL

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
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
    backgroundColor: "#f8f9fa",
  },
  box: {
    width: "90%",
    maxWidth: 450,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 25,
    elevation: 5,
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 15,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 6,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
    textAlign: "center",
  },
});

export default AddCard;
