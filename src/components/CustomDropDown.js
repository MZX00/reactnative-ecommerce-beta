import { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import {
  blue,
  grey,
  marginHorizontal,
  marginVertical,
} from "../utils/Constants";

const CustomDropDown = ({ placeholderText, type, required }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState([]);
  const [searchPlaceholder, setSearchPlaceholder] =
    useState("Add something...");
  const badgeDotColors = useRef([blue]).current;

  useEffect(() => {
    if (type == "size") {
      setItems([
        {
          label: "Extra Small (XS)",
          value: "xs",
        },
        {
          label: "Small (S)",
          value: "s",
        },
        {
          label: "Medium (M)",
          value: "m",
        },
        {
          label: "Large (L)",
          value: "l",
        },
        {
          label: "Extra Large (XL)",
          value: "xl",
        },
        {
          label: "2x Extra Large (XXL)",
          value: "xxl",
        },
      ]);
      setSearchPlaceholder("Add a hex color : '#00000'");
    } else if (type == "color") {
      setItems([
        {
          label: "black",
          value: "black",
        },
        {
          label: "brown",
          value: "brown",
        },
        {
          label: "lavender",
          value: "lavender",
        },
        {
          label: "white",
          value: "white",
        },
      ]);
      setSearchPlaceholder("Add a custom size");
    }
  }, []);

  const onChangeSearchText = (text) => {
    const prevData = items;
    const reg1 = /^#(?:[0-9a-fA-F]{3}){1,2}$/;
    const reg2 = /^(?:[0-9a-fA-F]{3}){1,2}$/;

    if (reg1.test(text)) {
      setItems([
        {
          label: text,
          value: text,
        },
      ]);
    } else if (reg2.test(text)) {
      console.log("I AM GREAT");
      setItems([
        {
          label: "#" + text,
          value: "#" + text,
        },
      ]);
    } else {
      setItems([]);
    }
  };

  // useEffect(() => {
  //   setResult(value);
  // }, [value]);

  // useEffect(() => {
  //   let temp = {};
  //   temp[type] = value;
  //   setReqData({ ...reqData, ...temp });
  // }, [value]);

  return (
    <View style={styles.container}>
      <DropDownPicker
        multiple={true}
        searchable={true}
        addCustomItem={true}
        min={0}
        max={items.length}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        searchPlaceholder={searchPlaceholder}
        mode="BADGE"
        listMode="SCROLLVIEW"
        placeholder={placeholderText}
        // dropDownContainerStyle={styles.dropdown}
        // modalContentContainerStyle={styles.modal}
        // modalTitleStyle={styles.modalTitle}
        badgeDotColors={badgeDotColors}
        badgeColors={["lavender"]}
        disableLocalSearch={type === "color" ? true : false} // required for remote search
        onChangeSearchText={onChangeSearchText}
      ></DropDownPicker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 35,
    marginTop: 10,
  },
  dropdown: {
    backgroundColor: "whitesmoke",
    borderColor: grey,
    borderRadius: 10,
  },
  dropdownContainer: {
    height: 10,
    backgroundColor: "whitesmoke",
    borderRadius: 2,
  },
});

export default CustomDropDown;
