import { StyleSheet, View } from "react-native";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";

const Card = () => {
  const Shimmer = createShimmerPlaceholder(LinearGradient);
  return <Shimmer shimmerStyle={styles.shimmerCard} />;
};

const ShimmerHomePage = () => (
  <View style={styles.shimmerContianer}>
    <Card />
    <Card />
    <Card />
    <Card />
    <Card />
    <Card />
  </View>
);

const styles = StyleSheet.create({
  shimmerCard: {
    width: 160,
    height: 200,
    margin: 10,
    borderRadius: 15,
    elevation: 7,
  },
  shimmerContianer: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default ShimmerHomePage;
