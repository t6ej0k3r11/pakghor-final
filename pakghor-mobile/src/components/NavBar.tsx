import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";

const logo = require("../assets/logo.jpg");

interface NavBarProps {
  brandName: string;
  navItems: string[];
}

const NavBar = ({ brandName, navItems }: NavBarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const navigation = useNavigation<any>();
  const { cart } = useCart();
  const { isLoggedIn, logout } = useAuth();
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
    navigation.navigate("Home");
  };

  const handleSearch = () => {
    alert("Search functionality coming soon!");
  };

  const handleNavigate = (item: string) => {
    setIsOpen(false);
    navigation.navigate(item as never);
  };

  return (
    <View style={styles.navbar}>
      {/* Top Bar */}
      <View style={styles.container}>
        {/* Logo & Brand */}
        <TouchableOpacity
          style={styles.brand}
          onPress={() => navigation.navigate("LandingPage")}
        >
          <Image source={logo} style={styles.logo} />
          <Text style={styles.brandText}>{brandName}</Text>
        </TouchableOpacity>

        {/* Icons */}
        <View style={styles.iconRow}>
          {/* Cart */}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(isLoggedIn ? "Checkout" : "Login")
            }
            style={styles.cartIconContainer}
          >
            <Ionicons name="cart" size={22} color="#ff7e5f" />
            {cartCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartCount}</Text>
              </View>
            )}
          </TouchableOpacity>

          {/* Hamburger */}
          <TouchableOpacity onPress={toggleMenu} style={styles.hamburger}>
            <View style={styles.bar} />
            <View style={styles.bar} />
            <View style={styles.bar} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Floating Menu */}
      {isOpen && (
        <Animated.View style={styles.menu}>
          {/* Search */}
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Search your favorite item..."
              placeholderTextColor="#aaa"
              value={searchText}
              onChangeText={setSearchText}
              style={styles.searchInput}
            />
            <TouchableOpacity
              onPress={handleSearch}
              style={styles.searchButton}
            >
              <Text style={styles.searchButtonText}>Go</Text>
            </TouchableOpacity>
          </View>

          {/* Menu Items */}
          {navItems.map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => handleNavigate(item)}
              style={styles.menuItem}
            >
              <Text style={styles.menuItemText}>{item}</Text>
            </TouchableOpacity>
          ))}

          {/* Auth Buttons */}
          <View style={styles.authButtons}>
            {!isLoggedIn ? (
              <>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Login")}
                  style={[styles.authButton, { backgroundColor: "#ff7e5f" }]}
                >
                  <Text style={styles.authButtonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Signup")}
                  style={[styles.authButton, { backgroundColor: "#f7e169" }]}
                >
                  <Text style={[styles.authButtonText, { color: "#333" }]}>
                    Signup
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                onPress={handleLogout}
                style={[styles.authButton, { backgroundColor: "#ff7e5f" }]}
              >
                <Text style={styles.authButtonText}>Logout</Text>
              </TouchableOpacity>
            )}
          </View>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  brand: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 45,
    height: 45,
    borderRadius: 12,
    marginRight: 8,
  },
  brandText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ff7e5f",
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  hamburger: {
    padding: 5,
    marginLeft: 10,
  },
  bar: {
    width: 26,
    height: 3,
    backgroundColor: "#ff7e5f",
    marginVertical: 2,
    borderRadius: 2,
  },
  icon: {
    fontSize: 22,
  },
  cartIconContainer: {
    position: "relative",
  },
  cartBadge: {
    position: "absolute",
    top: -4,
    right: -10,
    backgroundColor: "crimson",
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  cartBadgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  menu: {
    backgroundColor: "rgba(255,255,255,0.98)",
    borderRadius: 16,
    marginTop: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  searchContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    color: "#333",
  },
  searchButton: {
    backgroundColor: "#ff7e5f",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginLeft: 8,
    justifyContent: "center",
  },
  searchButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  menuItem: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  menuItemText: {
    textAlign: "center",
    color: "#333",
    fontWeight: "600",
    fontSize: 15,
  },
  authButtons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 10,
  },
  authButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 5,
  },
  authButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
});

export default NavBar;
