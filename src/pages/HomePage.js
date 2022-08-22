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
import { useEffect, useRef, useState } from "react";
import api from "../utils/Api";
import SmallProduct from "../components/SmallProduct";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/user";
import { resetApi } from "../features/api";
import HomePageMenu from "../components/HomePageMenu";
import { SafeAreaView } from "react-native-safe-area-context";
import { selectItem } from "../features/cart";
import { init, validationSlice } from "../features/validation";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import { background, blue50 } from "../utils/Constants";
import Header from "../components/Header";

const HomePage = ({ route }) => {
  const navigation = useNavigation();
  const filterData = [
    { label: "Chair" },
    { label: "Cupboard" },
    { label: "Table" },
    { label: "Accessories" },
    { label: "Furniture" },
    { label: "Enlighte" },
  ];

  console.log(route.params);

  const { catId, catName, subCat, header } = route.params
    ? route.params
    : {
        catId: undefined,
        catName: undefined,
        subCat: [],
        header: "",
      };

  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [backPressCount, setBackPressCount] = useState(0);
  const navIndex = useNavigationState((s) => s.index);

  const [productList, setProductList] = useState(null);
  // const [searchData, setSearchData] = useState("");
  const fetchData = useRef(productList);

  const data = useSelector((state) => state.apiData.res);
  const dispatch = useDispatch();

  const loadData = async () => {
    //loading data on page load
    if (catId) {
      const result = await api("product/view/category", "post", { _id: catId });
      if (result && result.body) {
        // setSearchData(result.body.products);
        setProductList(result.body.products);
      }
    } else {
      const result = await api("product/view/list", "post", {});
      if (result && result.body) {
        // setSearchData(result.body.products);
        setProductList(result.body.products);
        fetchData.current = result.body.products;
      }
    }
  };

  useEffect(() => {
    loadData();
  }, [route.params]);

  useEffect(() => {
    //cleanup after login
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
      const newData = fetchData.current.filter((item) => {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = phrase.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      setProductList(newData);
      setSearchPhrase(phrase);
    } else {
      setProductList(fetchData.current);
      setSearchPhrase(phrase);
    }
  };

  const onFocus = () => {
    setClicked(true);
  };

  return (
    <View style={styles.container}>
      {/*Header vs Searchbar if category */}
      {catName ? (
        <Header
          back
          content={catName}
          onPress={() => {
            navigation.navigate("Categories", {
              subCat: route.params.subCat,
              prevHead: route.params.header,
            });
          }}
        />
      ) : (
        <SearchBar
          clicked={clicked}
          searchPhrase={searchPhrase}
          setClicked={setClicked}
          onFocus={onFocus}
          searchFilter={searchFilter}
        ></SearchBar>
      )}
      <View style={styles.horizontalFl}>
        {!catId && (
          <FlatList
            horizontal
            contentContainerStyle={styles.chipList}
            showsHorizontalScrollIndicator={false}
            data={filterData}
            renderItem={({ item, index, separators }) => {
              return (
                <View style={styles.chipContainer}>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => {
                      searchFilter(item.label);
                      setClicked(true);
                    }}
                  >
                    <Text style={styles.txt}>{item.label}</Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        )}
      </View>
      <View>
        <FlatList
          contentContainerStyle={styles.contentContainer}
          numColumns={2}
          data={productList}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
        />
      </View>
      <HomePageMenu
        homeP={catId ? false : true}
        categoriesPage={catId ? true : false}
      />
    </View>
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
