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
import MaskedView from "@react-native-masked-view/masked-view";

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#1a1a1d",
    paddingVertical: 25,
    paddingHorizontal: 15,
    marginTop: 20,
    alignItems: "center",
  },
  footerTop: {
    alignItems: "center",
  },
  brand: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
  },
  tagline: {
    fontSize: 14,
    opacity: 0.85,
    marginBottom: 12,
    color: "#eaeaea",
    textAlign: "center",
  },
  socialIcons: {
    flexDirection: "row",
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
    width: "100%",
    marginVertical: 15,
  },
  footerBottom: {
    alignItems: "center",
  },
  bottomText: {
    fontSize: 12,
    opacity: 0.8,
    color: "#eaeaea",
  },
  heart: {
    color: "#ff7e5f",
    fontSize: 14,
  },
  websiteLink: {
    fontSize: 12,
    opacity: 0.8,
    color: "#f7e169",
    textDecorationLine: "underline",
  },
});

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const openURL = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  return (
    <View style={styles.footer}>
      {/* Footer Top */}
      <View style={styles.footerTop}>
        {/* Gradient Brand Text */}
        <MaskedView
          maskElement={
            <Text style={[styles.brand, { backgroundColor: "transparent" }]}>
              PakGhor
            </Text>
          }
        >
          <LinearGradient
            colors={["#f7e169", "#ff7e5f"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={[styles.brand, { opacity: 0 }]}>PakGhor</Text>
          </LinearGradient>
        </MaskedView>

        <Text style={styles.tagline}>
          Fresh • Delicious • Crafted with ❤️ for every bite.
        </Text>

        <View style={styles.socialIcons}>
          <TouchableOpacity
            style={{ marginRight: 15 }}
            accessibilityLabel="Follow us on Facebook"
            onPress={() =>
              openURL("https://www.facebook.com/PakGhorMymensingh")
            }
          >
            <FontAwesome name="facebook" size={22} color="#eaeaea" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginRight: 15 }}
            accessibilityLabel="Follow us on Instagram"
            onPress={() => openURL("https://www.instagram.com")}
          >
            <FontAwesome name="instagram" size={22} color="#eaeaea" />
          </TouchableOpacity>
          <TouchableOpacity
            accessibilityLabel="Follow us on X"
            onPress={() => openURL("https://x.com")}
          >
            <FontAwesome name="twitter" size={22} color="#eaeaea" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Footer Bottom */}
      <View style={styles.footerBottom}>
        <Text style={styles.bottomText}>
          © {currentYear} t63j0ker. All rights reserved.
        </Text>
        <Text style={styles.bottomText}>
          Made with <Text style={styles.heart}>❤</Text> in Mymensingh
        </Text>
        <TouchableOpacity onPress={() => openURL("https://pakghor.com")}>
          <Text style={styles.websiteLink}>Visit Our Website</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Footer;
