import { StyleSheet, View } from "react-native";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
import { blue, blue50 } from "../../utils/Constants";
import Chip from "../../../assets/svgs/Chip";
import CheckBox from "../CheckBox";

const Card = () => {
  const Shimmer = createShimmerPlaceholder(LinearGradient);

  const shimmerColors = ["#D0CAFF", blue50, "#A8B1FF"];

  return (
    <View style={styles.shimmerCard}>
      <Chip />
      <View style={styles.buffer} />
      <View style={styles.buffer} />
      <Shimmer
        width={220}
        shimmerStyle={styles.shimmerText}
        shimmerColors={shimmerColors}
      />
      <View style={styles.line1}>
        <View style={styles.horizontal1}>
          <View style={styles.buffer} />
          <View style={styles.buffer} />
          <Shimmer
            width={100}
            height={10}
            shimmerStyle={styles.shimmerText}
            shimmerColors={shimmerColors}
          ></Shimmer>
          <Shimmer
            width={50}
            height={10}
            shimmerStyle={styles.shimmerText}
            shimmerColors={shimmerColors}
          ></Shimmer>
        </View>
        <View style={styles.horizontal2}>
          <View style={styles.buffer} />
          <View style={styles.buffer} />
          <Shimmer
            width={70}
            height={10}
            shimmerStyle={styles.shimmerText}
            shimmerColors={shimmerColors}
          ></Shimmer>
          <Shimmer
            width={30}
            height={10}
            shimmerStyle={styles.shimmerText}
            shimmerColors={shimmerColors}
          ></Shimmer>
        </View>
      </View>
    </View>
  );
};

const ShimmerPayment = () => {
  return (
    <View style={styles.shimmerContianer}>
      <Card></Card>
      <View style={styles.checkbox}>
        <CheckBox disabled label="Use for payment" />
      </View>
      <Card></Card>
      <View style={styles.checkbox}>
        <CheckBox disabled label="Use for payment" />
      </View>
      <Card></Card>
    </View>
  );
};

const styles = StyleSheet.create({
  shimmerContianer: {
    height: "100%",
    alignItems: "center",
  },
  shimmerCard: {
    backgroundColor: "#ACA4FE",
    width: 320,
    height: 180,
    margin: 10,
    elevation: 10,
    borderRadius: 15,
    padding: 20,
    marginTop: 35,
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
  horizontal1: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  horizontal2: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
  checkbox: {
    alignSelf: "flex-start",
    marginLeft: 20,
  },
});

export default ShimmerPayment;
