import {
  Image,
  FlatList,
  StyleSheet,
  Text,
  View,
  Alert,
  BackHandler,
  Modal,
  Pressable,
} from "react-native";
import LargeBlackButton from "../components/LargeBlackButton";
import Header from "../components/Header";
import CustomDropDown from "../components/CustomDropDown";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import { background, grey } from "../utils/Constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../utils/Api";
import Counter from "../components/Counter";
import Constants from "expo-constants";
import EmptyImage from "../../assets/svgs/EmptyImage";
import Close from "../../assets/svgs/Close";

const ViewProduct = ({ navigation }) => {
  const id = [{ id: 0 }, { id: 1 }, { id: 2 }];
  const admin = useSelector((state) => state.user.admin);

  const itemID = useSelector((state) => state.cart.selectedID);
  const quantity = useSelector((state) => {
    const i = state.cart.items.map((e) => e._id).indexOf(itemID);
    if (i != -1) {
      return state.cart.items[i].quantity;
    } else {
      return 0;
    }
  });

  const [data, setData] = useState();
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [imagePath, setImagePath] = useState("");

  const loadData = async () => {
    const result = await api("product/view", "post", { _id: itemID });
    if (result) {
      setData(result.body.product);
    } else {
      Alert.alert("Error", "Couldnt get product");
      navigation.navigate("HomePage");
    }
  };

  useEffect(() => {
    loadData();
  }, [itemID]);

  const openImage = () => {
    if (imagePath != "") {
      setModalOpen(true);
    }
  };

  const renderItems = ({ item }) => {
    switch (item.id) {
      case 0:
        if (data && data.image) {
          setImagePath(Constants.manifest.extra.baseUrl + data.image);
        }

        return (
          <TouchableOpacity onPress={openImage}>
            <View style={styles.imageContainer}>
              {data && data.image ? (
                <Image style={styles.image} source={{ uri: imagePath }}></Image>
              ) : (
                <EmptyImage height={300} width={300} />
              )}
            </View>
          </TouchableOpacity>
        );
      case 1:
        const sizeList = data
          ? data.size.map((value) => {
              return { label: value.toUpperCase(), value };
            })
          : [{ label: "loading", value: "loading" }];
        const colorList = data
          ? data.color.map((value) => {
              return { label: value.toUpperCase(), value };
            })
          : [{ label: "loading", value: "loading" }];

        return (
          <View style={styles.center}>
            <View style={styles.selectionContainer}>
              <CustomDropDown
                itemList={sizeList}
                placeholderText="Size"
                setResult={setSize}
              ></CustomDropDown>
              <CustomDropDown
                itemList={colorList}
                placeholderText="Color"
                setResult={setColor}
              ></CustomDropDown>
            </View>

            <View style={styles.productHeader}>
              <Text style={styles.productTitle}>
                {data ? data.name : "Loading..."}
              </Text>
              <Text style={styles.productSub}>
                {" "}
                {data ? data.brand : "Loading..."}
              </Text>
            </View>
            <Text style={styles.productPrice}>
              $ {data ? data.price : "..."}
            </Text>
          </View>
        );
      case 2:
        return (
          <Text style={styles.productDescription}>
            {" "}
            {data ? data.description : "..."}
          </Text>
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Modal visible={modalOpen} animationType="fade" transparent={true}>
        <View style={styles.modalContainer}>
          <Pressable
            style={styles.closeContainer}
            onPress={() => {
              console.log("Running");
              setModalOpen(false);
            }}
          >
            <Close />
          </Pressable>

          <Image style={styles.largeImage} source={{ uri: imagePath }}></Image>
        </View>
      </Modal>

      <Header content={data ? data.name : "Loading..."} flex={0} back={true} />
      <View flex={1}>
        <FlatList data={id} renderItem={renderItems}></FlatList>
      </View>
      <View
        style={[
          styles.floatingButton,
          quantity > 0 && { height: "8%", paddingBottom: 0 },
        ]}
      >
        {quantity === 0 && !admin && (
          <LargeBlackButton
            btnText="ADD TO CART"
            cartItem={
              data
                ? {
                    _id: itemID,
                    name: data.name,
                    stock: data.stock,
                    price: data.price,
                    image: data.image,
                    color: color,
                    size: size,
                  }
                : {}
            }
          ></LargeBlackButton>
        )}
        {quantity > 0 && !admin && (
          <Counter _id={itemID} count={quantity} big={true} />
        )}

        {admin && (
          <View style={styles.admin}>
            <LargeBlackButton btnText={"Edit"} flex={1}></LargeBlackButton>
            <LargeBlackButton btnText={"Delete"} flex={1}></LargeBlackButton>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: background,
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "stretch",
  },
  image: {
    width: 300,
    height: null,
    aspectRatio: 1,
    borderRadius: 20,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  center: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  selectionContainer: {
    width: "100%",
    flexDirection: "row",
    marginVertical: 15,
  },
  productHeader: {
    width: "50%",
    marginVertical: 5,
    paddingLeft: 15,
  },
  productTitle: {
    fontSize: 25,
    fontWeight: "bold",
  },
  productSub: {
    color: grey,
  },
  productPrice: {
    paddingRight: 15,
    width: "50%",
    textAlign: "right",
    textAlignVertical: "center",
    fontSize: 25,
    fontWeight: "bold",
  },
  productDescription: {
    flex: 1,
    fontSize: 16,
    marginLeft: 15,
    marginRight: 40,
    textAlign: "justify",
    marginTop: 15,
    paddingBottom: 100,
  },
  floatingButton: {
    position: "absolute",
    bottom: 0,
    paddingBottom: 15,
    height: "8%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    elevation: 10,
  },
  admin: {
    flexDirection: "row",
  },
  closeContainer: {
    width: 30,
    backgroundColor: "#ffffff",
    padding: 10,
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    borderRadius: 20,
  },
  largeImage: {
    width: "100%",
    height: null,
    aspectRatio: 1,
  },
  modalContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    justifyContent: "center",
  },
});

export default ViewProduct;
