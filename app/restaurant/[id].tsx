import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../components/Colors";
import { restaurants } from "../../data/restaurants";
import { menuItems } from "../../data/menuItems";

type Props = {};

export default function RestaurantDetailScreen(_props: Props) {
  const id = useLocalSearchParams().id;
  const { name, cuisine, rating, deliveryTime } =
    restaurants.find((rest) => {
      return rest.id === id;
    }) ?? {};
  const router = useRouter();

  const filteredMenuItems = menuItems.filter((item) => {
    return item.id.slice(0, 2)[1] === id.slice(0, 2)[1];
  });

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Restaurant Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.restaurantIconContainer}>
            <Ionicons name="restaurant" size={60} color={Colors.orange} />
          </View>
          <Text style={styles.restaurantName}>{name}</Text>
          <Text style={styles.cuisineType}>{cuisine}</Text>

          {/* Restaurant Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Ionicons name="star" size={18} color="#FFD700" />
              <Text style={styles.statText}>{rating}</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Ionicons name="time-outline" size={18} color={Colors.orange} />
              <Text style={styles.statText}>{deliveryTime}</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Ionicons
                name="location-outline"
                size={18}
                color={Colors.green}
              />
              <Text style={styles.statText}>Delivery</Text>
            </View>
          </View>
        </View>

        {/* Menu Section */}
        <View style={styles.menuSection}>
          <View style={styles.menuHeader}>
            <Ionicons name="menu-outline" size={24} color={Colors.text} />
            <Text style={styles.menuTitle}>Menu</Text>
          </View>

          {filteredMenuItems.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons
                name="fast-food-outline"
                size={48}
                color={Colors.muted}
              />
              <Text style={styles.emptyStateText}>No menu items available</Text>
            </View>
          ) : (
            filteredMenuItems.map((item) => {
              return (
                <TouchableOpacity
                  key={item.id}
                  style={styles.menuItemCard}
                  onPress={() => {
                    router.push({
                      pathname: `item/${item.id}/${id}`,
                    });
                  }}
                  activeOpacity={0.7}
                >
                  <View style={styles.menuItemLeft}>
                    <View style={styles.menuItemIconContainer}>
                      <Ionicons
                        name="restaurant-outline"
                        size={24}
                        color={Colors.orange}
                      />
                    </View>
                    <View style={styles.menuItemInfo}>
                      <Text style={styles.menuItemName}>{item.name}</Text>
                      <Text
                        style={styles.menuItemDescription}
                        numberOfLines={2}
                      >
                        {item.description}
                      </Text>
                      <View style={styles.priceContainer}>
                        <Ionicons
                          name="cash-outline"
                          size={16}
                          color={Colors.green}
                        />
                        <Text style={styles.menuItemPrice}>
                          {item.price.toFixed(2)} KD
                        </Text>
                      </View>
                    </View>
                  </View>
                  <Ionicons
                    name="chevron-forward"
                    size={24}
                    color={Colors.muted}
                  />
                </TouchableOpacity>
              );
            })
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    paddingBottom: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  heroSection: {
    alignItems: "center",
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  restaurantIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  restaurantName: {
    fontSize: 32,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 8,
    textAlign: "center",
  },
  cuisineType: {
    fontSize: 16,
    color: Colors.muted,
    marginBottom: 20,
    fontWeight: "500",
  },
  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 8,
  },
  statText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.text,
    marginLeft: 6,
  },
  statDivider: {
    width: 1,
    height: 20,
    backgroundColor: "#E0E0E0",
    marginHorizontal: 4,
  },
  menuSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    marginTop: 8,
  },
  menuHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 8,
  },
  menuTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.text,
    marginLeft: 8,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 16,
    color: Colors.muted,
    marginTop: 12,
  },
  menuItemCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  menuItemIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  menuItemInfo: {
    flex: 1,
  },
  menuItemName: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 4,
  },
  menuItemDescription: {
    fontSize: 14,
    color: Colors.muted,
    lineHeight: 20,
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  menuItemPrice: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.green,
    marginLeft: 4,
  },
});
