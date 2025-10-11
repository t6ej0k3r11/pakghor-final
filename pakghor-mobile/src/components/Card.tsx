import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useCart, CartItem } from "../context/CartContext";
import type { CardInterface } from "../types";
import Button from "./Button";
import Badge from "./Badge";

const Card = ({
  body,
  title,
  badge,
  image,
  indicator,
  subtitle,
  link,
  onPress,
  showAddToCart = true,
}: CardInterface & { onPress?: () => void; showAddToCart?: boolean }) => {
  const navigation = useNavigation<any>();
  const { cart, addToCart } = useCart();

  const handleAddToCart = () => {
    const price = Number(indicator?.replace(/[^0-9]/g, "")) || 0;
    const existing = cart.find((item: CartItem) => item.name === title);

    addToCart({
      name: title,
      price,
      qty: 1,
    });

    const message = existing ? "Quantity updated!" : "Added to Cart";
    Alert.alert(
      message,
      `${title} has been ${existing ? "updated" : "added"}!`
    );
  };

  return (
    <LinearGradient colors={["#fff9f1", "#fff"]} style={styles.cardWrapper}>
      <View style={styles.card}>
        {image && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={
              onPress || (() => link && navigation.navigate(link as never))
            }
          >
            <View style={styles.imageContainer}>
              <Image
                source={typeof image === "string" ? { uri: image } : image}
                style={styles.image}
                resizeMode="cover"
              />
              {indicator && (
                <LinearGradient
                  colors={["#f7e169", "#ff7e5f"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.priceTag}
                >
                  <Text style={styles.priceText}>{indicator}</Text>
                </LinearGradient>
              )}
            </View>
          </TouchableOpacity>
        )}

        <View style={styles.content}>
          {badge && <Badge text={badge.text} filled={badge.filled} />}

          <TouchableOpacity
            onPress={
              onPress || (() => link && navigation.navigate(link as never))
            }
          >
            <Text style={styles.title}>{title}</Text>
          </TouchableOpacity>

          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}

          <Text style={styles.body} numberOfLines={2}>
            {body}
          </Text>

          {showAddToCart && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleAddToCart}
              style={styles.cartButton}
            >
              <LinearGradient
                colors={["#ff7e5f", "#f7e169"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.cartButtonGradient}
              >
                <Text style={styles.cartButtonText}>Add to Cart</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    borderRadius: 22,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 22,
    overflow: "hidden",
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 220,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
  },
  priceTag: {
    position: "absolute",
    bottom: 12,
    right: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  priceText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#ff7e5f",
  },
  subtitle: {
    fontSize: 15,
    color: "#666",
    marginBottom: 4,
  },
  body: {
    fontSize: 15,
    color: "#444",
    marginBottom: 10,
  },
  cartButton: {
    borderRadius: 14,
    overflow: "hidden",
    alignSelf: "flex-start",
  },
  cartButtonGradient: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 14,
  },
  cartButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});

export default Card;
