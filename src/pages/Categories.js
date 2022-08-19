import { useEffect, useState } from "react";
import { Pressable, StyleSheet, ToastAndroid, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import CategoryCard from "../components/CategoryCard";
import Header from "../components/Header";
import HomePageMenu from "../components/HomePageMenu";
import api from "../utils/Api";
import { background } from "../utils/Constants";

const Categories = ({ navigation }) => {
  const [categories, setCategories] = useState([]);

  const loadData = async () => {
    const result = await api("category/view", "get", {});
    if (result.body) {
      setCategories(result.body.categories);
    } else {
      ToastAndroid.show("Network Error! Please reload", ToastAndroid.SHORT);
    }
  };
  useEffect(() => {
    loadData();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <Pressable onPress={onPress}>
        <CategoryCard name={item.name} image={item.image} />
      </Pressable>
    );
  };

  const onPress = () => {
    navigation.navigate("HomePage");
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header content={"Categories"} back></Header>
      <FlatList
        contentContainerStyle={styles.container}
        data={categories}
        extraData={categories}
        renderItem={renderItem}
      />
      <HomePageMenu categoriesPage />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: background,
  },
});

export default Categories;
