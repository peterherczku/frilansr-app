import { Header } from "@/components/ui/Header";
import { SearchBar } from "@/components/jobs/SearchBar";
import { SafeAreaView } from "react-native-safe-area-context";

export default function JobsScreen() {
	return (
		<SafeAreaView className="flex-1 bg-white">
			<Header />
			<SearchBar />
		</SafeAreaView>
	);
}
