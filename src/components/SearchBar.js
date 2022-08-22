import {
  Keyboard,
  Pressable,
  StatusBar,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { foreground } from "../utils/Constants";
import Search from "../../assets/svgs/Search";
import Close from "../../assets/svgs/Close";
import CloseA from "../../assets/svgs/CloseA";

const SearchBar = ({
  clicked,
  searchPhrase,
  setClicked,
  onFocus,
  searchFilter,
}) => {
  return (
    <View style={styles.container}>
      <View
        style={
          clicked ? styles.searchBar__clicked : styles.searchBar__unclicked
        }
      >
        <Search />
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={searchPhrase}
          onChangeText={(text) => searchFilter(text)}
          onFocus={onFocus}
        />
        {clicked && (
          <Pressable
            style={{ paddingRight: 8 }}
            onPress={() => {
              Keyboard.dismiss();
              setClicked(false);
              searchFilter("");
            }}
          >
            <CloseA />
          </Pressable>
        )}
      </View>
    </View>
  );
};

// styles
const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight + 10,
    marginBottom: 5,
    marginHorizontal: 15,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "90%",
  },
  searchBar__unclicked: {
    padding: 10,
    flexDirection: "row",
    width: "100%",
    backgroundColor: foreground,
    borderRadius: 15,
    alignItems: "center",
    elevation: 2,
  },
  searchBar__clicked: {
    padding: 10,
    flexDirection: "row",
    backgroundColor: foreground,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: "90%",
  },
});

export default SearchBar;
