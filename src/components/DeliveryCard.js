import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View, FlatList } from "react-native";
import TCS from "../../assets/svgs/TCS";
import Fedex from "../../assets/svgs/Fedex";
import Leopard from "../../assets/svgs/Leopard";
import { blue, foreground } from "../utils/Constants";

const data = [
  { id: 0, text: "2-3 days" },
  { id: 1, text: "2-3 days" },
  { id: 2, text: "2-3 days" },
];

const Item = ({ id, text, onPress, backgroundColor, textColor, selected }) => (
  <Pressable
    style={[styles.listItem, selected && styles.selected]}
    onPress={onPress}
  >
    {id === 0 && <Fedex />}
    {id === 1 && <Leopard />}
    {id === 2 && <TCS />}
    <Text style={[styles.listText, textColor]}>{text}</Text>
  </Pressable>
);

const DeliveryCard = () => {
  const [selectedID, setSelectedID] = useState(0);

  const renderItem = ({ item }) => {
    const backgroundColor = selectedID === item.id ? "#F9F9F9" : "white";
    const color = selectedID === item.id ? "black" : "gray";
    const selected = selectedID === item.id;
    return (
      <Item
        backgroundColor={{ backgroundColor }}
        fontColor={{ color }}
        id={item.id}
        text={item.text}
        onPress={() => {
          setSelectedID(item.id);
        }}
        selected={selected}
      ></Item>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.list}
        data={data}
        renderItem={renderItem}
        extraData={selectedID}
        horizontal={true}
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    height: 80,
    width: 100,
    marginRight: 20,
    borderRadius: 30,
  },
  container: {
    marginHorizontal: 10,
  },
  line1: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  list: {
    justifyContent: "space-around",
    flex: 1,
    paddingVertical: 20,
  },
  listItem: {
    width: 100,
    height: 75,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    backgroundColor: foreground,
  },
  listText: {
    paddingTop: 5,
  },
  cardNum: {
    alignSelf: "center",
  },
  selected: {
    borderColor: blue,
    backgroundColor: "lavender",
    borderWidth: 2,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default DeliveryCard;
