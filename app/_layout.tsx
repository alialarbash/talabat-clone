import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { router, Stack, useRouter } from "expo-router";
import React from "react";
import { Colors } from "../components/Colors";
import Svg, { Path } from "react-native-svg";
import { Ionicons } from "@expo/vector-icons";

function BackButton() {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.back()}
      style={{ paddingRight: 24 }}
    >
      <Svg width={24} height={24} viewBox="0 0 24 24">
        <Path
          d="M15 18l-6-6 6-6"
          stroke="#fff"
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </TouchableOpacity>
  );
}

const _layout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.orange,
        },
        headerTitleStyle: {
          fontSize: 24,
          fontWeight: "bold",
          color: "#fff",
        },
        statusBarStyle: "light",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Talabat",

          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="home"
        options={{
          title: "Home",

          headerTitleAlign: "left",
          headerBackVisible: false,
          headerLeft: () => <BackButton />,
        }}
      />
      <Stack.Screen
        name="restaurant/[id]"
        options={{
          title: "Menu",

          headerTitleAlign: "left",
          headerBackVisible: false,
          headerLeft: () => <BackButton />,
        }}
      />
      <Stack.Screen
        name="item/[id]/[restaurantId]"
        options={{
          title: "Item",

          headerTitleAlign: "left",
          headerBackVisible: false,
          headerLeft: () => <BackButton />,
        }}
      />
      <Stack.Screen
        name="cart/[id]/[quantity]/[restaurantId]"
        options={{
          title: "Cart",

          headerTitleAlign: "left",
          headerBackVisible: false,
          headerLeft: () => <BackButton />,
        }}
      />
      <Stack.Screen
        name="tracking/[orderId]/[restaurantId]"
        options={{
          title: "Tracking",

          headerTitleAlign: "left",
          headerBackVisible: false,
          headerLeft: () => <BackButton />,
          headerRight: () => {
            return (
              <TouchableOpacity
                onPress={() => router.push("/home")}
                activeOpacity={0.8}
              >
                <Ionicons name="home" size={24} color="white" />
              </TouchableOpacity>
            );
          },
        }}
      />
      <Stack.Screen
        name="orders"
        options={{
          title: "Orders",

          headerTitleAlign: "left",
          headerBackVisible: false,
          headerLeft: () => <BackButton />,
        }}
      />
      <Stack.Screen
        name="search"
        options={{
          title: "Search",

          headerTitleAlign: "left",
          headerBackVisible: false,
          headerLeft: () => <BackButton />,
        }}
      />
      <Stack.Screen
        name="profile"
        options={{
          title: "Profile",

          headerTitleAlign: "left",
          headerBackVisible: false,
          headerLeft: () => <BackButton />,
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          title: "Settings",

          headerTitleAlign: "left",
          headerBackVisible: false,
          headerLeft: () => <BackButton />,
        }}
      />
    </Stack>
  );
};

export default _layout;

const styles = StyleSheet.create({});
