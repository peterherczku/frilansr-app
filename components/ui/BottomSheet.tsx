import React, {
	createContext,
	useRef,
	useCallback,
	useContext,
	useState,
	ReactNode,
	FC,
} from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
	BottomSheetModal,
	BottomSheetModalProvider,
	BottomSheetView,
	BottomSheetBackdrop,
	BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";

/**
 * Context shape exposed by the bottom‑sheet.
 */
interface BottomSheetContextType {
	open: (content: ReactNode) => void;
	close: () => void;
}

const BottomSheetContext = createContext<BottomSheetContextType | undefined>(
	undefined
);

/**
 * Wrap your navigation tree (or the whole app) with this provider.
 */
export const BottomSheetProvider: FC<{ children: ReactNode }> = ({
	children,
}) => {
	const modalRef = useRef<BottomSheetModal>(null);
	const [content, setContent] = useState<ReactNode>(null);
	const { bottom: bottomInset } = useSafeAreaInsets();

	/**
	 * Custom backdrop – dims everything behind the sheet.
	 * Adjust `opacity` to make the background lighter / darker.
	 */
	const renderBackdrop = useCallback(
		(props: BottomSheetBackdropProps) => (
			<BottomSheetBackdrop
				{...props}
				appearsOnIndex={0}
				disappearsOnIndex={-1}
				opacity={0.45}
			/>
		),
		[]
	);

	const open = useCallback((node: ReactNode) => {
		setContent(node);
		modalRef.current?.present();
		modalRef.current?.expand();
	}, []);

	const close = useCallback(() => {
		modalRef.current?.dismiss();
	}, []);

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<BottomSheetModalProvider>
				<BottomSheetContext.Provider value={{ open, close }}>
					{children}
					<BottomSheetModal
						style={{ paddingBottom: bottomInset + 16 }}
						ref={modalRef}
						backdropComponent={renderBackdrop}
						enableDynamicSizing={false}
						index={0}
						snapPoints={["60%"]}
					>
						<BottomSheetView style={{ flex: 1, padding: 16 }}>
							{content}
						</BottomSheetView>
					</BottomSheetModal>
				</BottomSheetContext.Provider>
			</BottomSheetModalProvider>
		</GestureHandlerRootView>
	);
};

export const useBottomSheet = (): BottomSheetContextType => {
	const ctx = useContext(BottomSheetContext);
	if (!ctx) {
		throw new Error(
			"useBottomSheet must be used within a BottomSheetProvider – wrap your tree first!"
		);
	}
	return ctx;
};
