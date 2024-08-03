/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { create } from "zustand";

type locnStore = {
	long: number;
	lat: number;
	methodName: string | null;
	updateUserLocn: (
		long: number,
		lat: number,
		methodName: string | null
	) => void;
	resetMethod: () => void;
};

export const userLocnStore = create<locnStore>((set) => ({
	long: 0,
	lat: 0,
	methodName: "",
	updateUserLocn: (
		userlong: number,
		userlat: number,
		userMethod: string | null
	) => {
		set(() => ({ long: userlong, lat: userlat, methodName: userMethod }));
	},
	resetMethod: () => {
		set(() => ({ methodName: "" }));
	},
}));
