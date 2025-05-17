import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Modal,
  Pressable,
  Image,
  Linking,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SearchBar } from "react-native-screens";
import { fetchHealthNewsByCountry } from "@/lib/api/api";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { QueryClientProvider, useQuery } from "@tanstack/react-query";

export default function HomeScreen() {
  // const [news, setNews] = useState([]);
  interface NewsArticle {
    author: string;
    title: string;
    url: string;
    urlToImage?: string;
    description?: string;
    content?: string;
  }

  const [selectedNews, setSelectedNews] = useState<NewsArticle | null>(null);
  // const { country } = useLocalSearchParams(); // extracts country parameter from the URL parameters (or: retrieve from firebase)
  const country = "us"; //dummy country
  const [modalVisible, setModalVisible] = useState(false);
  const { data, error, isError, isSuccess, isLoading } = useQuery({
    queryKey: ["newsByCategory"],
    queryFn: () => fetchHealthNewsByCountry(country),
  });

  const router = useRouter();

  /* useEffect(() => {
    fetchNews();
  }, [selectedCountry]); */

  /* if (isError) {
    return (
      <View style={styles.error}>
        <Text>Error: {error?.message}</Text>
      </View>
    );
  } */

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
              Your daily dose of health news in your area, or anywhere of
              interest
            </ThemedText>
            <View>
              <SearchBar></SearchBar>
              {/* Drop down picker for country default curr location*/}

              {isLoading ? (
                <ActivityIndicator size="large" />
              ) : isError ? (
                <View style={styles.error}>
                  <Text>Error: {error.message}</Text>
                </View>
              ) : (
                <FlatList
                  data={data.articles}
                  keyExtractor={(item) => item.url}
                  renderItem={({ item }) => {
                    return (
                      <TouchableOpacity
                        style={styles.articleContainer}
                        onPress={() => {
                          setSelectedNews(item);
                          setModalVisible(true);
                        }}
                      >
                        <ThemedText type="defaultSemiBold">
                          {item.title}
                        </ThemedText>
                        {item.urlToImage && (
                          <Image
                            source={{ uri: item.urlToImage }}
                            style={styles.cardImage}
                          />
                        )}
                        <Text style={styles.articleDescription}>
                          {item.description}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                ></FlatList>
              )}
            </View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <View>
                <View style={{ flexDirection: "row" }}>
                  <ThemedText type="defaultSemiBold">
                    {selectedNews?.title}
                  </ThemedText>
                  <Pressable>
                    <Ionicons
                      name="checkmark-circle"
                      size={32}
                      color="green"
                      onPress={() => setModalVisible(!modalVisible)}
                    />
                  </Pressable>
                </View>
                <Image
                  source={{ uri: selectedNews?.urlToImage }}
                  style={styles.cardImage}
                />
                <Text style={styles.articleDescription}>
                  {selectedNews?.content}
                </Text>
                <TouchableOpacity
                  style={styles.readMoreButton}
                  onPress={() => {
                    if (selectedNews?.url) {
                      Linking.openURL(selectedNews.url);
                    }
                  }}
                >
                  <Text>Read Full Article</Text>
                </TouchableOpacity>
              </View>
            </Modal>
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
  articleContainer: {
    borderRadius: 10,
    padding: 15,
    backgroundColor: "#5faaff",
  },
  cardContainer: {
    borderRadius: 8,
    elevation: 3,
    marginBottom: 15,
  },
  cardImage: {
    height: 200,
    marginBottom: 10,
    borderRadius: 5,
  },
  articleDescription: {},
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
  error: {},
  readMoreButton: {
    padding: 8,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
});
