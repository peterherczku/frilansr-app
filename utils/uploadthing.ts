import { BACKEND_API_BASE_URL } from "@/api/apiClient";
import { generateReactNativeHelpers } from "@uploadthing/expo";

export const { useImageUploader, useDocumentUploader } =
	generateReactNativeHelpers({
		url: `${BACKEND_API_BASE_URL}/uploadthing`,
	});
