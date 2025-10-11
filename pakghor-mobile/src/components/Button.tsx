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
  filled = false,
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

  const content = (
    <View style={styles.innerContainer}>
      {icon && <View style={styles.icon}>{icon}</View>}
      <Text
        style={[
          styles.text,
          filled ? styles.textFilled : styles[`text_${type}`],
        ]}
      >
        {text}
      </Text>
    </View>
  );

  if (filled) {
    return (
      <TouchableOpacity activeOpacity={0.85} onPress={handlePress}>
        <LinearGradient
          colors={["#ff7e5f", "#f7e169"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.button, styles.filled]}
        >
          {content}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={0.85}
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
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 16,
    marginVertical: 6,
    overflow: "hidden",
  },
  filled: {
    shadowColor: "#ff7e5f",
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
  },
  primary: {
    borderWidth: 2,
    borderColor: "#ff7e5f",
    backgroundColor: "#fff8f1",
  },
  secondary: {
    borderWidth: 1.5,
    borderColor: "#ccc",
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  text: {
    fontSize: 16,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  textFilled: {
    color: "#fff",
  },
  text_primary: {
    color: "#ff7e5f",
  },
  text_secondary: {
    color: "#444",
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  icon: {
    marginRight: 6,
  },
});

export default Button;
