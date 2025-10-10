import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useCart } from "../context/CartContext";
const logo = require("../../assets/logo.jpg");

interface NavBarProps {
  brandName: string;
  navItems: string[];
}

const NavBar = ({ brandName, navItems }: NavBarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const navigation = useNavigation<any>();
  const { cart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const isLoggedIn = !!cart; // Replace with your auth check logic

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const handleLogout = () => {
    // Replace with your auth logout logic
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
      <View style={styles.container}>
        {/* Logo */}
        <TouchableOpacity
          style={styles.brand}
          onPress={() => navigation.navigate("Home")}
        >
          <Image source={logo} style={styles.logo} />
          <Text style={styles.brandText}>{brandName}</Text>
        </TouchableOpacity>

        {/* Hamburger */}
        <TouchableOpacity onPress={toggleMenu} style={styles.hamburger}>
          <View style={styles.bar} />
          <View style={styles.bar} />
          <View style={styles.bar} />
        </TouchableOpacity>
      </View>

      {/* Menu Items */}
      {isOpen && (
        <View style={styles.menu}>
          {navItems.map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => handleNavigate(item)}
              style={styles.menuItem}
            >
              <Text style={styles.menuItemText}>{item}</Text>
            </TouchableOpacity>
          ))}

          {/* Search */}
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Search..."
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

          {/* Cart */}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(isLoggedIn ? "Checkout" : "Login")
            }
            style={styles.cartButton}
          >
            <Text style={{ fontSize: 20, marginRight: 5 }}>🛒</Text>
            {cartCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartCount}</Text>
              </View>
            )}
          </TouchableOpacity>

          {/* Auth Buttons */}
          <View style={styles.authButtons}>
            {!isLoggedIn ? (
              <>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Login")}
                  style={styles.authButton}
                >
                  <Text style={styles.authButtonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Signup")}
                  style={styles.authButton}
                >
                  <Text style={styles.authButtonText}>Signup</Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                onPress={handleLogout}
                style={styles.authButton}
              >
                <Text style={styles.authButtonText}>Logout</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: "#f7e169",
    paddingVertical: 10,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
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
    width: 50,
    height: 50,
    borderRadius: 12,
    marginRight: 8,
  },
  brandText: {
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#fff",
  },
  hamburger: {
    padding: 5,
  },
  bar: {
    width: 25,
    height: 3,
    backgroundColor: "#fff",
    marginVertical: 2,
    borderRadius: 2,
  },
  menu: {
    marginTop: 10,
  },
  menuItem: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 5,
  },
  menuItemText: {
    color: "#f7e169",
    fontWeight: "600",
  },
  searchContainer: {
    flexDirection: "row",
    marginVertical: 10,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 5,
  },
  searchButton: {
    backgroundColor: "#ff7e5f",
    borderRadius: 8,
    paddingHorizontal: 15,
    justifyContent: "center",
  },
  searchButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  cartButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
  },
  cartBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "crimson",
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
  },
  cartBadgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  authButtons: {
    flexDirection: "row",
    marginTop: 5,
  },
  authButton: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginRight: 5,
  },
  authButtonText: {
    color: "#f7e169",
    fontWeight: "600",
  },
});

export default NavBar;
