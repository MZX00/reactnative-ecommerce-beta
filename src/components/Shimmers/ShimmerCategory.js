import { StyleSheet, View } from "react-native";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
import { foreground } from "../../utils/Constants";

const Card = () => {
  const Shimmer = createShimmerPlaceholder(LinearGradient);
  return (
    <Shimmer
      style={styles.shimmerCard}
      shimmerColors={["lightgrey", "#E2E2E2", "white"]}
    />
  );
};

const ShimmerCategory = () => {
  return (
    <View style={styles.shimmerContianer}>
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </View>
  );
};

const styles = StyleSheet.create({
  shimmerCard: {
    width: "95%",
    height: 100,
    elevation: 7,
    borderRadius: 15,
    marginVertical: 10,
  },
  shimmerContianer: {
    flex: 1,
    alignItems: "center",
  },
  buffer: {
    marginVertical: 5,
  },
});

export default ShimmerCategory;
