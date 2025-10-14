import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import { PaperAirplaneIcon } from "react-native-heroicons/solid";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";

interface Card {
  _id: string;
  title: string;
  subtitle: string;
  body: string;
  image: string;
  indicator: string;
}

const ProductDetails = () => {
  const route = useRoute();
  const { id }: any = route.params; // 👈 get "id" from navigation params
  const [product, setProduct] = useState<Card | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const { width } = Dimensions.get("window");
  const isLargeScreen = width > 400;

  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: "#fff9f7",
      alignItems: "center",
      paddingVertical: isLargeScreen ? 40 : 20,
      paddingHorizontal: width * 0.05,
    },
    card: {
      backgroundColor: "#fff",
      borderRadius: 22,
      padding: isLargeScreen ? 25 : 20,
      width: "100%",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.15,
      shadowRadius: 10,
      elevation: 6,
      alignItems: "center",
    },
    title: {
      fontSize: isLargeScreen ? 28 : 24,
      fontWeight: "800",
      color: "#333",
      marginBottom: 8,
      textAlign: "center",
    },
    subtitle: {
      fontSize: isLargeScreen ? 18 : 16,
      color: "#666",
      marginBottom: 12,
      textAlign: "center",
    },
    badge: {
      backgroundColor: "#ff7e5f",
      borderRadius: 20,
      paddingVertical: 8,
      paddingHorizontal: 16,
      marginBottom: 20,
    },
    badgeText: {
      color: "#fff",
      fontWeight: "600",
      fontSize: isLargeScreen ? 14 : 12,
    },
    image: {
      width: "100%",
      height: width * 0.5,
      borderRadius: 16,
      marginBottom: 24,
    },
    body: {
      fontSize: isLargeScreen ? 16 : 14,
      color: "#555",
      lineHeight: isLargeScreen ? 24 : 20,
      textAlign: "center",
      marginBottom: 24,
    },
    button: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#ff7e5f",
      borderRadius: 12,
      paddingVertical: 14,
      paddingHorizontal: isLargeScreen ? 40 : 30,
    },
    buttonText: {
      color: "#fff",
      fontWeight: "700",
      fontSize: isLargeScreen ? 18 : 16,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    loadingText: {
      marginTop: 10,
      color: "#555",
      fontSize: isLargeScreen ? 16 : 14,
    },
  });

  const handleAddToCart = () => {
    if (product) {
      const price = Number(product.indicator?.replace(/[^0-9]/g, "")) || 0;
      addToCart({
        name: product.title,
        price,
        qty: 1,
      });
      Alert.alert("Added to Cart", `${product.title} has been added!`);
    }
  };

  useEffect(() => {
    fetch(`${apiUrl}/cards/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ff7e5f" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Product not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavBar
        brandName="PakGhor"
        navItems={["Home", "About", "Services", "Contact"]}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.subtitle}>{product.subtitle}</Text>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>✨ {product.indicator}</Text>
          </View>

          <Image source={{ uri: product.image }} style={styles.image} />

          <Text style={styles.body}>{product.body}</Text>

          <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
            <PaperAirplaneIcon
              color="#fff"
              size={20}
              style={{ marginRight: 6 }}
            />
            <Text style={styles.buttonText}>Order Now</Text>
          </TouchableOpacity>
        </View>
        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetails;
