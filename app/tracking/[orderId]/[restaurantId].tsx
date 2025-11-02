import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { restaurants } from "../../../data/restaurants";
import { Colors } from "../../../components/Colors";

type Props = {};

type OrderStatus =
  | "Order Placed"
  | "Preparing"
  | "Ready"
  | "Out for Delivery"
  | "Delivered";

export default function OrderTrackingScreen(_props: Props) {
  const { orderId, restaurantId } = useLocalSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<OrderStatus>("Preparing");

  const restaurant = restaurants.find((rest) => rest.id === restaurantId);

  const orderSteps: {
    key: OrderStatus;
    label: string;
    description: string;
    icon: string;
  }[] = [
    {
      key: "Order Placed",
      label: "Order Placed",
      description: "Your order has been confirmed",
      icon: "checkmark-circle",
    },
    {
      key: "Preparing",
      label: "Preparing",
      description: "Preparing your food",
      icon: "restaurant",
    },
    {
      key: "Ready",
      label: "Ready",
      description: "Your food is ready",
      icon: "checkmark-done-circle",
    },
    {
      key: "Out for Delivery",
      label: "Out for Delivery",
      description: "Your food is on the way",
      icon: "bicycle",
    },
    {
      key: "Delivered",
      label: "Delivered",
      description: "Your food is delivered",
      icon: "home",
    },
  ];

  const getCurrentStatusIndex = () => {
    return orderSteps.findIndex((step) => step.key === status);
  };

  const currentIndex = getCurrentStatusIndex();

  const getStatusText = () => {
    switch (status) {
      case "Preparing":
        return "Preparing your Food";
      case "Ready":
        return "Your Food is Ready";
      case "Out for Delivery":
        return "Your Food is on the Way";
      case "Delivered":
        return "Your Food is Delivered";
      default:
        return "Order Placed";
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Success Header */}
        <View style={styles.headerSection}>
          <View style={styles.successIconContainer}>
            <Ionicons name="checkmark-circle" size={80} color={Colors.green} />
          </View>
          <Text style={styles.successTitle}>Order Placed!</Text>
          <Text style={styles.orderNumber}>Order #{orderId}</Text>
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
        </View>

        {/* Status Card */}
        <View style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <Ionicons
              name={
                status === "Delivered"
                  ? "checkmark-circle"
                  : status === "Out for Delivery"
                  ? "bicycle"
                  : "time-outline"
              }
              size={24}
              color={Colors.green}
            />
            <Text style={styles.statusTitle}>Current Status</Text>
          </View>
          <Text style={styles.statusText}>{getStatusText()}</Text>
          {restaurant && (
            <View style={styles.deliveryTimeContainer}>
              <Ionicons name="time-outline" size={18} color={Colors.orange} />
              <Text style={styles.deliveryTime}>
                Estimated delivery: {restaurant.deliveryTime}
              </Text>
            </View>
          )}
        </View>

        {/* Order Progress Timeline */}
        <View style={styles.progressCard}>
          <View style={styles.cardHeader}>
            <Ionicons name="list-outline" size={24} color={Colors.text} />
            <Text style={styles.cardTitle}>Order Progress</Text>
          </View>

          <View style={styles.timelineContainer}>
            {orderSteps.map((step, index) => {
              const isCompleted = index <= currentIndex;
              const isCurrent = index === currentIndex;
              const isLast = index === orderSteps.length - 1;

              return (
                <View key={step.key} style={styles.timelineItem}>
                  <View style={styles.timelineLeft}>
                    <View
                      style={[
                        styles.timelineIconContainer,
                        isCompleted && styles.timelineIconContainerActive,
                      ]}
                    >
                      <Ionicons
                        name={step.icon as any}
                        size={20}
                        color={isCompleted ? "#FFFFFF" : Colors.muted}
                      />
                    </View>
                    {!isLast && (
                      <View
                        style={[
                          styles.timelineLine,
                          isCompleted && styles.timelineLineActive,
                        ]}
                      />
                    )}
                  </View>
                  <View style={styles.timelineContent}>
                    <Text
                      style={[
                        styles.timelineLabel,
                        isCompleted && styles.timelineLabelActive,
                      ]}
                    >
                      {step.label}
                    </Text>
                    <Text style={styles.timelineDescription}>
                      {step.description}
                    </Text>
                    {isCurrent && (
                      <View style={styles.currentBadge}>
                        <Text style={styles.currentBadgeText}>Current</Text>
                      </View>
                    )}
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.viewOrdersButton}
          onPress={() => {
            router.push("/orders");
          }}
          activeOpacity={0.8}
        >
          <Ionicons name="list" size={20} color="#FFFFFF" />
          <Text style={styles.viewOrdersText}>View All Orders</Text>
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
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  successIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: Colors.green,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  successTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: Colors.green,
    marginBottom: 8,
    textAlign: "center",
  },
  orderNumber: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 16,
  },
  restaurantInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    marginLeft: 6,
  },
  statusCard: {
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
  statusHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  statusTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.text,
    marginLeft: 8,
  },
  statusText: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.green,
    marginBottom: 16,
  },
  deliveryTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.background,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 8,
  },
  deliveryTime: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.text,
    marginLeft: 6,
  },
  progressCard: {
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
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.text,
    marginLeft: 8,
  },
  timelineContainer: {
    marginLeft: 8,
  },
  timelineItem: {
    flexDirection: "row",
    marginBottom: 24,
  },
  timelineLeft: {
    alignItems: "center",
    marginRight: 16,
  },
  timelineIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.muted,
  },
  timelineIconContainerActive: {
    backgroundColor: Colors.green,
    borderColor: Colors.green,
  },
  timelineLine: {
    width: 2,
    height: 40,
    backgroundColor: "#E0E0E0",
    marginTop: 4,
  },
  timelineLineActive: {
    backgroundColor: Colors.green,
  },
  timelineContent: {
    flex: 1,
    paddingTop: 4,
  },
  timelineLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.muted,
    marginBottom: 4,
  },
  timelineLabelActive: {
    color: Colors.text,
  },
  timelineDescription: {
    fontSize: 14,
    color: Colors.muted,
    lineHeight: 20,
  },
  currentBadge: {
    alignSelf: "flex-start",
    backgroundColor: Colors.orange,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginTop: 6,
  },
  currentBadgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FFFFFF",
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
  viewOrdersButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.orange,
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: Colors.orange,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  viewOrdersText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
    marginLeft: 8,
  },
});
