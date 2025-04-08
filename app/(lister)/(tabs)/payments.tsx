import {
	ActivePayments,
	ActivePaymentsHeader,
	ActivePaymentsSubtitle,
	ActivePaymentsTitle,
	Payment,
} from "@/components/lister/payments/ActivePayments";
import { Header } from "@/components/ui/Header";
import { SafeAreaView } from "react-native-safe-area-context";

const payments: Payment[] = [
	{
		id: "0",
		amount: 100,
		date: "2024-09-15T12:00:00Z",
		status: "ARRIVED_AT_DESTINATION",
		target: {
			id: "0",
			name: "John Doe",
			imageUrl: "https://example.com/image.jpg",
		},
	},
	{
		id: "1",
		amount: 173.21,
		date: "2024-10-15T12:00:00Z",
		status: "ON_ITS_WAY_TO_DESTINATION",
		target: {
			id: "0",
			name: "John Doe",
			imageUrl: "https://example.com/image.jpg",
		},
	},
	{
		id: "2",
		amount: 73.21,
		date: "2024-12-15T12:00:00Z",
		status: "ON_ITS_WAY_TO_FRILANSR",
		target: {
			id: "0",
			name: "Péter Herczku",
			imageUrl: "https://example.com/image.jpg",
		},
	},
];

export default function OutgoingPaymentsPage() {
	return (
		<SafeAreaView className="flex-1 bg-white">
			<Header />
			<ActivePaymentsHeader>
				<ActivePaymentsTitle>Outgoing payments</ActivePaymentsTitle>
				<ActivePaymentsSubtitle>10 payments</ActivePaymentsSubtitle>
			</ActivePaymentsHeader>
			<ActivePayments payments={payments} />
		</SafeAreaView>
	);
}
