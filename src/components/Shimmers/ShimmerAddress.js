import { StyleSheet, View } from "react-native";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
import { foreground } from "../../utils/Constants";

const Card = () => {
  const Shimmer = createShimmerPlaceholder(LinearGradient);
  return (
    <View style={styles.shimmerCard}>
      <View style={styles.line1}>
        <Shimmer width={100} height={20} shimmerStyle={styles.shimmerText} />
      </View>
      <View style={styles.buffer} />
      <Shimmer width={250} shimmerStyle={styles.shimmerText} />
      <Shimmer width={200} shimmerStyle={styles.shimmerText} />
      <Shimmer width={80} shimmerStyle={styles.shimmerText} />
      <View style={styles.buffer} />
      <Shimmer width={180} shimmerStyle={styles.shimmerText} />
    </View>
  );
};

const ShimmerAddress = () => {
  return (
    <View style={styles.shimmerContianer}>
      <Card></Card>
      <Card></Card>
      <Card></Card>
    </View>
  );
};

const styles = StyleSheet.create({
  shimmerCard: {
    backgroundColor: foreground,
    width: 350,
    height: 200,
    margin: 10,
    elevation: 10,
    borderRadius: 15,
    padding: 20,
  },
  shimmerText: {
    marginBottom: 10,
  },
  buffer: {
    marginVertical: 5,
  },
  line1: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  shimmerContianer: {
    flex: 1,
    alignItems: "center",
  },
});

export default ShimmerAddress;
