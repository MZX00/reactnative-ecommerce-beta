import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, ToastAndroid, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import CategoryCard from "../components/CategoryCard";
import Header from "../components/Header";
import HomePageMenu from "../components/HomePageMenu";
import api from "../utils/Api";
import { background } from "../utils/Constants";

const Categories = () => {
  const navigation = useNavigation();

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState();
  const header = useRef("Categories");

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

  const headerOnPress = () => {
    header.current = "Categories";
    setSubCategories(undefined);
  };

  const renderItem = ({ item }) => {
    return (
      <Pressable
        onPress={async () => {
          if (!subCategories) {
            const result = await api("category/sub/view", "post", {
              _id: item._id,
            });
            if (result.body) {
              if (result.body.subCategories) {
                header.current = item.name;
                setSubCategories(result.body.subCategories);
              } else {
                navigation.navigate("HomePage", {
                  catId: item._id,
                  catName: item.name,
                });
              }
            }
          } else {
            navigation.navigate("HomePage", {
              catId: item._id,
              catName: item.name,
            });
          }
        }}
      >
        <CategoryCard name={item.name} image={item.image} />
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        content={header.current}
        back
        onPress={subCategories ? headerOnPress : undefined}
      ></Header>
      <FlatList
        contentContainerStyle={styles.container}
        data={subCategories ? subCategories : categories}
        extraData={[categories, subCategories]}
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
