import { Colors } from "@/constants/Colors";
import { useListing } from "@/hooks/listing/useListing";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

export function ListingJobLister({ id }: { id: string }) {
	const { listing, isLoading, error } = useListing(id as string);
	if (isLoading) {
		return (
			<View>
				<Text>Loading</Text>
			</View>
		);
	}
	if (error || !listing) {
		return (
			<View>
				<Text>Error {error?.message ?? ""}</Text>
			</View>
		);
	}

	return (
		<View style={{ marginVertical: 20 }}>
			<Text style={[styles.text, { fontFamily: "Zain-Bold", fontSize: 22 }]}>
				About the Job Lister
			</Text>
			<Text style={[styles.text, { marginTop: -6, color: Colors.light.muted }]}>
				More information will be revealed after taking the job
			</Text>
			<View
				style={{
					marginTop: 10,
					marginBottom: 70,
					flexDirection: "row",
					alignItems: "center",
					gap: 15,
				}}
			>
				<Image
					source={{ uri: listing.user.imageUrl }}
					style={{
						width: 100,
						height: 100,
						backgroundColor: "#d9d9d9",
						borderRadius: 100,
					}}
				/>
				<View>
					<Text
						style={[styles.text, { fontFamily: "Zain-Bold", fontSize: 20 }]}
					>
						{listing.user.name}
					</Text>
					<Text
						numberOfLines={2}
						style={[
							styles.text,
							{ color: Colors.light.muted, lineHeight: 20, maxWidth: 200 },
						]}
					>
						Pellentesque tincidunt lectus et mi lacinia interdum. Nam sit amet
						metus.
					</Text>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	text: {
		fontFamily: "Zain",
		color: Colors.light.text,
		fontSize: 16,
	},
});
