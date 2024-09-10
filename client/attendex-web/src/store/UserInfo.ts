/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { create } from "zustand";

type infoStore = {
	userId: string;
	orgId: string;
	firstName: string;
	lastName: string;
	email: string;
	age: number;
	jobTitle: string;
	organisation: string;
	phone: string;
	address: string;
	profilePic: string;
	gender: "male" | "female";
	startDate: string;
	endDate: string;
	allDetailsValidated: boolean;
	updateUserInfo: (parameters: {
		userId: string;
		orgId: string;
		firstName: string;
		lastName: string;
		email: string;
		age: number;
		jobTitle: string;
		organisation: string;
		phone: string;
		address: string;
		profilePic: string;
		gender: "male" | "female";
		startDate: string;
		endDate: string;
		allDetailsValidated: boolean;
	}) => void;
};

export const userInfoStore = create<infoStore>((set) => ({
	userId: "",
	orgId: "",
	firstName: "",
	lastName: "",
	email: "",
	age: 0,
	jobTitle: "",
	organisation: "",
	phone: "",
	address: "",
	profilePic: "",
	gender: "male",
	startDate: "",
	endDate: "",
	allDetailsValidated: false,
	updateUserInfo: (parameters) =>
		set((state) => ({
			...state,
			...parameters,
		})),
}));
