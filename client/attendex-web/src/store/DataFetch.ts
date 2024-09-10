/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const getRequest = async (url: string) => {
	const response = await axios.get(url);
	return response.data;
};

export const useAdminsData = (url: string) => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ["admins", url],
		queryFn: () => getRequest(url),
		staleTime: 86_400_000, // 1 day in milliseconds
	});
	return { data, isLoading, isError };
};

export const useOrgData = (url: string) => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ["orgs", url],
		queryFn: () => getRequest(url),
		staleTime: 86_400_000, // 1 day in milliseconds
	});
	return { data, isLoading, isError };
};
