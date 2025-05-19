import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  StyleSheet,
  Image,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { RFValue } from "react-native-responsive-fontsize";
import { useQuery } from "@tanstack/react-query";
import { fetchHealthFinderReco } from "@/lib/api/api";
import { Dimensions } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

const HealthTipsList = () => {
  const [age, setAge] = useState(30);
  const [sex, setSex] = useState("female");
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["healthLiteracyData", age, sex],
    queryFn: () => fetchHealthFinderReco(age, sex),
  });

  /* if (isLoading) {
    return <ActivityIndicator size="large" />;
  } */

  /* if (isError) {
    return (
      <View style={styles.error}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  } */

  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>?/gm, "");
  };

  return (
    <ThemedView style={styles.tipsContainer}>
      <ThemedText type="subtitle" style={styles.header}>
        Preventive Health Tips
      </ThemedText>
      {data?.Result?.MyHFHeading && (
        <ThemedText style={{ flexWrap: "wrap" }}>
          {data.Result.MyHFHeading}
        </ThemedText>
      )}

      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : isError ? (
        <View style={styles.error}>
          <Text>Error: {error.message}</Text>
        </View>
      ) : (
        <View style={{ height: 200 }}>
          <FlatList
            data={data.Result?.Resources?.all?.Resource}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
            keyExtractor={(item) => item.Id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.articleContainer}
                onPress={() => {
                  if (item.AccessibleVersion) {
                    Linking.openURL(item.AccessibleVersion);
                  }
                }}
              >
                <View style={styles.tipBox}>
                  <ThemedText type="defaultSemiBold" style={{ color: "black" }}>
                    {item.Title}
                  </ThemedText>
                  <Text style={styles.articleDescription}>
                    {stripHtml(item.MyHFDescription)}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            nestedScrollEnabled={true}
            style={{ marginBottom: 10 }}
          />
        </View>
      )}
    </ThemedView>
  );
};
const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  tipsContainer: {
    gap: 8,
    backgroundColor: "#2e8a60",
    padding: 10,
    //borderRadius: 10,
    borderWidth: 1,
    overflow: "hidden",
    // flex: 1,
    width: screenWidth - 40,
    height: 600,
  },
  tipBox: {
    justifyContent: "space-around",
    margin: 10,
  },
  articleContainer: {
    borderRadius: 10,
    padding: 15,
    backgroundColor: "#77b3ff",
    margin: 10,
    flexGrow: 1,
    flexShrink: 1,
    flex: 0.5,
  },
  articleDescription: {
    marginTop: 5,
    flexWrap: "wrap",
    flexShrink: 1,
    color: "#444000",
  },
  header: {
    fontSize: RFValue(18),
  },
  error: {
    padding: 15,
    backgroundColor: "#ffcccc",
    borderRadius: 5,
  },
  image: {
    borderRadius: 8,
    width: RFValue(80),
    height: RFValue(80),
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
});

export default HealthTipsList;
