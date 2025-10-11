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
const isLargeScreen = width > 400;

interface Service {
  title: string;
  description: string;
  icon: string;
}

const services: Service[] = [
  {
    title: "Home Delivery",
    description: "Get your favorite meals delivered quickly and safely.",
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
      "Professional catering for birthdays, weddings & corporate events.",
    icon: "🎉",
  },
  {
    title: "Custom Orders",
    description: "Special dishes as per your taste, preference and occasions.",
    icon: "🍔",
  },
];

const Services = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff9f7",
      paddingHorizontal: width * 0.05,
      paddingTop: isLargeScreen ? 40 : 30,
    },
    heroSection: {
      alignItems: "center",
      marginBottom: isLargeScreen ? 35 : 25,
      paddingVertical: 20,
      paddingHorizontal: 15,
      borderRadius: 20,
      backgroundColor: "#fff3eb",
      shadowColor: "#000",
      shadowOpacity: 0.05,
      shadowRadius: 10,
      elevation: 3,
    },
    title: {
      fontSize: isLargeScreen ? 28 : 24,
      fontWeight: "800",
      color: "#333",
      textAlign: "center",
    },
    highlight: { color: "#ff7e5f" },
    subtitle: {
      marginTop: 10,
      fontSize: isLargeScreen ? 16 : 14,
      color: "#555",
      textAlign: "center",
      lineHeight: isLargeScreen ? 22 : 20,
    },
    grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center" },
    cardWrapper: {
      width: isLargeScreen ? width / 2.2 : width - 40, // responsive: 1 col mobile, 2 col tablet
      margin: 10,
    },
    card: {
      borderRadius: 20,
      padding: 20,
      alignItems: "center",
      backgroundColor: "#fff",
      shadowColor: "#000",
      shadowOpacity: 0.08,
      shadowOffset: { width: 0, height: 6 },
      shadowRadius: 10,
      elevation: 5,
    },
    iconWrapper: {
      width: 70,
      height: 70,
      borderRadius: 50,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 15,
      backgroundColor: "#ff7e5f",
      shadowColor: "#ff7e5f",
      shadowOpacity: 0.4,
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 6,
    },
    icon: { fontSize: 30 },
    cardTitle: {
      fontSize: 16,
      fontWeight: "700",
      color: "#333",
      marginBottom: 6,
      textAlign: "center",
    },
    cardDesc: {
      fontSize: 14,
      color: "#555",
      textAlign: "center",
      lineHeight: 20,
    },
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff9f7" }}>
      <NavBar
        brandName="PakGhor"
        navItems={["Home", "About", "Services", "Contact"]}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <View style={styles.heroSection}>
          <Text style={styles.title}>
            Discover <Text style={styles.highlight}>Our Services</Text>
          </Text>
          <Text style={styles.subtitle}>
            From doorstep delivery to customized meals, we’re here to make every
            food experience memorable.
          </Text>
        </View>

        {/* Services Grid */}
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
