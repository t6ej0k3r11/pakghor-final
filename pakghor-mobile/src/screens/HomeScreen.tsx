import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  Dimensions,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Card from "../components/Card";

const burgerImage = require("../../assets/burger.jpg");

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
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const { width } = Dimensions.get("window");
  const isLargeScreen = width > 400;

  const styles = StyleSheet.create({
    container: { padding: isLargeScreen ? 25 : 20, backgroundColor: "#fdfdfd" },
    heroSection: {
      alignItems: "center",
      marginBottom: isLargeScreen ? 30 : 20,
    },
    heroTitle: {
      fontSize: isLargeScreen ? 32 : 28,
      fontWeight: "800",
      textAlign: "center",
      color: "#333",
    },
    heroTitleGradient: { color: "#ff7e5f" },
    heroSubtitle: {
      marginTop: 10,
      fontSize: isLargeScreen ? 18 : 16,
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
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 50,
      zIndex: 1,
    },
    badgeText: {
      color: "#fff",
      fontWeight: "600",
      fontSize: isLargeScreen ? 14 : 12,
    },
    cardImage: {
      width: "100%",
      height: isLargeScreen ? 200 : 180,
      resizeMode: "cover",
    },
    cardBody: { padding: isLargeScreen ? 20 : 15, gap: 5 },
    cardTitle: {
      fontSize: isLargeScreen ? 20 : 18,
      fontWeight: "700",
      color: "#ff7e5f",
    },
    cardSubtitle: { fontSize: isLargeScreen ? 16 : 14, color: "#555" },
    cardText: { fontSize: isLargeScreen ? 16 : 14, color: "#555" },
    cardIndicator: { fontWeight: "600", color: "#ff7e5f", marginVertical: 5 },
    cardButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#ff7e5f",
      paddingVertical: 12,
      borderRadius: 12,
      marginTop: 10,
    },
    cardButtonText: {
      color: "#fff",
      fontWeight: "700",
      fontSize: isLargeScreen ? 18 : 16,
    },
  });

  useEffect(() => {
    fetch(`${apiUrl}/cards`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setCards(data))
      .catch((err) => {
        console.error("Fetch error:", err);
        Alert.alert("Error", `Failed to load cards: ${err.message}`);
      });
  }, []);

  const renderCard = ({ item }: { item: CardType }) => (
    <Card
      title={item.title}
      body={item.body}
      badge={item.badge}
      image={item._id === "burger" ? burgerImage : item.image}
      indicator={item.indicator}
      subtitle={item.subtitle}
      onPress={() => navigation.navigate("ProductDetails", { id: item._id })}
      showAddToCart={true}
    />
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
    <SafeAreaView style={{ flex: 1 }}>
      <NavBar
        brandName="PakGhor"
        navItems={["Home", "About", "Services", "Contact"]}
      />
      <FlatList
        data={allCards}
        renderItem={renderCard}
        keyExtractor={(item) => item._id}
        ListHeaderComponent={() => (
          <View style={styles.heroSection}>
            <Text style={styles.heroTitle}>
              Welcome to <Text style={styles.heroTitleGradient}>PakGhor</Text>
            </Text>
            <Text style={styles.heroSubtitle}>
              Fresh, delicious and crafted with love. Explore our latest
              specials and signature dishes.
            </Text>
          </View>
        )}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<Footer />}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
