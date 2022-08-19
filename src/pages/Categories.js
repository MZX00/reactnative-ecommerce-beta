import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HomePageMenu from "../components/HomePageMenu";

const Categories = () => {
  return (
    <SafeAreaView style={styles.container}>
      <HomePageMenu categoriesPage />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Categories;
