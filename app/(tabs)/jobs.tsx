import { Header } from "@/components/Header";
import { SearchBar } from "@/components/ui/jobs/SearchBar";
import { SafeAreaView } from "react-native-safe-area-context";

export default function JobsScreen() {
	return (
		<SafeAreaView className="flex-1 bg-white">
			<Header />
			<SearchBar />
		</SafeAreaView>
	);
}
