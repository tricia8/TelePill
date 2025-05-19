// components/HealthNewsList.tsx
import { useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useQuery } from "@tanstack/react-query";
import { ThemedText } from "@/components/ThemedText";
import { ArticleModal } from "@/components/ArticleModal";
import { ThemedView } from "./ThemedView";

interface NewsArticle {
  author: string;
  title: string;
  url: string;
  urlToImage?: string;
  description?: string;
  content?: string;
}

interface Props {
  data?: { articles: NewsArticle[] };
  error?: Error | null;
  isError: boolean;
  isLoading: boolean;
}

export const HealthNewsList: React.FC<Props> = ({
  data,
  error,
  isError,
  isLoading,
}) => {
  const [selectedNews, setSelectedNews] = useState<NewsArticle | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={{ height: 300 }}>
      {" "}
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : isError ? (
        <View>
          <Text>Error: {error?.message || "An unknown error occurred"}</Text>
        </View>
      ) : !data?.articles?.length ? (
        <Text style={styles.error}>No articles found.</Text>
      ) : (
        <FlatList
          data={data?.articles}
          keyExtractor={(item) => item.url}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.articleContainer}
              onPress={() => {
                setSelectedNews(item);
                setModalVisible(true);
              }}
            >
              <ThemedText type="defaultSemiBold" style={{ color: "black" }}>
                {item.title}
              </ThemedText>
              {item.urlToImage && (
                <Image source={{ uri: item.urlToImage }} style={styles.image} />
              )}
              <ThemedText style={styles.articleDescription}>
                {item.description}
              </ThemedText>
            </TouchableOpacity>
          )}
        />
      )}
      <ArticleModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(!modalVisible)}
        article={selectedNews}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  articleContainer: {
    borderRadius: 10,
    padding: 15,
    backgroundColor: "#5faaff",
    margin: 10,
  },
  image: {
    height: 200,
    marginVertical: 10,
    borderRadius: 5,
  },
  articleDescription: {
    fontSize: RFValue(12),
    color: "#001146",
  },
  error: {
    color: "#792a3c",
    fontSize: RFValue(13),
  },
});
