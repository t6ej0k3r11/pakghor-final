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
import { useCart } from "../context/CartContext";
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
}: CardInterface) => {
  const navigation = useNavigation<any>();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const price = Number(indicator?.replace(/[^0-9]/g, "")) || 0;
    const id = Date.now().toString(); // Generate unique ID for cart item

    addToCart({
      id,
      name: title,
      price,
      qty: 1,
    });

    Alert.alert("Added to Cart", `${title} has been added!`);
  };

  return (
    <View style={styles.card}>
      {indicator && (
        <LinearGradient
          colors={["#f7e169", "#ff7e5f"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.indicator}
        >
          <Text style={styles.indicatorText}>{indicator}</Text>
        </LinearGradient>
      )}

      {badge && <Badge text={badge.text} filled={badge.filled} />}

      {image && (
        <TouchableOpacity
          onPress={() => link && navigation.navigate(link as never)}
        >
          <Image
            source={{ uri: image }}
            style={styles.image}
            resizeMode="cover"
          />
        </TouchableOpacity>
      )}

      <View style={styles.content}>
        <TouchableOpacity
          onPress={() => link && navigation.navigate(link as never)}
        >
          <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>

        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}

        <Text style={styles.body}>{body}</Text>

        <TouchableOpacity onPress={handleAddToCart}>
          <Button text="Add to Cart" filled type="primary" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 16,
    elevation: 5, // shadow for Android
    shadowColor: "#000", // shadow for iOS
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
  indicator: {
    position: "absolute",
    top: 12,
    right: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 1,
  },
  indicatorText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  image: {
    width: "100%",
    height: 180,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
    color: "#ff7e5f", // gradient not supported on Text; for actual gradient, wrap in LinearGradient
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  body: {
    fontSize: 16,
    color: "#444",
    marginBottom: 12,
  },
});

export default Card;
