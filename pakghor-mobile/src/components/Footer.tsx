import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const openURL = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  return (
    <LinearGradient
      colors={["#ff7e5f", "#f7e169"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.footer}
    >
      <View style={styles.footerContent}>
        {/* Brand */}
        <Text style={styles.brand}>PakGhor</Text>
        <Text style={styles.tagline}>
          Fresh • Delicious • Made with ❤️ in Mymensingh
        </Text>

        {/* Social Icons */}
        <View style={styles.socialIcons}>
          <TouchableOpacity
            onPress={() =>
              openURL("https://www.facebook.com/PakGhorMymensingh")
            }
            style={styles.iconButton}
          >
            <FontAwesome name="facebook" size={26} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => openURL("https://www.instagram.com")}
            style={styles.iconButton}
          >
            <FontAwesome name="instagram" size={26} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => openURL("https://x.com")}
            style={styles.iconButton}
          >
            <FontAwesome name="twitter" size={26} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Bottom Text */}
        <Text style={styles.bottomText}>
          © {currentYear} t63j0ker. All rights reserved.
        </Text>
        <TouchableOpacity onPress={() => openURL("https://pakghor.com")}>
          <Text style={styles.websiteLink}>pakghor.com</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  footer: {
    borderRadius: 16,
    marginVertical: 20,
    marginHorizontal: 10,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  footerContent: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: "center",
  },
  brand: {
    fontSize: 22,
    fontWeight: "800",
    color: "#fff",
    textTransform: "uppercase",
  },
  tagline: {
    fontSize: 13,
    color: "rgba(255,255,255,0.9)",
    marginTop: 6,
    textAlign: "center",
    marginBottom: 10,
  },
  socialIcons: {
    flexDirection: "row",
    marginBottom: 10,
  },
  iconButton: {
    marginHorizontal: 10,
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: 10,
    borderRadius: 50,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.3)",
    width: "80%",
    marginVertical: 10,
  },
  bottomText: {
    fontSize: 12,
    color: "rgba(255,255,255,0.9)",
    marginBottom: 5,
  },
  websiteLink: {
    fontSize: 13,
    fontWeight: "600",
    color: "#fff",
    textDecorationLine: "underline",
  },
});

export default Footer;
