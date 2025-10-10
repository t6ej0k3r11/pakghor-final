import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const { width } = Dimensions.get("window");

interface Service {
  title: string;
  description: string;
  icon: string;
}

const services: Service[] = [
  {
    title: "Home Delivery",
    description:
      "Get your favorite meals delivered to your doorstep quickly and safely.",
    icon: "🚚",
  },
  {
    title: "Dine In",
    description: "Enjoy a cozy and comfortable dining experience at our place.",
    icon: "🍽️",
  },
  {
    title: "Catering",
    description:
      "Professional catering services for birthdays, weddings and corporate events.",
    icon: "🎉",
  },
  {
    title: "Custom Orders",
    description:
      "We create special dishes as per your taste, preference and occasions.",
    icon: "🍔",
  },
];

const Services = () => {
  const isLargeScreen = width > 400;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff9f7",
      paddingHorizontal: width * 0.05,
      paddingTop: isLargeScreen ? 40 : 30,
    },
    heroSection: {
      alignItems: "center",
      marginBottom: isLargeScreen ? 40 : 30,
    },
    title: {
      fontSize: isLargeScreen ? 32 : 28,
      fontWeight: "800",
      color: "#333",
      textAlign: "center",
    },
    highlight: {
      backgroundColor: "transparent",
      color: "#ff7e5f",
    },
    subtitle: {
      marginTop: 12,
      fontSize: isLargeScreen ? 18 : 16,
      color: "#666",
      lineHeight: isLargeScreen ? 24 : 22,
      textAlign: "center",
      maxWidth: 650,
    },
    grid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: 16,
    },
    cardWrapper: {
      width: isLargeScreen ? width / 4 - 40 : width / 2 - 30,
      margin: 8,
    },
    card: {
      borderRadius: 20,
      padding: isLargeScreen ? 22 : 18,
      alignItems: "center",
      shadowColor: "#000",
      shadowOpacity: 0.15,
      shadowOffset: { width: 0, height: 6 },
      shadowRadius: 8,
      elevation: 6,
    },
    iconWrapper: {
      width: isLargeScreen ? 80 : 70,
      height: isLargeScreen ? 80 : 70,
      borderRadius: isLargeScreen ? 40 : 35,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 15,
      shadowColor: "#ff7e5f",
      shadowOpacity: 0.4,
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 8,
    },
    icon: {
      fontSize: isLargeScreen ? 34 : 30,
    },
    cardTitle: {
      fontSize: isLargeScreen ? 18 : 16,
      fontWeight: "700",
      color: "#333",
      marginBottom: 8,
      textAlign: "center",
    },
    cardDesc: {
      fontSize: isLargeScreen ? 15 : 13,
      color: "#555",
      textAlign: "center",
      lineHeight: isLargeScreen ? 20 : 18,
    },
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavBar
        brandName="PakGhor"
        navItems={["Home", "About", "Services", "Contact"]}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.title}>
            Discover <Text style={styles.highlight}>Our Services</Text>
          </Text>
          <Text style={styles.subtitle}>
            From doorstep delivery to customized meals, we’re here to make every
            food experience memorable.
          </Text>
        </View>

        {/* Grid Section */}
        <View style={styles.grid}>
          {services.map((service, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.8}
              style={styles.cardWrapper}
            >
              <LinearGradient
                colors={["#fff", "#fff9f7"]}
                style={styles.card}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <LinearGradient
                  colors={["#f7e169", "#ff7e5f"]}
                  style={styles.iconWrapper}
                >
                  <Text style={styles.icon}>{service.icon}</Text>
                </LinearGradient>

                <Text style={styles.cardTitle}>{service.title}</Text>
                <Text style={styles.cardDesc}>{service.description}</Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <Footer />
    </SafeAreaView>
  );
};

export default Services;
