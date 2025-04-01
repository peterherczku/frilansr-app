import { useEffect } from "react";
import { AppState } from "react-native";
import { focusManager } from "@tanstack/react-query";

export function useReactQueryFocusSync() {
	useEffect(() => {
		const subscription = AppState.addEventListener("change", (state) => {
			focusManager.setFocused(state === "active");
		});

		return () => subscription.remove();
	}, []);
}
