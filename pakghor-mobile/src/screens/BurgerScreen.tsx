import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function BurgerScreen() {
  const { width } = Dimensions.get("window");
  const isLargeScreen = width > 400;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: width * 0.05,
    },
    text: {
      fontSize: isLargeScreen ? 24 : 20,
      fontWeight: "600",
      color: "#333",
    },
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavBar
        brandName="PakGhor"
        navItems={["Home", "About", "Services", "Contact"]}
      />
      <View style={styles.container}>
        <Text style={styles.text}>BurgerScreen</Text>
      </View>
      <Footer />
    </SafeAreaView>
  );
}

export default BurgerScreen;
