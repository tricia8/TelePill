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

  return (
    <ThemedView style={styles.tipsContainer}>
      <ThemedText type="subtitle" style={styles.header}>
        Preventive Health Tips
      </ThemedText>
      {data?.Result?.MyHFHeading && (
        <ThemedText>{data.Result.MyHFHeading}</ThemedText>
      )}

      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : isError ? (
        <View style={styles.error}>
          <Text>Error: {error.message}</Text>
        </View>
      ) : (
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
                  {item.MyHFDescription}
                </Text>
              </View>
              {/* <View>
                  {item.ImageUrl && (
                    <Image
                      source={{ uri: item.ImageUrl }}
                      style={styles.image}
                    />
                  )} 
                </View> */}
            </TouchableOpacity>
          )}
          nestedScrollEnabled={true}
        />
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  tipsContainer: {
    gap: 8,
    backgroundColor: "orchid",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    overflow: "hidden",
    // flex: 1,
    flexWrap: "wrap",
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
