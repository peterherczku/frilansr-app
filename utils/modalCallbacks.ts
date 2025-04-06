import { router } from "expo-router";

declare global {
	var modalCallbacks: Record<string, () => void>;
}

if (!global.modalCallbacks) {
	global.modalCallbacks = {};
}

export function showConfirmModal({
	message,
	onConfirm,
}: {
	message?: string;
	onConfirm?: () => void;
}) {
	const callbackId = onConfirm ? `modal_cb_${Date.now()}` : undefined;
	if (callbackId && onConfirm) {
		global.modalCallbacks[callbackId] = onConfirm;
	}

	router.push({
		pathname: "/confirm-modal",
		params: {
			message,
			onConfirmCallback: callbackId,
		},
	});
}
