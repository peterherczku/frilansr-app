import {
	Keyboard,
	Platform,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { useMemo, useState } from "react";
import { SearchResults } from "@/components/jobs/SearchResults";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { PreviousSearches } from "@/components/jobs/PreviousSearches";
import { SearchSuggestions } from "@/components/jobs/SearchSuggestions";
import { SearchRecentJobs } from "./SearchRecentJobs";
import { usePreviousSearches } from "@/hooks/usePreviousSearches";
import { cn } from "@/utils/cn";

const searchResults = [
	{
		id: 0,
		title: "Walk with Max",
		category: "Dog walking",
		location: "Central",
		salary: "100 kr / hr",
		duration: "45 min",
		image:
			"https://i.pinimg.com/564x/b7/2d/20/b72d208a4c715bfa0fe1f8420858f759.jpg",
	},
	{
		id: 1,
		title: "Walk with Max",
		category: "Dog walking",
		location: "Central",
		salary: "100 kr / hr",
		duration: "45 min",
		image:
			"https://i.pinimg.com/564x/b7/2d/20/b72d208a4c715bfa0fe1f8420858f759.jpg",
	},
	{
		id: 2,
		title: "Walk with Max",
		category: "Dog walking",
		location: "Central",
		salary: "100 kr / hr",
		duration: "45 min",
		image:
			"https://i.pinimg.com/564x/b7/2d/20/b72d208a4c715bfa0fe1f8420858f759.jpg",
	},
	{
		id: 3,
		title: "Walk with Max",
		category: "Dog walking",
		location: "Central",
		salary: "100 kr / hr",
		duration: "45 min",
		image:
			"https://i.pinimg.com/564x/b7/2d/20/b72d208a4c715bfa0fe1f8420858f759.jpg",
	},
	{
		id: 4,
		title: "Walk with Max",
		category: "Dog walking",
		location: "Central",
		salary: "100 kr / hr",
		duration: "45 min",
		image:
			"https://i.pinimg.com/564x/b7/2d/20/b72d208a4c715bfa0fe1f8420858f759.jpg",
	},
];
export function SearchBar() {
	const { saveSearch } = usePreviousSearches();
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

	function selectSearch(text: string) {
		setSearchInput(text);
	}

	function searchFromSuggestions(text: string) {
		selectSearch(text);
		search();
	}

	function search() {
		Keyboard.dismiss();
		setSearching(false);
		if (searchInput.trim() == "") return;
		saveSearch(searchInput);
	}

	return (
		<View className="flex-1">
			<View
				className={cn(
					"bg-[#D9D9D9] mx-[20] rounded-lg mb-[10] flex-row items-center",
					Platform.OS === "ios" && "py-[12]"
				)}
			>
				<TouchableOpacity onPress={back} className="p-[5]">
					<Ionicons name="chevron-back" size={20} color={Colors.light.muted} />
				</TouchableOpacity>
				<TextInput
					onFocus={() => setSearching(true)}
					placeholder={"Search job, workplace, etc."}
					className={cn(
						"text-muted font-zain text-[17] mt-[3.5] flex-1",
						Platform.OS === "ios" && "ml-[5]"
					)}
					value={searchInput}
					onChangeText={(text) => setSearchInput(text)}
					onSubmitEditing={() => search()}
				/>
				{searchInput.trim() != "" && (
					<TouchableOpacity onPress={clearInput} className="pr-[15]">
						<Ionicons
							name="close-circle"
							size={20}
							color={Colors.light.muted}
						/>
					</TouchableOpacity>
				)}
			</View>
			{searchState === "SEARCH_RESULTS" && (
				<SearchResults results={searchResults} />
			)}
			{searchState === "PREVIOUS_SEARCHES" && (
				<PreviousSearches onSelectPreviousSearch={selectSearch} />
			)}
			{searchState === "SEARCH_SUGGESTIONS" && (
				<SearchSuggestions
					searchInput={searchInput}
					onSearch={searchFromSuggestions}
				/>
			)}
			{searchState === "JOBS_AND_CATEGORIES" && <SearchRecentJobs />}
		</View>
	);
}
