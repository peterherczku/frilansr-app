import { useEffect, useRef, useState } from "react";
import { Animated, Keyboard, Platform } from "react-native";

export function useKeyboardHeight() {
	const keyboardHeight = useRef(new Animated.Value(0)).current;
	const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

	useEffect(() => {
		// Because iOS can use `keyboardWillShow` / `keyboardWillHide`
		// (which fire *before* the keyboard is fully shown),
		// we default to them if possible, otherwise fallback to `keyboardDidShow` / `keyboardDidHide`.
		const showEvent =
			Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
		const hideEvent =
			Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

		// Show listener
		const showListener = Keyboard.addListener(showEvent, (e) => {
			setIsKeyboardOpen(true);
			const height = e.endCoordinates.height;
			Animated.timing(keyboardHeight, {
				toValue: height,
				duration: 250,
				useNativeDriver: false, // because we're animating layout (padding)
			}).start();
		});

		// Hide listener
		const hideListener = Keyboard.addListener(hideEvent, () => {
			setIsKeyboardOpen(false);
			Animated.timing(keyboardHeight, {
				toValue: 0,
				duration: 250,
				useNativeDriver: false,
			}).start();
		});

		// Cleanup
		return () => {
			showListener.remove();
			hideListener.remove();
		};
	}, [keyboardHeight]);

	return { keyboardHeight, isKeyboardOpen };
}
