import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, Text, Pressable } from "react-native";
import Forward from "../../assets/svgs/Forward";
import { foreground, grey } from "../utils/Constants";

const ProfileComponent = ({ mainText, secText, goTo }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.names}>
        <Text style={styles.mainText}>{mainText}</Text>
        <Text style={styles.secText}>{secText}</Text>
      </View>
      <Pressable
        style={styles.back}
        onPress={() => {
          navigation.navigate(goTo);
        }}
      >
        <Forward />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: foreground,
    marginLeft: 20,
    marginVertical: 10,
    marginRight: 20,
    elevation: 4,
    borderRadius: 10,
  },
  names: {
    margin: 20,
    elevation: 5,
  },
  mainText: {
    fontSize: 16,
  },
  secText: {
    color: grey,
    fontSize: 11,
  },
  back: {
    padding: 10,
  },
});

export default ProfileComponent;
