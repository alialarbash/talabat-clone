import Reactr from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { menuItems } from "../../../../data/menuItems";
import { restaurants } from "../../../../data/restaurants";
import { Colors } from "../../../../components/Colors";

type Props = {};

export default function CartScreen(_props: Props) {
  const { id, restaurantId, quantity } = useLocalSearchParams();
  const router = useRouter();
  const deliveryFee = 0.5;
  const orderId = Math.floor(Math.random() * 1000000);

  const item = menuItems.find((item) => item.id === id);
  const restaurant = restaurants.find((rest) => rest.id === restaurantId);

  const subtotal = (item?.price ?? 0) * Number(quantity);
  const total = subtotal + deliveryFee;

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.headerSection}>
          <View style={styles.cartIconContainer}>
            <Ionicons name="cart" size={60} color={"#E63946"} />
          </View>
          <Text style={styles.headerTitle}>Shopping Cart</Text>
          {restaurant && (
            <View style={styles.restaurantInfoContainer}>
              <Ionicons
                name="restaurant-outline"
                size={18}
                color={Colors.muted}
              />
              <Text style={styles.restaurantName}>{restaurant.name}</Text>
            </View>
          )}
          {restaurant && (
            <Text style={styles.cuisineType}>{restaurant.cuisine}</Text>
          )}
        </View>

        {/* Order Details Card */}
        <View style={styles.orderCard}>
          <View style={styles.cardHeader}>
            <Ionicons name="receipt-outline" size={24} color={Colors.text} />
            <Text style={styles.cardTitle}>Your Order</Text>
          </View>

          {item && (
            <View style={styles.orderItemContainer}>
              <View style={styles.orderItemLeft}>
                <View style={styles.orderItemIconContainer}>
                  <Ionicons
                    name="restaurant-outline"
                    size={24}
                    color={"#E63946"}
                  />
                </View>
                <View style={styles.orderItemInfo}>
                  <Text style={styles.orderItemName}>{item.name}</Text>
                  <Text style={styles.orderItemDescription} numberOfLines={2}>
                    {item.description}
                  </Text>
                  <View style={styles.orderItemDetails}>
                    <View style={styles.quantityBadge}>
                      <Ionicons
                        name="albums-outline"
                        size={14}
                        color={Colors.text}
                      />
                      <Text style={styles.quantityBadgeText}>x{quantity}</Text>
                    </View>
                    <View style={styles.priceRow}>
                      <Text style={styles.priceText}>
                        {item.price.toFixed(2)} KD
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          )}

          {/* Price Breakdown */}
          <View style={styles.priceBreakdown}>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Item Total</Text>
              <Text style={styles.priceValue}>
                {item?.price.toFixed(2)} x {quantity}
              </Text>
            </View>
            <View style={styles.priceRowTotal}>
              <Text style={styles.priceLabelBold}>Subtotal</Text>
              <Text style={styles.priceValueBold}>
                {subtotal.toFixed(2)} KD
              </Text>
            </View>
          </View>
        </View>

        {/* Order Summary Card */}
        <View style={styles.summaryCard}>
          <View style={styles.cardHeader}>
            <Ionicons name="calculator-outline" size={24} color={Colors.text} />
            <Text style={styles.cardTitle}>Order Summary</Text>
          </View>

          <View style={styles.summaryRow}>
            <View style={styles.summaryRowLeft}>
              <Ionicons
                name="pricetag-outline"
                size={18}
                color={Colors.muted}
              />
              <Text style={styles.summaryLabel}>Subtotal</Text>
            </View>
            <Text style={styles.summaryValue}>{subtotal.toFixed(2)} KD</Text>
          </View>

          <View style={styles.summaryRow}>
            <View style={styles.summaryRowLeft}>
              <Ionicons name="bicycle-outline" size={18} color={Colors.muted} />
              <Text style={styles.summaryLabel}>Delivery Fee</Text>
            </View>
            <Text style={styles.summaryValue}>{deliveryFee.toFixed(2)} KD</Text>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.totalRow}>
            <View style={styles.totalRowLeft}>
              <Ionicons name="cash-outline" size={22} color={Colors.green} />
              <Text style={styles.totalLabel}>Total</Text>
            </View>
            <Text style={styles.totalValue}>{total.toFixed(2)} KD</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.placeOrderButton}
          onPress={() => {
            router.push(`tracking/${orderId}/${restaurantId}`);
          }}
          activeOpacity={0.8}
        >
          <Ionicons name="checkmark-circle" size={24} color="#FFFFFF" />
          <Text style={styles.placeOrderText}>Place Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    paddingBottom: 150,
  },
  headerSection: {
    alignItems: "center",
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  cartIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
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
  headerTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 12,
    textAlign: "center",
  },
  restaurantInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    marginLeft: 6,
  },
  cuisineType: {
    fontSize: 14,
    color: Colors.muted,
    fontWeight: "500",
  },
  orderCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginTop: 8,
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.text,
    marginLeft: 8,
  },
  orderItemContainer: {
    marginBottom: 16,
  },
  orderItemLeft: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  orderItemIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  orderItemInfo: {
    flex: 1,
  },
  orderItemName: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 6,
  },
  orderItemDescription: {
    fontSize: 14,
    color: Colors.muted,
    lineHeight: 20,
    marginBottom: 12,
  },
  orderItemDetails: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  quantityBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.background,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  quantityBadgeText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.text,
    marginLeft: 4,
  },
  priceText: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.green,
  },
  priceBreakdown: {
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    paddingTop: 16,
    marginTop: 8,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  priceRowTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  priceLabel: {
    fontSize: 14,
    color: Colors.muted,
  },
  priceValue: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.text,
  },
  priceLabelBold: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
  },
  priceValueBold: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.green,
  },
  summaryCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  summaryRowLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  summaryLabel: {
    fontSize: 16,
    color: Colors.text,
    marginLeft: 8,
    fontWeight: "500",
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 12,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  totalRowLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  totalLabel: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.text,
    marginLeft: 8,
  },
  totalValue: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.green,
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  placeOrderButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.green,
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: Colors.green,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  placeOrderText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
    marginLeft: 8,
  },
});
