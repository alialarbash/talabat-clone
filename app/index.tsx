import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "../components/Colors";
import Logo from "../components/Logo";

type Props = {};

export default function WelcomeScreen(_props: Props) {
  const router = useRouter();
  const [pressed, setPressed] = useState(false);
  const [pressed2, setPressed2] = useState(false);
  const [pressed3, setPressed3] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.emoji}>
        <Logo width={124} height={124} />
      </View>
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.subtitle}>
        Discover delicious restaurants and order your favorites fast.
      </Text>
      <View
        style={
          pressed
            ? styles.buttonPressedContainer
            : styles.orderNowButtonContainer
        }
      >
        <Pressable
          onPressIn={() => setPressed(true)}
          onPressOut={() => setPressed(false)}
          style={styles.orderNowButton}
          onPress={() => {
            router.push("/home");
          }}
        >
          <Text style={styles.orderNow}>Order Now 🛒</Text>
        </Pressable>
      </View>
      <View
        style={
          pressed2
            ? styles.searchButtonPressedContainer
            : styles.searchNowButtonContainer
        }
      >
        <Pressable
          onPressIn={() => setPressed2(true)}
          onPressOut={() => setPressed2(false)}
          style={styles.orderNowButton}
          onPress={() => router.push("/search")}
        >
          <Text style={styles.orderNow}>Search for Places 🔎</Text>
        </Pressable>
      </View>
      <View
        style={
          pressed3
            ? styles.searchButtonPressedContainer
            : styles.searchNowButtonContainer
        }
      >
        <Pressable
          onPressIn={() => setPressed3(true)}
          onPressOut={() => setPressed3(false)}
          style={styles.orderNowButton}
          onPress={() => router.push("/profile")}
        >
          <Text style={styles.orderNow}>My Profile 🧑</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF9F3",
    alignItems: "center",
    padding: 24,
  },
  emoji: {
    marginTop: 150,
    marginBottom: 24,
  },
  title: {
    fontSize: 40,
    fontWeight: "700",
    color: "#FF6F00",
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#333333",
    textAlign: "center",
    lineHeight: 22,
  },
  orderNowButtonContainer: {
    marginTop: 48,
    backgroundColor: "#ccc7c2",
    paddingBottom: 8,
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: 12,
  },

  buttonPressedContainer: {
    marginTop: 48,
    marginBottom: 8,
    backgroundColor: "#ccc7c2",
    borderRadius: 12,
    transform: [{ translateY: 8 }],
  },
  orderNowButton: {
    backgroundColor: Colors.background,
    paddingHorizontal: 24,
    paddingVertical: 12,
    textAlign: "center",
    borderRadius: 12,
  },
  orderNow: {
    fontSize: 24,
    fontWeight: 600,
    color: Colors.text,
  },

  searchNowButtonContainer: {
    marginTop: 12,
    backgroundColor: "#ccc7c2",
    paddingBottom: 8,
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: 12,
  },
  searchButtonPressedContainer: {
    marginTop: 12,
    marginBottom: 8,
    backgroundColor: "#ccc7c2",
    borderRadius: 12,
    transform: [{ translateY: 8 }],
  },
});
