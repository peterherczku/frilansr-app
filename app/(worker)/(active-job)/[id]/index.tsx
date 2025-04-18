import { Text } from "@/components/ui/Text";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ActiveJobPage() {
	const { id } = useLocalSearchParams();

	return (
		<SafeAreaView>
			<Text>Hello from active job page! {id}</Text>
		</SafeAreaView>
	);
}
