import {
  Alert,
  Image,
  Platform,
  PushNotificationIOS,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { setReq } from "../features/api";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import EmptyImage from "../../assets/svgs//EmptyImage";
import mime from "mime";

const UploadImage = ({ flex }) => {
  const [img, setImg] = useState();
  const dispatch = useDispatch();
  const onPress = async () => {
    const resp = await ImagePicker.launchImageLibraryAsync({
      aspect: [1, 1],
    });
    console.log(resp);

    if (!resp.cancelled) {
      const name = resp.uri.substring(resp.uri.lastIndexOf("/") + 1);
      // const newImageUri = "file:" + resp.uri.split("file:/").join("");
      dispatch(
        setReq({
          property: "image",
          value: {
            name: name,
            type: mime.getType(resp.uri),
            uri: resp.uri,
          },
        })
      );
      setImg(resp.uri);
    } else {
      console.log(resp);
    }
  };

  return (
    <View
      style={{
        flex: flex,
        alignItems: "center",
        alignSelf: "stretch",
      }}
    >
      <TouchableOpacity
        style={styles.container}
        onPress={onPress}
        activeOpacity={0.5}
      >
        {img && <Image style={styles.image} source={{ uri: img }}></Image>}
        {!img && <EmptyImage width={150} height={150} />}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "lightgrey",
  },
  image: {
    width: "50%",
    height: null,
    aspectRatio: 1,
  },
});

export default UploadImage;
