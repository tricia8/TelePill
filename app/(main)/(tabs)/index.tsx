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
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { fetchHealthNewsByCountry, fetchMultipleKeywords } from "@/lib/api/api";
import { useState } from "react";
import { useQueries, useQuery } from "@tanstack/react-query";
import { ArticleModal } from "@/components/ArticleModal";
import HealthTipsList from "@/components/HealthTipsList";
import { HealthNewsList } from "@/components/HealthNewsList";

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
  const [country, setCountry] = useState("us"); //dummy country
  const [modalVisible, setModalVisible] = useState(false);
  /* const { data, error, isError, isSuccess, isLoading } = useQuery({
    queryKey: ["newsByCategory"],
    queryFn: () => fetchHealthNewsByCountry(country),
  });

   { data, error, isLoading, isError } = useQuery({
      queryKey: ["campaignsByKeywords"],
      queryFn: () => fetchMultipleKeywords(country),
    }); */

  const results = useQueries({
    queries: [
      {
        queryKey: ["newsByCategory"],
        queryFn: () => fetchHealthNewsByCountry(country),
        staleTime: 5 * 60 * 1000, // cache for 5 minutes
        retry: 1,
      },
      {
        queryKey: ["campaignsByKeywords"],
        queryFn: () => fetchMultipleKeywords(country),
        staleTime: 5 * 60 * 1000, // cache for 5 minutes
      },
    ],
  });

  const [newsResult, campaignsResult] = results;

  const isLoading = campaignsResult.isLoading;
  const isError = newsResult.isError || campaignsResult.isError;

  /* useEffect(() => {
    fetchNews();
  }, [selectedCountry]); */

  return (
    <SafeAreaProvider style={styles.container}>
      {/* <ScrollView nestedScrollEnabled={true}> */}
      <View style={styles.titleContainer}>
        <ThemedText type="title">Hi there!</ThemedText>
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
            {/* Drop down picker for country default curr location*/}

            <HealthNewsList
              data={newsResult.data}
              error={newsResult.error}
              isError={newsResult.isError}
              isLoading={newsResult.isLoading}
            />
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
            Local Health Initiatives
          </ThemedText>
          <HealthNewsList
            data={campaignsResult.data}
            error={campaignsResult.error}
            isError={campaignsResult.isError}
            isLoading={campaignsResult.isLoading}
          />
        </ThemedView>
      </View>
      <ThemedView>
        <HealthTipsList />
      </ThemedView>
      {/* </ScrollView> */}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
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
    height: 300,
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
