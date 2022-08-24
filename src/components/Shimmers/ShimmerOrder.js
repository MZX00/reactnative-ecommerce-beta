import { ActivityIndicator, StyleSheet, View } from "react-native";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
import { blue, blue50, foreground, textBlue } from "../../utils/Constants";

const Card = () => {
  const Shimmer = createShimmerPlaceholder(LinearGradient);
  return (
    <View style={styles.shimmerCard}>
      <View style={styles.vertical}>
        <View style={styles.horizontal1}>
          <Shimmer width={150} shimmerStyle={styles.shimmerText} />
          <Shimmer width={50} shimmerStyle={styles.shimmerText} />
          <View style={styles.buffer} />
          <View style={styles.button}>
            <ActivityIndicator color={blue50} />
          </View>
        </View>

        <View style={styles.horizontal2}>
          <Shimmer width={70} shimmerStyle={styles.shimmerText} />

          <View style={styles.buffer} />
          <Shimmer width={120} shimmerStyle={styles.shimmerText} />
          <View style={styles.buffer} />

          <Shimmer width={70} shimmerStyle={styles.shimmerText} />
        </View>
      </View>
    </View>
  );
};

const ShimmerOrder = () => {
  return (
    <View style={styles.shimmerContianer}>
      <Card></Card>
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
    height: 140,
    margin: 10,
    elevation: 10,
    borderRadius: 10,
    padding: 20,
  },
  shimmerText: {
    marginBottom: 10,
  },
  buffer: {
    marginVertical: 5,
  },
  vertical: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  shimmerContianer: {
    flex: 1,
    alignItems: "center",
  },
  horizontal1: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  horizontal2: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    height: 35,
    width: 70,
    backgroundColor: blue,
    borderRadius: 15,
    margin: 5,
  },
});

export default ShimmerOrder;
