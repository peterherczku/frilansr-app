import { Header } from "@/components/ui/Header";
import { SearchBar } from "@/components/jobs/SearchBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { FloatingActiveOrder } from "@/components/home/FloatingActiveOrder";

export default function JobsScreen() {
	return (
		<SafeAreaView className="flex-1 bg-white">
			<Header />
			<SearchBar />
			<FloatingActiveOrder />
		</SafeAreaView>
	);
}
