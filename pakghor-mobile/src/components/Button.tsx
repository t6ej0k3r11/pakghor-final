import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

interface ButtonProps {
  text: string;
  filled?: boolean;
  type?: "primary" | "secondary";
  to?: string;
  icon?: React.ReactNode;
  onPress?: () => void;
}

const Button = ({
  text,
  filled,
  type = "primary",
  to,
  icon,
  onPress,
}: ButtonProps) => {
  const navigation = useNavigation<any>();

  const handlePress = () => {
    if (onPress) onPress();
    else if (to) navigation.navigate(to);
  };

  // Base content inside the button
  const content = (
    <View style={styles.innerContainer}>
      <Text
        style={[
          styles.text,
          filled ? styles.textFilled : styles[`text_${type}`],
        ]}
      >
        {text}
      </Text>
      {icon && <View style={styles.icon}>{icon}</View>}
    </View>
  );

  // Filled button → gradient background
  if (filled) {
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={handlePress}>
        <LinearGradient
          colors={["#f7e169", "#ff7e5f"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.button, styles.filled]}
        >
          {content}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  // Outline / transparent button
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handlePress}
      style={[
        styles.button,
        type === "primary" ? styles.primary : styles.secondary,
      ]}
    >
      {content}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 14,
    overflow: "hidden",
    marginVertical: 6,
  },
  filled: {
    shadowColor: "#ff7e5f",
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  primary: {
    borderWidth: 2,
    borderColor: "#ff7e5f",
    backgroundColor: "#111",
  },
  secondary: {
    borderWidth: 2,
    borderColor: "#444",
    backgroundColor: "rgba(20,20,20,0.7)",
  },
  text: {
    fontSize: 15,
    fontWeight: "600",
    textTransform: "uppercase",
    fontFamily: "Poppins_600SemiBold",
  },
  textFilled: {
    color: "#fff",
  },
  text_primary: {
    color: "#ff7e5f",
  },
  text_secondary: {
    color: "#eee",
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  icon: {
    marginLeft: 4,
  },
});

export default Button;
