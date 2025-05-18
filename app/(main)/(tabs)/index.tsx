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
import { ArticleModal } from "@/components/ArticleModal";
import HealthTipsList from "@/components/HealthTipsList";

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

  return (
    <SafeAreaProvider style={styles.container}>
      {/*<ScrollView
        contentContainerStyle={styles.contentContainer}
        nestedScrollEnabled={true}
      > */}
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
            Your daily dose of health news in your area, or anywhere of interest
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
                nestedScrollEnabled={true}
                style={{ flex: 1 }}
              />
            )}
          </View>
          <ArticleModal
            isVisible={modalVisible}
            onClose={() => {
              setModalVisible(!modalVisible);
            }}
            article={selectedNews}
          />
        </ThemedView>

        <ThemedView style={styles.newsContainer}>
          <ThemedText type="subtitle" style={{ fontSize: RFValue(20) }}>
            Local Health Campaigns
          </ThemedText>
          <ThemedText style={styles.smallText}></ThemedText>
        </ThemedView>
      </View>
      <HealthTipsList />

      {/* <TouchableOpacity style={styles.listContainer}>
        <ThemedText type="subtitle">Preventive Health Tips</ThemedText>

      </TouchableOpacity> */}
      {/* </ScrollView> */}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  titleContainer: {
    // flex: 0.5,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    justifyContent: "space-between",
  },
  rowContainer: {
    height: "50%",
    marginTop: 8,
    marginBottom: 8,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "space-between",
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
    margin: 10,
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
    fontSize: RFValue(14),
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
