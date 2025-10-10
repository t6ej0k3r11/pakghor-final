import React from "react";
import { Text, View, StyleSheet } from "react-native";
import type { BadgeInterface } from "../types";
import { LinearGradient } from "expo-linear-gradient";

const Badge = ({ text, filled }: BadgeInterface) => {
  if (filled) {
    return (
      <LinearGradient
        colors={["#f7e169", "#ff7e5f"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.filledBadge}
      >
        <Text style={styles.filledText}>{text.toUpperCase()}</Text>
      </LinearGradient>
    );
  }

  return (
    <View style={styles.outlinedBadge}>
      <Text style={styles.outlinedText}>{text.toUpperCase()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  filledBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 8,
  },
  filledText: {
    color: "white",
    fontWeight: "700",
    fontSize: 12,
    textTransform: "uppercase",
  },
  outlinedBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#f7e169",
  },
  outlinedText: {
    color: "#f7e169",
    fontWeight: "700",
    fontSize: 12,
    textTransform: "uppercase",
  },
});

export default Badge;
