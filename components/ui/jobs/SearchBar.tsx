import {useKeyboardFocused} from "@/hooks/useKeyboardFocused";
import {Keyboard, Platform, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import { useMemo, useState} from "react";
import {SearchResults} from "@/components/ui/jobs/SearchResults";
import {Colors} from "@/constants/Colors";
import {Ionicons} from "@expo/vector-icons";
import {PreviousSearches} from "@/components/ui/jobs/PreviousSearches";
import {SearchSuggestions} from "@/components/ui/jobs/SearchSuggestions";

const searchResults = [
    {
        id: 0,
        title: "Walk with Max",
        category: "Dog walking",
        location: "Central",
        salary: "100 kr / hr",
        duration: "45 min",
        image: "https://i.pinimg.com/564x/b7/2d/20/b72d208a4c715bfa0fe1f8420858f759.jpg"
    },
    {
        id: 1,
        title: "Walk with Max",
        category: "Dog walking",
        location: "Central",
        salary: "100 kr / hr",
        duration: "45 min",
        image: "https://i.pinimg.com/564x/b7/2d/20/b72d208a4c715bfa0fe1f8420858f759.jpg"
    },
    {
        id: 2,
        title: "Walk with Max",
        category: "Dog walking",
        location: "Central",
        salary: "100 kr / hr",
        duration: "45 min",
        image: "https://i.pinimg.com/564x/b7/2d/20/b72d208a4c715bfa0fe1f8420858f759.jpg"
    },
    {
        id: 3,
        title: "Walk with Max",
        category: "Dog walking",
        location: "Central",
        salary: "100 kr / hr",
        duration: "45 min",
        image: "https://i.pinimg.com/564x/b7/2d/20/b72d208a4c715bfa0fe1f8420858f759.jpg"
    },
    {
        id: 4,
        title: "Walk with Max",
        category: "Dog walking",
        location: "Central",
        salary: "100 kr / hr",
        duration: "45 min",
        image: "https://i.pinimg.com/564x/b7/2d/20/b72d208a4c715bfa0fe1f8420858f759.jpg"
    }
]
export function SearchBar() {

    const [isSearching, setSearching] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const searchState = useMemo(() => {
        if (isSearching && searchInput.trim() === "") {
            return "PREVIOUS_SEARCHES";
        } else if (isSearching) {
            return "SEARCH_SUGGESTIONS";
        } else if (searchInput.trim() === "") {
            return "JOBS_AND_CATEGORIES";
        } else {
            return "SEARCH_RESULTS";
        }
    }, [isSearching, searchInput]);

    function clearInput() {
        setSearchInput("");
    }

    function back() {
        setSearchInput("");
        Keyboard.dismiss();
        setSearching(false);
    }

    function selectPreviousSearch(text) {
        setSearchInput(text);
    }

    function search(text) {
        Keyboard.dismiss();
        setSearching(false);
    }

    return <View style={styles.container}>
        <View style={styles.inputBox}>
            <TouchableOpacity onPress={back} style={{ padding: 5}}>
                <Ionicons name="chevron-back" size={20} color={Colors.light.muted} />
            </TouchableOpacity>
            <TextInput
                onFocus={() => setSearching(true)}
                placeholder={"Search job, workplace, etc."}
                style={styles.input}  value={searchInput}
                onChangeText={(text) => setSearchInput(text)}
                onSubmitEditing={() => setSearching(false)}
            />
            {searchInput.trim() != "" && <TouchableOpacity onPress={clearInput} style={{paddingRight: 15}}>
                <Ionicons name="close-circle" size={20} color={Colors.light.muted} />
            </TouchableOpacity>}
        </View>
        {searchState === "SEARCH_RESULTS" && <SearchResults results={searchResults} />}
        {searchState === "PREVIOUS_SEARCHES" && <PreviousSearches onSelectPreviousSearch={selectPreviousSearch} />}
        {searchState === "SEARCH_SUGGESTIONS" && <SearchSuggestions searchInput={searchInput} onSearch={search} />}
    </View>

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
   inputBox: {
       backgroundColor: "#D9D9D9",
       marginHorizontal: 20,
       borderRadius: 8,
       marginBottom: 10,
       flexDirection: "row",
       alignItems: "center",
       ...Platform.select({
           ios: {
               paddingVertical: 12
           }
       })
   },
    input: {
        color: Colors.light.muted,
        fontFamily: "Zain",
        fontSize: 17,
        marginTop: 3.5,
        flex: 1,
        ...Platform.select({
            ios: {
                marginLeft: 5
            }
        })
    }
});