import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../components/Colors";

type Props = {};

export default function SettingsScreen(_props: Props) {
  const settings = [
    {
      id: 1,
      name: "Notifications",
      icon: "notifications",
      description: "Configure notifications for your account",
    },
    {
      id: 2,
      name: "Payment Methods",
      icon: "card",
      description: "Manage your payment methods",
    },
    {
      id: 3,
      name: "App Preferences",
      icon: "settings",
      description: "Configure app preferences",
    },
    {
      id: 4,
      name: "Privacy Policy",
      icon: "lock-closed",
      description: "View our privacy policy",
    },
    {
      id: 5,
      name: "Terms of Service",
      icon: "document-text",
      description: "View our terms of service",
    },
    {
      id: 6,
      name: "About",
      icon: "information-circle",
      description: "About the app",
    },
  ];
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>
          Configure notifications, payment methods, and app preferences.
        </Text>

        {settings.map((set) => {
          return (
            <TouchableOpacity
              key={set.id}
              style={styles.settingItem}
              activeOpacity={0.8}
            >
              <View style={styles.settingContent}>
                <View style={styles.settingIconContainer}>
                  <Ionicons
                    name={set.icon as any}
                    size={24}
                    color={Colors.orange}
                  />
                </View>
                <View style={styles.settingTextContainer}>
                  <Text style={styles.settingName}>{set.name}</Text>
                  <Text style={styles.settingDescription}>
                    {set.description}
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={24} color={Colors.muted} />
            </TouchableOpacity>
          );
        })}

        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Version 0.0.1</Text>
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
  scrollContent: {
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 48,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: Colors.red,
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: Colors.text,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
  },
  settingItem: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  settingIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFF3E0",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingName: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: Colors.muted,
    lineHeight: 20,
  },
  versionContainer: {
    marginTop: 24,
    paddingTop: 24,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  versionText: {
    fontSize: 14,
    color: Colors.muted,
    fontWeight: "500",
  },
});
