import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
const heroImg = require("../../assets/pakghor.jpg");

const { width } = Dimensions.get("window");

const LandingPage = () => {
  const isLargeScreen = width > 400;

  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: "#fff",
      alignItems: "center",
    },
    hero: {
      width: "100%",
      height: isLargeScreen ? 500 : 450,
      position: "relative",
      justifyContent: "flex-end",
      alignItems: "center",
    },
    heroImage: {
      width: "100%",
      height: "100%",
      resizeMode: "cover",
      position: "absolute",
    },
    overlay: {
      width: "100%",
      alignItems: "center",
      padding: isLargeScreen ? 25 : 20,
    },
    heroTitle: {
      fontSize: isLargeScreen ? 32 : 28,
      fontWeight: "800",
      color: "#fff",
      textAlign: "center",
    },
    brand: {
      color: "#ff7e5f",
    },
    heroSubtitle: {
      color: "#f0f0f0",
      fontSize: isLargeScreen ? 18 : 16,
      marginTop: 12,
      textAlign: "center",
      maxWidth: 350,
    },
    buttons: {
      flexDirection: "row",
      marginTop: 25,
      gap: 15,
    },
    button: {
      paddingVertical: 12,
      paddingHorizontal: isLargeScreen ? 25 : 20,
      borderRadius: 20,
    },
    primary: {
      backgroundColor: "#ff7e5f",
    },
    secondary: {
      backgroundColor: "#f7e169",
    },
    buttonText: {
      color: "#fff",
      fontWeight: "700",
      fontSize: isLargeScreen ? 18 : 16,
    },
    particle: {
      width: 6,
      height: 6,
      backgroundColor: "rgba(255,255,255,0.4)",
      borderRadius: 50,
      position: "absolute",
    },
    footer: {
      marginTop: 20,
      paddingVertical: 10,
    },
    footerText: {
      textAlign: "center",
      color: "#777",
      fontSize: 12,
    },
  });

  const [particles, setParticles] = useState<number[]>([]);
  const navigation = useNavigation<any>();

  useEffect(() => {
    setParticles(Array.from({ length: 30 }, (_, i) => i));
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavBar
        brandName="PakGhor"
        navItems={["Home", "About", "Services", "Contact"]}
      />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Hero Section */}
        <View style={styles.hero}>
          {/* Particles (simple dots for background animation) */}
          {particles.map((p) => (
            <View key={p} style={[styles.particle, randomParticlePosition()]} />
          ))}

          {/* Hero Image */}
          <Image source={heroImg} style={styles.heroImage} />

          {/* Overlay Content */}
          <LinearGradient
            colors={["rgba(0,0,0,0.5)", "transparent"]}
            style={styles.overlay}
          >
            <Text style={styles.heroTitle}>
              Welcome to <Text style={styles.brand}>Pakghor</Text>
            </Text>

            <Text style={styles.heroSubtitle}>
              Fresh, street-style fast food made with love in Mymensingh.
            </Text>

            <View style={styles.buttons}>
              <TouchableOpacity
                style={[styles.button, styles.primary]}
                onPress={() => navigation.navigate("Home")}
              >
                <Text style={styles.buttonText}>See Menu</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.secondary]}
                onPress={() => navigation.navigate("Checkout")}
              >
                <Text style={styles.buttonText}>Order Now</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </ScrollView>
      <Footer />
    </SafeAreaView>
  );
};

// Helper: random particle positioning for visual effect
const randomParticlePosition = () => ({
  top: Math.random() * 400,
  left: Math.random() * (width - 20),
});

export default LandingPage;
