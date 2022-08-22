import { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useDispatch } from "react-redux";
import { setReq } from "../features/api";
import {
  blue,
  colorDefaults,
  grey,
  marginHorizontal,
  marginVertical,
  sizeDefaults,
} from "../utils/Constants";

const CustomDropDown = ({
  placeholderText,
  type,
  dropdown,
  setDropdown,
  data,
  setData,
}) => {
  const dispatch = useDispatch();
  const valid = useRef([]);
  const oldValues = useRef([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(data ? "" : []);
  const [items, setItems] = useState([]);
  const [searched, setSearched] = useState(false);
  const [selected, setSelected] = useState(false);
  const [searchPlaceholder, setSearchPlaceholder] =
    useState("Add something...");
  const badgeDotColors = useRef([blue]).current;

  useEffect(() => {
    //initializing customdropdown
    if (data) {
      setItems(data);
      valid.current = data;
    } else if (type == "size") {
      setItems(sizeDefaults);
      valid.current = sizeDefaults;
      setSearchPlaceholder("Add a custom size");
    } else if (type == "color") {
      setItems(colorDefaults);
      valid.current = colorDefaults;
      setSearchPlaceholder("Add a hex color : '#00000'");
    }
  }, []);

  useEffect(() => {
    if (data) {
      console.log("I THE GREATEs");
      console.log(value);
      setData(value);
    }
  }, [value]);

  useEffect(() => {
    if (dropdown != type) {
      setOpen(false);
    }
  }, [dropdown]);

  const onChangeSearchText = (text) => {
    const reg1 = /^#(?:[0-9a-fA-F]{3}){1,2}$/;
    const reg2 = /^(?:[0-9a-fA-F]{3}){1,2}$/;
    let finalText = undefined;

    if (reg1.test(text)) {
      finalText = text;
    } else if (reg2.test(text)) {
      finalText = "#" + text;
    }
    if (finalText) {
      oldValues.current = value.length != 0 ? value : oldValues.current;
      setValue([]);
      setItems([
        {
          label: finalText,
          value: finalText,
        },
      ]);
      setSearched(true);
    } else {
      setItems([]);
    }
  };

  const onSelectItem = (item) => {
    if (!data) {
      setSelected(true);
    }
  };

  const onOpen = () => {
    if (!data) {
      setSelected(false);
      setSearched(false);
    }
    setDropdown(type);
  };

  const onClose = () => {
    if (searched && !data) {
      if (selected) {
        const check = valid.current.filter(
          (item) => item.value == items[0].value
        );
        if (check.length === 0) {
          valid.current = [...valid.current, ...items];
        }
        const valCheck = !oldValues.current.includes(items[0].value);
        if (valCheck) {
          oldValues.current = [...oldValues.current, items[0].value];
        }
      }
      setValue([...oldValues.current]);
      setItems([...valid.current]);
    }
    if (data) {
      // console.log("I AM HERE");
      // console.log(value);
      // setData(value);
    } else {
      dispatch(setReq({ property: type, value: value }));
    }
  };

  return (
    <View style={styles.container}>
      <DropDownPicker
        multiple={!data}
        searchable={!data}
        addCustomItem={!data}
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
        listMode={data ? "MODAL" : "SCROLLVIEW"}
        placeholder={placeholderText}
        badgeDotColors={badgeDotColors}
        badgeColors={["lavender"]}
        disableLocalSearch={type === "color" ? true : false} // required for remote search
        onChangeSearchText={!type === "color" ? onChangeSearchText : undefined}
        onSelectItem={type === "color" ? onSelectItem : undefined}
        onOpen={
          type === "color"
            ? onOpen
            : () => {
                setDropdown(type);
              }
        }
        onClose={
          type === "color"
            ? onClose
            : () => {
                if (!data) {
                  dispatch(setReq({ property: type, value: value }));
                }
              }
        }
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
