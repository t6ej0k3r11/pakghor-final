import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const heroImg = require("../../assets/pakghor.jpg");
const { width } = Dimensions.get("window");
const isLargeScreen = width > 400;

const LandingPage = () => {
  const navigation = useNavigation<any>();
  const [particles, setParticles] = useState<number[]>([]);

  // Animation states
  const heroOpacity = new Animated.Value(0);
  const heroTranslate = new Animated.Value(20);

  useEffect(() => {
    setParticles(Array.from({ length: 20 }, (_, i) => i));

    // Animate hero text on mount
    Animated.parallel([
      Animated.timing(heroOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(heroTranslate, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Particle animation (floating up)
  const animatedParticles = particles.map((p, index) => {
    const translateY = new Animated.Value(Math.random() * 50);
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: -50,
          duration: 4000 + Math.random() * 2000,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 4000 + Math.random() * 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
    return { key: index, translateY };
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <NavBar
        brandName="PakGhor"
        navItems={["Home", "About", "Services", "Contact"]}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.hero}>
          <Image source={heroImg} style={styles.heroImage} />

          {animatedParticles.map(({ key, translateY }) => (
            <Animated.View
              key={key}
              style={[
                styles.particle,
                randomParticlePosition(),
                { transform: [{ translateY }] },
              ]}
            />
          ))}

          <LinearGradient
            colors={["rgba(0,0,0,0.5)", "rgba(0,0,0,0.1)"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
            style={styles.overlay}
          >
            <Animated.Text
              style={[
                styles.heroTitle,
                {
                  opacity: heroOpacity,
                  transform: [{ translateY: heroTranslate }],
                },
              ]}
            >
              Welcome to <Text style={styles.brand}>PakGhor</Text>
            </Animated.Text>
            <Animated.Text
              style={[
                styles.heroSubtitle,
                {
                  opacity: heroOpacity,
                  transform: [{ translateY: heroTranslate }],
                },
              ]}
            >
              Fresh, street-style fast food made with love in Mymensingh
            </Animated.Text>

            <View style={styles.buttons}>
              <AnimatedTouchableGradient
                style={styles.button}
                colors={["#ff7e5f", "#f7e169"]}
                onPress={() => navigation.navigate("Home")}
              >
                <Text style={styles.buttonText}>See Menu</Text>
              </AnimatedTouchableGradient>

              <AnimatedTouchableGradient
                style={styles.button}
                colors={["#f7e169", "#ff7e5f"]}
                onPress={() => navigation.navigate("Checkout")}
              >
                <Text style={styles.buttonText}>Order Now</Text>
              </AnimatedTouchableGradient>
            </View>
          </LinearGradient>
        </View>
        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
};

// Custom Animated Gradient Button
const AnimatedTouchableGradient = ({
  colors,
  style,
  onPress,
  children,
}: any) => {
  const gradientAnim = new Animated.Value(0);
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(gradientAnim, {
          toValue: 1,
          duration: 2500,
          useNativeDriver: false,
        }),
        Animated.timing(gradientAnim, {
          toValue: 0,
          duration: 2500,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  const startColor = gradientAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [colors[0], colors[1]],
  });
  const endColor = gradientAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [colors[1], colors[0]],
  });

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <Animated.View style={[style, { borderRadius: 30 }]}>
        <LinearGradient
          colors={[colors[0], colors[1]]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            paddingVertical: 14,
            paddingHorizontal: 28,
            borderRadius: 30,
            alignItems: "center",
          }}
        >
          {children}
        </LinearGradient>
      </Animated.View>
    </TouchableOpacity>
  );
};

// Particle helper
const randomParticlePosition = () => ({
  top: Math.random() * 400,
  left: Math.random() * (width - 20),
});

const styles = StyleSheet.create({
  container: { flexGrow: 1, alignItems: "center" },
  hero: {
    width: "100%",
    height: isLargeScreen ? 500 : 450,
    position: "relative",
    justifyContent: "flex-end",
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
    marginBottom: 12,
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  brand: { color: "#ff7e5f" },
  heroSubtitle: {
    color: "#fffefc",
    fontSize: isLargeScreen ? 18 : 16,
    textAlign: "center",
    marginBottom: 25,
    maxWidth: 350,
    lineHeight: isLargeScreen ? 26 : 22,
  },
  buttons: { flexDirection: "row", gap: 15 },
  button: {},
  buttonText: {
    fontSize: isLargeScreen ? 18 : 16,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
  },
  particle: {
    width: 6,
    height: 6,
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.3)",
    position: "absolute",
  },
});

export default LandingPage;
