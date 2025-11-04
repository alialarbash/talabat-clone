import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Colors } from "../../components/Colors";
import { Ionicons } from "@expo/vector-icons";

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: Colors.orange },
        headerTitleStyle: {
          color: "#fff",
          fontSize: 26,
          fontWeight: "bold",
        },
        tabBarActiveTintColor: Colors.orange,
        tabBarInactiveTintColor: Colors.muted,
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderTopColor: "#E0E0E0",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon(props) {
            return <Ionicons name="home" size={24} color={props.color} />;
          },
          headerRight: () => {
            return (
              <View style={{ marginRight: 16 }}>
                <TouchableOpacity
                  onPress={() => {
                    alert("Location: Kuwait City");
                  }}
                  activeOpacity={0.5}
                >
                  <Text
                    style={{ color: "#fff", fontSize: 18, fontWeight: 500 }}
                  >
                    📍 Location
                  </Text>
                </TouchableOpacity>
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon(props) {
            return (
              <Ionicons name="search-outline" size={24} color={props.color} />
            );
          },
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: "Orders",
          tabBarIcon(props) {
            return (
              <Ionicons name="receipt-outline" size={24} color={props.color} />
            );
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon(props) {
            return (
              <Ionicons name="person-outline" size={24} color={props.color} />
            );
          },
        }}
      />
    </Tabs>
  );
};

export default _layout;
