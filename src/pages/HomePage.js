import {
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
  Text,
  BackHandler,
  ToastAndroid,
} from "react-native";
import SearchBar from "../components/SearchBar";
import { useEffect, useState } from "react";
import api from "../utils/Api";
import SmallProduct from "../components/SmallProduct";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/user";
import { resetApi } from "../features/api";
import HomePageMenu from "../components/HomePageMenu";
import { SafeAreaView } from "react-native-safe-area-context";
import { selectItem } from "../features/cart";
import { init, validationSlice } from "../features/validation";
import { useNavigationState } from "@react-navigation/native";
import { background, blue50 } from "../utils/Constants";

const HomePage = ({ navigation }) => {
  const filterData = [
    { label: "Chair" },
    { label: "Cupboard" },
    { label: "Table" },
    { label: "Accessories" },
    { label: "Furniture" },
    { label: "Enlighte" },
  ];

  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [backPressCount, setBackPressCount] = useState(0);
  const navIndex = useNavigationState((s) => s.index);

  const [productList, setProductList] = useState(null);
  const [searchData, setSearchData] = useState("");

  const data = useSelector((state) => state.apiData.res);
  const dispatch = useDispatch();

  const loadData = async () => {
    const result = await api("product/view/list", "post", {});
    if (result && result.body) {
      setProductList(result.body.products);
    }
  };

  useEffect(() => {
    if (data.token) {
      dispatch(login(data));
      dispatch(resetApi());
    }
    loadData();
  }, []);

  const handleBackPress = () => {
    if (navIndex === 0) {
      if (backPressCount === 0) {
        setBackPressCount((prevCount) => prevCount + 1);
        setTimeout(() => setBackPressCount(0), 2000);
        ToastAndroid.show("Press one more time to exit", ToastAndroid.SHORT);
      } else if (backPressCount === 1) {
        BackHandler.exitApp();
      }
    } else {
      dispatch(init(0));
      navigation.goBack();
    }

    return true;
  };

  useEffect(() => {
    const backListner = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
  }, [handleBackPress]);

  const renderItem = ({ item, index, separators }) => {
    return (
      <TouchableOpacity
        style={{ flex: 1 }}
        activeOpacity={1}
        onPress={() => {
          dispatch(selectItem(item._id));
          navigation.navigate("ViewProduct");
        }}
      >
        <SmallProduct product={item} />
      </TouchableOpacity>
    );
  };

  const searchFilter = (phrase) => {
    if (phrase) {
      const newData = productList.filter((item) => {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = phrase.toUpperCase();
        console.log("item.name");
        console.log(item.name);
        return itemData.indexOf(textData) > -1;
      });

      console.log("new Data");
      console.log(newData);
      setSearchData(newData);
      console.log("Phrase");
      console.log(phrase);
      setSearchPhrase(phrase);
    } else {
      setSearchData(productList);
      setSearchPhrase(phrase);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        clicked={clicked}
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        setClicked={setClicked}
        searchFilter={searchFilter}
      ></SearchBar>
      <View style={styles.horizontalFl}>
        <FlatList
          horizontal
          contentContainerStyle={styles.chipList}
          showsHorizontalScrollIndicator={false}
          data={filterData}
          renderItem={({ item, index, separators }) => {
            return (
              <View style={styles.chipContainer}>
                <TouchableOpacity activeOpacity={0.5}>
                  <Text style={styles.txt}>{item.label}</Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
      <View>
        <FlatList
          contentContainerStyle={styles.contentContainer}
          numColumns={2}
          data={searchData}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
        />
      </View>
      <HomePageMenu homeP={true} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  horizontalFl: {
    marginHorizontal: 5,
    marginTop: 10,
  },
  filterComponent: {
    marginHorizontal: 20,
  },
  contentContainer: {
    paddingBottom: 180,
  },

  head: {
    marginTop: 5,
  },
  chipList: {
    paddingBottom: 5,
  },

  container: {
    flex: 1,
    backgroundColor: background,
  },
  chipContainer: {
    elevation: 5,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: blue50,
    marginHorizontal: 5,
  },
  txt: {
    color: "#ffffff",
    fontSize: 11,
  },
});

export default HomePage;
