import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Colors } from "../../components/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useRouter } from "expo-router";

type Props = {};

export default function SearchScreen(_props: Props) {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const categories = [
    { id: 1, name: "Burgers", icon: "🍔" },
    { id: 2, name: "Pizza", icon: "🍕" },
    { id: 3, name: "Sushi", icon: "🍣" },
    { id: 4, name: "Arabic", icon: "🥗" },
  ];
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Search</Text>
        <Text style={styles.subtitle}>
          Find restaurants, dishes, and cuisines quickly.
        </Text>

        {/* Search Input */}
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={24}
            color={Colors.muted}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Search for restaurants or dishes..."
            placeholderTextColor={Colors.muted}
            value={search}
            onChangeText={setSearch}
          />
          {search !== "" && (
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setSearch("");
              }}
            >
              <Ionicons name="close-circle" size={24} color={Colors.muted} />
            </TouchableOpacity>
          )}
        </View>

        {/* Categories */}
        <View style={styles.categoriesSection}>
          <Text
            style={[
              styles.sectionTitle,
              search !== "" && styles.sectionTitleSearching,
            ]}
          >
            Categories
          </Text>
          <View style={styles.categoriesGrid}>
            {categories.map((cat) => {
              return (
                <TouchableOpacity
                  key={cat.id}
                  style={[
                    styles.categoryCard,
                    search !== "" && styles.categoryCardSearching,
                  ]}
                  onPress={() => {
                    router.push("/home");
                  }}
                >
                  <Text
                    style={[
                      styles.categoryIcon,
                      search !== "" && styles.categoryIconSearching,
                    ]}
                  >
                    {cat.icon}
                  </Text>
                  <Text
                    style={[
                      styles.categoryName,
                      search !== "" && styles.categoryNameSearching,
                    ]}
                  >
                    {cat.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Search Results */}
        {search !== "" && (
          <View style={styles.resultsSection}>
            <Text style={styles.resultsTitle}>Searching for: "{search}"</Text>
            <View style={styles.emptyResults}>
              <Ionicons name="search" size={48} color={Colors.muted} />
              <Text style={styles.emptyResultsText}>
                No results found. Try a different search term.
              </Text>
            </View>
          </View>
        )}
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
  },
  closeButton: {
    marginLeft: 8,
    padding: 4,
  },
  categoriesSection: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 16,
  },
  sectionTitleSearching: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.muted,
    marginBottom: 12,
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  categoryCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    width: "47%",
    minHeight: 80,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryCardSearching: {
    borderRadius: 10,
    padding: 10,
    minHeight: 65,
    marginBottom: 10,
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
    opacity: 0.8,
  },
  categoryIcon: {
    fontSize: 28,
    marginBottom: 4,
  },
  categoryIconSearching: {
    fontSize: 22,
    marginBottom: 2,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.text,
    textAlign: "center",
  },
  categoryNameSearching: {
    fontSize: 12,
    fontWeight: "500",
    color: Colors.muted,
  },
  resultsSection: {
    marginTop: 8,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 24,
  },
  emptyResults: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 48,
  },
  emptyResultsText: {
    fontSize: 16,
    color: Colors.muted,
    textAlign: "center",
    marginTop: 16,
    lineHeight: 22,
  },
});
