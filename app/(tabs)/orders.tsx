import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { pastOrders } from "../../data/pastOrders";
import { Colors } from "../../components/Colors";
import { Link } from "expo-router";

type Props = {};

export default function OrdersScreen(_props: Props) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Delivered":
        return "checkmark-circle";
      case "Preparing":
        return "restaurant";
      case "Cancelled":
        return "close-circle";
      default:
        return "help-circle";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return Colors.green;
      case "Preparing":
        return Colors.orange;
      case "Cancelled":
        return Colors.red;
      default:
        return Colors.muted;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerSection}>
        <View style={styles.headerIconContainer}>
          <Ionicons name="receipt" size={60} color={Colors.orange} />
        </View>
        <Text style={styles.headerTitle}>Orders History</Text>
        <Text style={styles.headerSubtitle}>
          {pastOrders.length} {pastOrders.length === 1 ? "order" : "orders"}
        </Text>
      </View>

      {pastOrders.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="receipt-outline" size={80} color={Colors.muted} />
          <Text style={styles.emptyStateText}>No orders yet</Text>
          <Text style={styles.emptyStateSubtext}>
            Your order history will appear here
          </Text>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {pastOrders.map((order, index) => {
            const statusColor = getStatusColor(order.status);
            const statusIcon = getStatusIcon(order.status);

            return (
              <Link
                href={`tracking/${order.id}/${`r` + (index + 1)}`}
                asChild={true}
                key={order.id}
              >
                <TouchableOpacity style={styles.orderCard} activeOpacity={0.7}>
                  <View style={styles.orderCardLeft}>
                    <View
                      style={[
                        styles.orderIconContainer,
                        { backgroundColor: statusColor + "20" },
                      ]}
                    >
                      <Ionicons
                        name={statusIcon as any}
                        size={28}
                        color={statusColor}
                      />
                    </View>
                    <View style={styles.orderInfo}>
                      <Text style={styles.restaurantName}>
                        {order.restaurant}
                      </Text>
                      <View style={styles.orderDetailsRow}>
                        <View style={styles.statusBadge}>
                          <Ionicons
                            name="ellipse"
                            size={8}
                            color={statusColor}
                          />
                          <Text
                            style={[styles.statusText, { color: statusColor }]}
                          >
                            {order.status}
                          </Text>
                        </View>
                        <Text style={styles.orderDate}>
                          {formatDate(order.date)}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.orderCardRight}>
                    <Text style={styles.orderTotal}>
                      {order.total.toFixed(2)} KD
                    </Text>
                    <Ionicons
                      name="chevron-forward"
                      size={20}
                      color={Colors.muted}
                    />
                  </View>
                </TouchableOpacity>
              </Link>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingBottom: 16,
  },
  headerSection: {
    alignItems: "center",
    paddingBottom: 16,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  headerIconContainer: {
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
    marginBottom: 8,
    textAlign: "center",
  },
  headerSubtitle: {
    fontSize: 16,
    color: Colors.muted,
    fontWeight: "500",
  },
  scrollView: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 16,
    color: Colors.muted,
    textAlign: "center",
  },
  orderCard: {
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
  orderCardLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  orderIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  orderInfo: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 8,
  },
  orderDetailsRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.background,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 4,
  },
  orderDate: {
    fontSize: 13,
    color: Colors.muted,
    fontWeight: "500",
  },
  orderCardRight: {
    alignItems: "flex-end",
    marginLeft: 12,
  },
  orderTotal: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.green,
    marginBottom: 4,
  },
});
