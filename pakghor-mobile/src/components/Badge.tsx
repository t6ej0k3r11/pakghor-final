import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import type { BadgeInterface } from "../types";

const Badge = ({ text, filled }: BadgeInterface) => {
  if (filled) {
    return (
      <LinearGradient
        colors={["#ff7e5f", "#f7e169"]}
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
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 50,
    marginBottom: 8,
    shadowColor: "#ff7e5f",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  filledText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 12,
    letterSpacing: 0.5,
    textAlign: "center",
  },
  outlinedBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 50,
    borderWidth: 1.6,
    borderColor: "#ff7e5f",
    marginBottom: 8,
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  outlinedText: {
    color: "#ff7e5f",
    fontWeight: "700",
    fontSize: 12,
    letterSpacing: 0.5,
    textAlign: "center",
  },
});

export default Badge;
