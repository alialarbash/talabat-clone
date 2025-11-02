import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { menuItems } from "../../../data/menuItems";
import { restaurants } from "../../../data/restaurants";
import { Colors } from "../../../components/Colors";

type Props = {};

export default function MenuItemDetailScreen(_props: Props) {
  const { id, restaurantId } = useLocalSearchParams();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

  const item = menuItems.find((item) => item.id === id);
  const restaurant = restaurants.find((rest) => rest.id === restaurantId);

  if (!item) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Item not found</Text>
      </View>
    );
  }

  const totalPrice = (item.price * quantity).toFixed(2);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Item Image Placeholder */}
        <View style={styles.imageContainer}>
          <Ionicons name="restaurant" size={120} color={Colors.orange} />
        </View>

        {/* Item Info Card */}
        <View style={styles.infoCard}>
          <Text style={styles.itemName}>{item.name}</Text>
          {restaurant && (
            <View style={styles.restaurantInfo}>
              <Ionicons
                name="restaurant-outline"
                size={16}
                color={Colors.muted}
              />
              <Text style={styles.restaurantName}>{restaurant.name}</Text>
            </View>
          )}

          {/* Price */}
          <View style={styles.priceContainer}>
            <Ionicons name="cash-outline" size={20} color={Colors.green} />
            <Text style={styles.price}>{item.price.toFixed(2)} KD</Text>
          </View>

          {/* Description */}
          <View style={styles.descriptionContainer}>
            <Ionicons
              name="information-circle-outline"
              size={20}
              color={Colors.text}
            />
            <Text style={styles.description}>{item.description}</Text>
          </View>
        </View>

        {/* Quantity Selector */}
        <View style={styles.quantityContainer}>
          <Text style={styles.quantityLabel}>Quantity</Text>
          <View style={styles.quantityControls}>
            <TouchableOpacity
              style={[
                styles.quantityButton,
                quantity <= 1 && styles.quantityButtonDisabled,
              ]}
              onPress={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
            >
              <Ionicons
                name="remove"
                size={20}
                color={quantity <= 1 ? Colors.muted : Colors.text}
              />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => setQuantity(quantity + 1)}
            >
              <Ionicons name="add" size={20} color={Colors.text} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalPrice}>{totalPrice} KD</Text>
        </View>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={() => {
            router.push({ pathname: `cart/${id}/${quantity}/${restaurantId}` });
          }}
        >
          <Ionicons name="cart" size={24} color="#FFFFFF" />
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: 10,
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
  favoriteButton: {
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
  imageContainer: {
    height: 250,
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  infoCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  itemName: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 8,
  },
  restaurantInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 4,
  },
  restaurantName: {
    fontSize: 14,
    color: Colors.muted,
    fontWeight: "500",
    marginLeft: 6,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 8,
  },
  price: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.green,
    marginLeft: 8,
  },
  descriptionContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 8,
  },
  description: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
    flex: 1,
    marginLeft: 8,
  },
  quantityContainer: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 100,
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  quantityLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 12,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 4,
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  quantityButtonDisabled: {
    opacity: 0.5,
  },
  quantityText: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.text,
    minWidth: 40,
    textAlign: "center",
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingBottom: 55,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  totalContainer: {
    flex: 1,
  },
  totalLabel: {
    fontSize: 14,
    color: Colors.muted,
    marginBottom: 4,
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.green,
  },
  addToCartButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.orange,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    marginLeft: 12,
    shadowColor: Colors.orange,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  addToCartText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
    marginLeft: 8,
  },
  errorText: {
    fontSize: 18,
    color: Colors.red,
    textAlign: "center",
  },
});
