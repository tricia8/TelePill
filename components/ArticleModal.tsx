import {
  Modal,
  View,
  Image,
  Text,
  TouchableOpacity,
  Pressable,
  Linking,
  StyleSheet,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { ThemedText } from "@/components/ThemedText";

interface ArticleModalProps {
  isVisible: boolean; // modal visibility
  onClose: () => void;
  article: {
    title: string;
    urlToImage?: string;
    content?: string;
    url?: string;
  } | null;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  isVisible,
  onClose,
  article,
}) => {
  if (!article) return null;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.header}>
          <ThemedText
            type="defaultSemiBold"
            style={{ color: "white", gap: 10 }}
          >
            {article.title}
          </ThemedText>
          <Pressable onPress={onClose}>
            <AntDesign name="closecircle" size={32} color="black" />
          </Pressable>
        </View>

        {article.urlToImage && (
          <Image
            source={{ uri: article.urlToImage }}
            style={styles.cardImage}
          />
        )}

        <Text style={styles.articleDescription}>{article.content}</Text>

        <TouchableOpacity
          style={styles.readMoreButton}
          onPress={() => {
            if (article.url) {
              Linking.openURL(article.url);
            }
          }}
        >
          <Text style={{ color: "#012595" }}>Read Full Article</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    // flex: 1,
    backgroundColor: "#3b5b80",
    margin: 20,
    borderRadius: 10,
    padding: 20,
    justifyContent: "space-between",
    alignItems: "center",
    height: "60%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  cardImage: {
    height: 200,
    width: 400,
    objectFit: "contain",
    marginBottom: 10,
    borderRadius: 5,
  },
  articleDescription: {
    marginBottom: 10,
    color: "white",
  },
  readMoreButton: {
    padding: 9,
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
  },
});
