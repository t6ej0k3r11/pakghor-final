import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const burgerImage = require("../assets/burger.jpg"); // Correct way for RN local images

interface CardType {
  _id: string;
  title: string;
  body: string;
  image: string;
  badge?: {
    text: string;
    filled: boolean;
  };
  indicator?: string;
  subtitle?: string;
}

const HomeScreen: React.FC = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const navigation = useNavigation<any>();
  const apiUrl = "https://pakghor-final-658f.vercel.app/api";

  useEffect(() => {
    fetch(`${apiUrl}/cards`)
      .then((res) => res.json())
      .then((data) => setCards(data))
      .catch((err) => console.error(err));
  }, []);

  const renderCard = ({ item }: { item: CardType }) => (
    <View style={styles.card}>
      {item.badge?.filled && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{item.badge.text}</Text>
        </View>
      )}
      <Image
        source={item._id === "burger" ? burgerImage : { uri: item.image }}
        style={styles.cardImage}
      />
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        {item.subtitle && (
          <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
        )}
        <Text style={styles.cardText}>{item.body}</Text>
        {item.indicator && (
          <Text style={styles.cardIndicator}>{item.indicator}</Text>
        )}
        <TouchableOpacity
          style={styles.cardButton}
          onPress={() => navigation.navigate("Product", { id: item._id })}
        >
          <MaterialIcons
            name="send"
            size={20}
            color="#fff"
            style={{ marginRight: 5 }}
          />
          <Text style={styles.cardButtonText}>Order Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Merge burger card with fetched cards
  const allCards: CardType[] = [
    {
      _id: "burger",
      title: "Juicy Burger",
      body: "Flame-grilled beef patty with melted cheddar & mozzarella, fresh veggies, caramelized onion, smoky house sauce, and a garlic-butter brioche bun.",
      image: "", // will use require above
      badge: { text: "Upcoming", filled: true },
      indicator: "180tk",
      subtitle: "Double cheese • Flame-grilled perfection",
    },
    ...cards,
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <Text style={styles.heroTitle}>
          Welcome to <Text style={styles.heroTitleGradient}>PakGhor</Text>
        </Text>
        <Text style={styles.heroSubtitle}>
          Fresh, delicious and crafted with love. Explore our latest specials
          and signature dishes.
        </Text>
      </View>

      {/* Cards Section */}
      <FlatList
        data={allCards}
        renderItem={renderCard}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.cardsGrid}
        showsVerticalScrollIndicator={false}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#fdfdfd" },
  heroSection: { alignItems: "center", marginBottom: 20 },
  heroTitle: {
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
    color: "#333",
  },
  heroTitleGradient: { color: "#ff7e5f" },
  heroSubtitle: {
    marginTop: 8,
    fontSize: 16,
    color: "#555",
    textAlign: "center",
  },
  cardsGrid: { paddingBottom: 20 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    marginBottom: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 15,
    elevation: 5,
  },
  badge: {
    position: "absolute",
    top: 15,
    left: 15,
    backgroundColor: "#ff7e5f",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 50,
    zIndex: 1,
  },
  badgeText: { color: "#fff", fontWeight: "600", fontSize: 12 },
  cardImage: { width: "100%", height: 180, resizeMode: "cover" },
  cardBody: { padding: 15, gap: 5 },
  cardTitle: { fontSize: 18, fontWeight: "700", color: "#ff7e5f" },
  cardSubtitle: { fontSize: 14, color: "#555" },
  cardText: { fontSize: 14, color: "#555" },
  cardIndicator: { fontWeight: "600", color: "#ff7e5f", marginVertical: 5 },
  cardButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ff7e5f",
    paddingVertical: 10,
    borderRadius: 12,
    marginTop: 10,
  },
  cardButtonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});

export default HomeScreen;
