import { StyleSheet, View, Text, Image } from "react-native";
import Constants from "expo-constants";

const CategoryCard = ({ name = "...", image = "" }) => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.text}>{name}</Text>
      </View>
      <View style={styles.right}>
        {image && (
          <Image
            style={styles.image}
            source={{
              uri: Constants.manifest.extra.baseUrl + "/category/" + image,
            }}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 10,
    backgroundColor: "white",
    borderRadius: 8,
    marginHorizontal: 10,
    elevation: 10,
  },
  left: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  right: {
    flex: 1,
  },
  image: {
    height: 100,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  text: {
    fontSize: 22,
    textTransform: "capitalize",
    marginLeft: 30,
  },
});

export default CategoryCard;
