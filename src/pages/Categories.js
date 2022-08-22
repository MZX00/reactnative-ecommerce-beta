import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, ToastAndroid, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import CategoryCard from "../components/CategoryCard";
import Header from "../components/Header";
import HomePageMenu from "../components/HomePageMenu";
import api from "../utils/Api";
import { background } from "../utils/Constants";

const Categories = ({ route }) => {
  const navigation = useNavigation();

  const { subCat, prevHead } = route.params
    ? route.params
    : { subCat: undefined, prevHead: undefined };

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState();
  const [header, setHeader] = useState("Categories");

  const loadData = async () => {
    const result = await api("category/view", "get", {});
    if (result.body) {
      setCategories(result.body.categories);
    } else {
      ToastAndroid.show("Network Error! Please reload", ToastAndroid.SHORT);
    }
  };
  useEffect(() => {
    if (subCat) {
      setSubCategories(subCat);
      setHeader(prevHead);
    } else {
      loadData();
    }
  }, [subCat]);

  const headerOnPress = () => {
    setHeader("Categories");
    setSubCategories(undefined);
    loadData();
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
                setHeader(item.name);
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
              subCat: subCategories,
              header: header,
            });
          }
        }}
      >
        <CategoryCard name={item.name} image={item.image} />
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <Header
        content={header}
        back
        onPress={
          subCategories
            ? headerOnPress
            : () => {
                navigation.navigate("HomePage", {
                  catId: undefined,
                  catName: undefined,
                });
              }
        }
      ></Header>
      <FlatList
        contentContainerStyle={styles.container}
        data={subCategories ? subCategories : categories}
        extraData={[categories, subCategories]}
        renderItem={renderItem}
      />
      <HomePageMenu categoriesPage />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Categories;
