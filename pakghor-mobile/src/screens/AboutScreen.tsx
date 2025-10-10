import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface AboutCard {
  title: string;
  description: string;
  icon: string;
}

const About: React.FC = () => {
  const aboutCards: AboutCard[] = [
    {
      title: "Our Mission",
      description:
        "To bring joy to every meal with fresh ingredients, carefully crafted recipes, and exceptional service.",
      icon: "🎯",
    },
    {
      title: "Our Vision",
      description:
        "To become the most loved local food brand that combines taste, quality, and happiness in every bite.",
      icon: "🌟",
    },
    {
      title: "Our Values",
      description:
        "Quality, Passion, Customer Satisfaction, and Continuous Improvement in everything we do.",
      icon: "💛",
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <Text style={styles.title}>
          About <Text style={styles.titleGradient}>Pakghor</Text>
        </Text>
        <Text style={styles.subtitle}>
          We are dedicated to providing delicious food and great service. Our
          passion is to make every meal a memorable experience.
        </Text>
      </View>

      {/* Cards Section */}
      <View style={styles.cardsContainer}>
        {aboutCards.map((card, index) => (
          <View key={index} style={styles.card}>
            <LinearGradient
              colors={["#f7e169", "#ff7e5f"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.iconWrapper}
            >
              <Text style={styles.icon}>{card.icon}</Text>
            </LinearGradient>
            <Text style={styles.cardTitle}>{card.title}</Text>
            <Text style={styles.cardDescription}>{card.description}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    paddingHorizontal: 15,
    backgroundColor: "#fff9f7",
  },
  hero: {
    marginBottom: 30,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#333",
    textAlign: "center",
  },
  titleGradient: {
    backgroundColor: "transparent",
    color: "#ff7e5f", // fallback solid color
  },
  subtitle: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    maxWidth: 650,
    lineHeight: 22,
  },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 15,
  },
  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 22,
    padding: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 5,
    alignItems: "center",
  },
  iconWrapper: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  icon: {
    fontSize: 28,
    color: "#fff",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 8,
    textAlign: "center",
  },
  cardDescription: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    lineHeight: 20,
  },
});

export default About;
