import axios from "axios";

export const PostReq = async (url: string, body: object, headers?: object) => {
	const config = headers ? { headers } : {};

	try {
		const result: unknown = await axios.post(
			`${String(import.meta.env["VITE_BASE_URL"])}/db/${url}`,
			body,
			config
		);
		return result.data;
	} catch (error) {
		console.error("Post request error:", error);
		throw error;
	}
};
