import type { FunctionComponent } from "../common/types";
import React, { useState, FormEvent } from "react";
import axios from "axios";

interface FormState {
	email: string;
	password: string;
}

export const Home = (): FunctionComponent => {
	const [formData, setForm] = useState<FormState>({
		email: "example@example.com",
		password: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const response = await axios.post("/api/V1/newUser", formData);
			console.log("success", response.data);
		} catch (err) {
			console.log("err:" + err);
		}
	};

	return (
		<form method="POST" onSubmit={handleSubmit}>
			<label>Email:</label>
			<input
				type="email"
				name="email"
				value={formData.email}
				onChange={handleChange}
			/>

			<label>Password:</label>
			<input
				type="password"
				name="password"
				value={formData.password}
				onChange={handleChange}
			/>
			<button type="submit">submit</button>
		</form>
	);
};
