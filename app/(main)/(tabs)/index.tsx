import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaProvider style={styles.container}>
      <ScrollView>
        <View style={styles.titleContainer}>
          <ThemedText type="title">Hi there!</ThemedText>
          <TouchableOpacity>
            <Ionicons name="notifications" size={24} color="gold" />
          </TouchableOpacity>
        </View>

        <View style={styles.rowContainer}>
          <ThemedView style={styles.newsContainer}>
            <ThemedText type="subtitle" style={styles.header}>
              Latest News
            </ThemedText>
            <ThemedText style={[styles.smallText]}>
              Your daily dose of health news in your area
            </ThemedText>
            <View>
              <Text>News Feed Placeholder</Text>
            </View>
          </ThemedView>

          <ThemedView style={styles.newsContainer}>
            <ThemedText type="subtitle" style={{ fontSize: RFValue(20) }}>
              Local Health Campaigns
            </ThemedText>
            <ThemedText style={styles.smallText}></ThemedText>
          </ThemedView>
        </View>

        <TouchableOpacity style={styles.listContainer}>
          <ThemedText type="subtitle">Preventive Health Tips</ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 40,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    justifyContent: "space-between",
  },
  rowContainer: {
    marginTop: 15,
    marginBottom: 8,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "center",
  },
  newsContainer: {
    gap: 8,
    backgroundColor: "coral",
    padding: 10,
    flexBasis: "48%",
    minWidth: 150,
    flexGrow: 1,
    flexShrink: 1,
    borderRadius: 10,
    borderWidth: 1,
  },
  listContainer: {
    gap: 8,
    padding: 10,
    backgroundColor: "orchid",
  },
  header: {
    fontSize: RFValue(20),
  },
  largeText: {
    fontSize: RFValue(20),
  },
  smallText: {
    fontSize: RFValue(15),
    fontStyle: "italic",
  },
});
