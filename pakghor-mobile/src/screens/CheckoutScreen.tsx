import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCart, CartItem } from "../context/CartContext";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  payment: "cod" | "online";
}

const CheckoutScreen: React.FC = () => {
  const { cart, increaseQty, decreaseQty, removeFromCart, total } = useCart();
  const { width } = Dimensions.get("window");
  const isLargeScreen = width > 400;

  const styles = StyleSheet.create({
    container: {
      padding: isLargeScreen ? 25 : 15,
      backgroundColor: "#f8f9fa",
    },
    pageTitle: {
      fontSize: isLargeScreen ? 32 : 28,
      fontWeight: "700",
      textAlign: "center",
      marginBottom: 25,
    },
    section: {
      backgroundColor: "#fff",
      borderRadius: 20,
      padding: isLargeScreen ? 25 : 15,
      marginBottom: 25,
      shadowColor: "#000",
      shadowOpacity: 0.07,
      shadowOffset: { width: 0, height: 5 },
      shadowRadius: 10,
      elevation: 5,
    },
    sectionTitle: {
      fontSize: isLargeScreen ? 22 : 20,
      fontWeight: "600",
      color: "#1f2937",
      marginBottom: 15,
    },
    emptyCart: {
      textAlign: "center",
      fontStyle: "italic",
      color: "#9ca3af",
      fontSize: isLargeScreen ? 16 : 14,
    },
    cartItem: {
      flexDirection: isLargeScreen ? "row" : "column",
      justifyContent: isLargeScreen ? "space-between" : "flex-start",
      alignItems: isLargeScreen ? "center" : "flex-start",
      marginBottom: 15,
    },
    itemName: {
      fontWeight: "600",
      color: "#111827",
      fontSize: isLargeScreen ? 16 : 14,
    },
    itemPrice: {
      fontWeight: "500",
      color: "#6b7280",
      fontSize: isLargeScreen ? 16 : 14,
    },
    qtyControl: { flexDirection: "row", alignItems: "center", gap: 8 },
    qtyBtn: {
      backgroundColor: "#f97316",
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 8,
    },
    qtyBtnText: {
      color: "#fff",
      fontWeight: "700",
      fontSize: isLargeScreen ? 16 : 14,
    },
    qtyNumber: {
      minWidth: 30,
      textAlign: "center",
      fontWeight: "600",
      fontSize: isLargeScreen ? 16 : 14,
    },
    removeBtn: {
      fontSize: isLargeScreen ? 20 : 18,
      color: "#ef4444",
      marginLeft: 8,
    },
    total: {
      textAlign: "right",
      fontSize: isLargeScreen ? 20 : 18,
      fontWeight: "700",
      marginTop: 15,
    },
    input: {
      backgroundColor: "#f9fafb",
      borderRadius: 12,
      paddingHorizontal: 15,
      paddingVertical: 12,
      marginBottom: 15,
      borderWidth: 1,
      borderColor: "#d1d5db",
      fontSize: isLargeScreen ? 16 : 14,
    },
    paymentWrapper: {
      flexDirection: isLargeScreen ? "row" : "column",
      gap: 12,
      marginBottom: 25,
    },
    paymentBtn: {
      flex: 1,
      borderWidth: 1,
      borderColor: "#d1d5db",
      padding: 12,
      borderRadius: 12,
      alignItems: "center",
    },
    paymentBtnSelected: { backgroundColor: "#f97316", borderColor: "#f97316" },
    submitBtn: {
      backgroundColor: "#f97316",
      padding: 16,
      borderRadius: 12,
      alignItems: "center",
    },
    submitBtnText: {
      color: "#fff",
      fontWeight: "700",
      fontSize: isLargeScreen ? 18 : 16,
    },
  });

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    payment: "cod",
  });

  const handleChange = (key: keyof FormData, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = () => {
    const { name, email, phone, address } = formData;
    if (!name || !email || !phone || !address) {
      Alert.alert("Error", "Please fill in all fields!");
      return;
    }

    console.log("Order placed:", { cart, formData });
    Alert.alert("✅ Order placed successfully!");

    // Optionally reset form and cart here
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      payment: "cod",
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavBar
        brandName="PakGhor"
        navItems={["Home", "About", "Services", "Contact"]}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.pageTitle}>Checkout</Text>

        {/* Cart Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Cart</Text>
          {cart.length === 0 ? (
            <Text style={styles.emptyCart}>Your cart is empty 😔</Text>
          ) : (
            cart.map((item: CartItem) => (
              <View key={item.id} style={styles.cartItem}>
                <View>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>{item.price * item.qty}৳</Text>
                </View>
                <View style={styles.qtyControl}>
                  <TouchableOpacity
                    onPress={() => decreaseQty(item.id)}
                    style={styles.qtyBtn}
                  >
                    <Text style={styles.qtyBtnText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.qtyNumber}>{item.qty}</Text>
                  <TouchableOpacity
                    onPress={() => increaseQty(item.id)}
                    style={styles.qtyBtn}
                  >
                    <Text style={styles.qtyBtnText}>+</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                    <Text style={styles.removeBtn}>❌</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
          <Text style={styles.total}>Total: {total}৳</Text>
        </View>

        {/* Shipping & Payment Form */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shipping Information</Text>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={formData.name}
            onChangeText={(text) => handleChange("name", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            value={formData.email}
            onChangeText={(text) => handleChange("email", text)}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={formData.phone}
            onChangeText={(text) => handleChange("phone", text)}
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="Delivery Address"
            value={formData.address}
            onChangeText={(text) => handleChange("address", text)}
          />

          <Text style={[styles.sectionTitle, { marginTop: 20 }]}>
            Payment Method
          </Text>
          <View style={styles.paymentWrapper}>
            <TouchableOpacity
              style={[
                styles.paymentBtn,
                formData.payment === "cod" && styles.paymentBtnSelected,
              ]}
              onPress={() => handleChange("payment", "cod")}
            >
              <Text>Cash on Delivery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.paymentBtn,
                formData.payment === "online" && styles.paymentBtnSelected,
              ]}
              onPress={() => handleChange("payment", "online")}
            >
              <Text>Online Payment</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
            <Text style={styles.submitBtnText}>Confirm Order</Text>
          </TouchableOpacity>
        </View>
        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CheckoutScreen;
