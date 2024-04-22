/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { create } from "zustand";

type roleStore = {
	role: string;
	userToken: string;
	updateUserRole: (rolez: string, userTok: string) => void;
};

export const userRoleStore = create<roleStore>((set) => ({
	role: "",
	userToken: "",
	updateUserRole: (rolez: string, userTok: string) => {
		set(() => ({ role: rolez, userToken: userTok }));
	},
}));
