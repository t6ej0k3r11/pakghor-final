import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

interface AboutCard {
  title: string;
  description: string;
  icon: string;
}

const About: React.FC = () => {
  const { width } = Dimensions.get("window");
  const isLargeScreen = width > 400;

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
        "To become the most loved local food brand that blends taste, quality, and happiness in every bite.",
      icon: "🌟",
    },
    {
      title: "Our Values",
      description:
        "Quality • Passion • Customer Satisfaction • Continuous Improvement in everything we do.",
      icon: "💛",
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <NavBar
        brandName="PakGhor"
        navItems={["Home", "About", "Services", "Contact"]}
      />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <LinearGradient
            colors={["#ffecd2", "#fcb69f"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroBackground}
          >
            <Text style={styles.heroTitle}>
              About <Text style={styles.heroTitleHighlight}>PakGhor</Text>
            </Text>
            <Text style={styles.heroSubtitle}>
              Crafted with ❤️ — bringing Mymensingh’s favorite street flavors to
              every plate with warmth, care, and creativity.
            </Text>
          </LinearGradient>
        </View>

        {/* Info Cards */}
        <View style={styles.cardsWrapper}>
          {aboutCards.map((card, index) => (
            <LinearGradient
              key={index}
              colors={["#fff", "#fff9f7"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[
                styles.card,
                { shadowColor: index % 2 === 0 ? "#ff7e5f" : "#f7e169" },
              ]}
            >
              <LinearGradient
                colors={["#ff7e5f", "#f7e169"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.iconWrapper}
              >
                <Text style={styles.icon}>{card.icon}</Text>
              </LinearGradient>

              <Text style={styles.cardTitle}>{card.title}</Text>
              <Text style={styles.cardDescription}>{card.description}</Text>
            </LinearGradient>
          ))}
        </View>
      </ScrollView>

      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff9f7",
  },
  scrollContainer: {
    paddingVertical: 30,
    paddingHorizontal: 18,
  },
  heroSection: {
    borderRadius: 24,
    overflow: "hidden",
    marginBottom: 25,
    shadowColor: "#ff7e5f",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
  },
  heroBackground: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderRadius: 24,
    alignItems: "center",
  },
  heroTitle: {
    fontSize: 30,
    fontWeight: "800",
    color: "#333",
    textAlign: "center",
  },
  heroTitleHighlight: {
    color: "#ff7e5f",
  },
  heroSubtitle: {
    marginTop: 12,
    fontSize: 16,
    color: "#444",
    textAlign: "center",
    maxWidth: 600,
    lineHeight: 22,
  },
  cardsWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 15,
  },
  card: {
    width: "48%",
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    backgroundColor: "#fff",
    elevation: 5,
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 6 },
    alignItems: "center",
  },
  iconWrapper: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  icon: {
    fontSize: 30,
    color: "#fff",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ff7e5f",
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
