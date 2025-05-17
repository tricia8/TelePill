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
import { useQuery } from "@tanstack/react-query";
import { Card, Icon, Overlay } from "react-native-elements";

export default function HomeScreen() {
  const [news, setNews] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);
  const { country } = useLocalSearchParams(); // extracts country parameter from the URL parameters
  const [modalVisible, setModalVisible] = useState(false);
  const { data, error, isError, isSuccess, isLoading } = useQuery({
    queryKey: ["newsByCategory"],
    queryFn: () => fetchHealthNewsByCountry(country),
  });

  const router = useRouter();

  /* useEffect(() => {
    fetchNews();
  }, [selectedCountry]); */

  const renderItem = () => {};
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

                        /* router.push({
                            pathname: `/article`,
                            params: {
                              title: item.title,
                              desc: item.description,
                              content: item.content,
                              urlToImage: item.urlToImage,
                            },
                          }) */
                      >
                        <Card containerStyle={styles.cardContainer}>
                          <Card.Title>{item.title}</Card.Title>
                          <Card.Divider />
                          {item.urlToImage && (
                            <Card.Image
                              source={{ uri: item.urlToImage }}
                              style={styles.cardImage}
                            />
                          )}
                          <Text style={styles.articleDescription}>
                            {item.description}
                          </Text>
                        </Card>
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
                <View>
                  <Pressable>
                    <Ionicons
                      name="checkmark-circle"
                      size={32}
                      color="green"
                      onPress={() => setModalVisible(!modalVisible)}
                    />
                  </Pressable>
                </View>
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
});
