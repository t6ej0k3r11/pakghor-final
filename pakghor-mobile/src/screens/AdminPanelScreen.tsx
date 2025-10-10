import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  StyleSheet,
} from "react-native";

const AdminPanel: React.FC = () => {
  const [cards, setCards] = useState<any[]>([]);
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    body: "",
    image: "",
    indicator: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  const apiUrl = "YOUR_API_URL_HERE"; // replace with your actual API URL

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const res = await fetch(`${apiUrl}/cards`);
      const data = await res.json();
      setCards(data);
    } catch (err) {
      console.log("Error fetching cards:", err);
    }
  };

  const handleSubmit = async () => {
    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId
        ? `${apiUrl}/cards/${editingId}`
        : `${apiUrl}/cards`;

      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      setForm({ title: "", subtitle: "", body: "", image: "", indicator: "" });
      setEditingId(null);
      fetchCards();
      Alert.alert("✅ Success", editingId ? "Card updated!" : "Card created!");
    } catch (err) {
      Alert.alert("❌ Error", "Something went wrong!");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`${apiUrl}/cards/${id}`, { method: "DELETE" });
      setCards(cards.filter((c) => c._id !== id));
    } catch (err) {
      Alert.alert("❌ Error", "Could not delete card!");
    }
  };

  const handleEdit = (card: any) => {
    setForm(card);
    setEditingId(card._id);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🛠 Admin Panel</Text>

      {/* Live Preview */}
      {(form.title || form.subtitle || form.body) && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Live Preview</Text>
          <View style={styles.cardPreview}>
            {form.image ? (
              <Image source={{ uri: form.image }} style={styles.previewImg} />
            ) : null}
            <View style={styles.previewText}>
              <Text style={styles.cardTitle}>{form.title || "Title"}</Text>
              {form.subtitle ? (
                <Text style={styles.subtitle}>{form.subtitle}</Text>
              ) : null}
              <Text>{form.body || "Card description will appear here."}</Text>
              {form.indicator && (
                <Text style={styles.previewIndicator}>{form.indicator}</Text>
              )}
            </View>
          </View>
        </View>
      )}

      {/* Add / Update Card */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {editingId ? "Update Card" : "Add New Card"}
        </Text>
        <View style={styles.form}>
          <TextInput
            placeholder="Title"
            value={form.title}
            onChangeText={(text) => setForm({ ...form, title: text })}
            style={styles.input}
          />
          <TextInput
            placeholder="Subtitle"
            value={form.subtitle}
            onChangeText={(text) => setForm({ ...form, subtitle: text })}
            style={styles.input}
          />
          <TextInput
            placeholder="Body"
            value={form.body}
            onChangeText={(text) => setForm({ ...form, body: text })}
            style={[styles.input, { height: 80 }]}
            multiline
          />
          <TextInput
            placeholder="Image URL"
            value={form.image}
            onChangeText={(text) => setForm({ ...form, image: text })}
            style={styles.input}
          />
          <TextInput
            placeholder="Price / Indicator"
            value={form.indicator}
            onChangeText={(text) => setForm({ ...form, indicator: text })}
            style={styles.input}
          />
          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
            <Text style={styles.submitBtnText}>
              {editingId ? "Update Card" : "Create Card"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Cards List */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>All Cards</Text>
        {cards.map((card) => (
          <View key={card._id} style={styles.cardRow}>
            {card.image ? (
              <Image source={{ uri: card.image }} style={styles.cardThumb} />
            ) : null}
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>{card.title}</Text>
              <Text style={styles.subtitle}>{card.subtitle}</Text>
              <Text>{card.indicator}</Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity
                style={[styles.actionBtn, { backgroundColor: "#f7e169" }]}
                onPress={() => handleEdit(card)}
              >
                <Text>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionBtn, { backgroundColor: "#ff7e5f" }]}
                onPress={() => handleDelete(card._id)}
              >
                <Text>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    color: "#ff7e5f",
    marginBottom: 20,
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#f7e169",
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#ff7e5f",
    paddingBottom: 3,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    marginBottom: 10,
  },
  submitBtn: {
    backgroundColor: "#f7e169",
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
  },
  submitBtnText: {
    color: "#fff",
    fontWeight: "600",
  },
  cardPreview: {
    flexDirection: "row",
    gap: 10,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    alignItems: "center",
  },
  previewImg: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  previewText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#ff7e5f",
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
  },
  previewIndicator: {
    marginTop: 4,
    backgroundColor: "#ff7e5f",
    color: "#fff",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    alignSelf: "flex-start",
    fontWeight: "600",
    fontSize: 12,
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  cardThumb: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
  },
  cardInfo: {
    flex: 1,
  },
  actions: {
    flexDirection: "row",
    gap: 5,
  },
  actionBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AdminPanel;
