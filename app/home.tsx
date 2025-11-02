import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { restaurants } from "../data/restaurants";
import { Colors } from "../components/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type Props = {};

export default function HomeScreen(_props: Props) {
  const router = useRouter();
  const timePrecentage = restaurants.map((rest) => {
    const time = Math.round(
      (+rest.deliveryTime.split(" ")[0].split("-")[1].trim() / 90) * 100
    );
    return time < 20 ? "20%" : time + "%";
  });
  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Explore the World of Food</Text>
        <Text style={styles.subtitle}>
          Browse restaurants near you and explore top cuisines.
        </Text>
        <View>
          {restaurants.map((rest, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={styles.restaurantCard}
                onPress={() => {
                  router.push({
                    pathname: `/restaurant/${rest.id}`,
                  });
                }}
              >
                <Text style={styles.restaurantName}>{rest.name}</Text>
                <Text style={styles.restaurantCuisine}>{rest.cuisine}</Text>
                <View style={styles.restaurantRatingContainer}>
                  <Ionicons name="star" size={16} color="#FFD700" />
                  <Text style={styles.restaurantRating}>{rest.rating}</Text>
                </View>
                <View
                  style={[
                    styles.restaurantDeliveryTimeContainer,
                    { width: timePrecentage[index] },
                  ]}
                >
                  <Text style={styles.restaurantDeliveryTimeIcon}>🏠</Text>
                  <Text style={styles.restaurantDeliveryTimeText}>
                    {rest.deliveryTime}
                  </Text>
                  <Text style={styles.restaurantDeliveryTimeIcon}>🚚</Text>
                </View>
                <View
                  style={[
                    styles.restaurantDeliveryRoad,
                    { width: timePrecentage[index] },
                  ]}
                ></View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingBottom: 48,
    backgroundColor: "#FFF9F3",
  },
  container: {
    backgroundColor: "#FFF9F3",
    paddingTop: 24,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#D32F2F",
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#333333",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
  },
  restaurantCard: {
    boxShadow: `0 4px 6px ${Colors.orange}a5`,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 22,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 20,
  },
  restaurantName: {
    fontSize: 22,
    fontWeight: 700,
    marginBottom: 1,
  },
  restaurantCuisine: {
    fontSize: 16,
    marginBottom: 6,
    color: Colors.muted,
  },
  restaurantRatingContainer: {
    flexDirection: "row",
    gap: 6,
    position: "absolute",
    right: -25,
    top: 10,
    backgroundColor: Colors.orange,
    width: 100,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    transform: [{ rotate: "40deg" }],
  },
  restaurantRating: {
    fontWeight: 700,
    color: "#fff",
    fontSize: 15,
  },
  restaurantDeliveryTimeContainer: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    justifyContent: "space-between",
  },
  restaurantDeliveryTimeIcon: {
    fontSize: 20,
  },
  restaurantDeliveryTimeText: {
    fontSize: 14,
  },
  restaurantDeliveryRoad: {
    height: 5,
    backgroundColor: "#EF5350",
  },
});
