import { Text } from "@/components/ui/Text";
import { formatDate } from "@/utils/dateUtil";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { ReactNode } from "react";
import { FlatList, View } from "react-native";

export type PaymentStatus =
	| "ARRIVED_AT_DESTINATION"
	| "ON_ITS_WAY_TO_DESTINATION"
	| "ON_ITS_WAY_TO_FRILANSR"
	| "ARRIVED_AT_FRILANSR";

export type Payment = {
	amount: number;
	date: string;
	status: PaymentStatus;
	id: string;
	target: {
		id: string;
		name: string;
		imageUrl: string;
	};
};

export function ActivePaymentsTitle({ children }: { children: string }) {
	return <Text className="text-3xl font-zain-bold">{children}</Text>;
}

export function ActivePaymentsSubtitle({ children }: { children: string }) {
	return <Text className="text-xl text-muted mt-[-9]">{children}</Text>;
}

export function ActivePaymentsHeader({ children }: { children: ReactNode }) {
	return <View className="mx-[20] mb-[10]">{children}</View>;
}

export function ActivePayments({ payments }: { payments: Payment[] }) {
	function renderItem({ item }: { item: Payment }) {
		return <ActivePaymentElement payment={item} />;
	}

	return (
		<FlatList
			style={{ marginBottom: 60 }}
			data={payments}
			renderItem={renderItem}
			keyExtractor={(payment) => payment.id}
		/>
	);
}

export function ActivePaymentElement({ payment }: { payment: Payment }) {
	function ActivePaymentHeader() {
		return (
			<View className="flex-row items-center justify-between">
				<View>
					<Text className="text-xl font-zain-bold">{payment.amount} kr</Text>
					<Text className="text-lg text-muted mt-[-6]">
						{formatDate(payment.date)}
					</Text>
				</View>
				{payment.status === "ARRIVED_AT_DESTINATION" && (
					<View className="bg-[#88B478] w-[40] h-[40] flex-row items-center justify-center rounded-full">
						<FontAwesome6 name="check" size={22} color="white" />
					</View>
				)}
				{payment.status !== "ARRIVED_AT_DESTINATION" && (
					<View className="bg-[#71B8CA] w-[40] h-[40] flex-row items-center justify-center rounded-full">
						<FontAwesome6 name="clock" size={22} color="white" />
					</View>
				)}
			</View>
		);
	}

	function ActivePaymentBody() {
		let progress = 0;
		let text = "In transit";
		if (payment.status === "ARRIVED_AT_FRILANSR") {
			text = "Arrived at Frilansr";
			progress = 50;
		}
		if (payment.status === "ON_ITS_WAY_TO_FRILANSR") {
			text = "On its way to Frilansr";
			progress = 25;
		}
		if (payment.status === "ON_ITS_WAY_TO_DESTINATION") {
			text = `On its way to ${payment.target.name}'s bank account`;
			progress = 75;
		}
		if (payment.status === "ARRIVED_AT_DESTINATION") {
			text = `Arrived at ${payment.target.name}'s bank account`;
			progress = 100;
		}

		return (
			<View className="flex-col gap-[5]">
				<View className="flex-row items-center justify-between">
					<Text className="text-lg font-zain-bold">Status</Text>
					<Text className="text-muted">{text}</Text>
				</View>
				<View className="relative bg-[#d9d9d9] rounded-full h-[22]">
					<View
						className={`absolute top-0 left-0 ${
							progress == 100 ? "bg-[#88B478]" : "bg-[#71B8CA]"
						} h-[22] rounded-full`}
						style={{ width: `${progress}%` }}
					/>
				</View>
			</View>
		);
	}

	return (
		<View className="mx-[20] my-[10] p-[12] rounded-lg shadow-custom bg-white flex-col gap-[15]">
			<ActivePaymentHeader />
			<ActivePaymentBody />
		</View>
	);
}
