/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-duplicate-imports */
import type React from "react";
import {
	Descriptions,
	Input,
	DatePicker,
	Radio,
	Form,
	Select,
	Popover,
	Button,
	List,
} from "antd";
import {
	CheckCircleOutlined,
	LoadingOutlined,
	CloseCircleOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import ProfilePic from "./ProfilePic";
import { userInfoStore } from "../../../store/UserInfo";
import { useEffect, useState } from "react";
import axios from "axios";
import { useOrgData } from "../../../store/DataFetch";
const { RangePicker } = DatePicker;

const ManVerified: React.FC = () => {
	const {
		userId,
		orgId,
		firstName,
		lastName,
		email,
		age,
		jobTitle,
		organisation,
		phone,
		address,
		profilePic,
		gender,
		startDate,
		endDate,
		allDetailsValidated,
		updateUserInfo,
	} = userInfoStore();
	const { data, isLoading, isError } = useOrgData(
		`${String(import.meta.env["VITE_BASE_URL"])}/db/organisations`
	);
	const [checkDets, setcheckDets] = useState<boolean>(allDetailsValidated);
	const [isValid, setIsValid] = useState<boolean>(false);
	const [loading, setloading] = useState<boolean>(false);
	const [errors, setErrors] = useState<Array<string>>([]);
	const [detLoading, setDetLoading] = useState<boolean>(false);
	const [formData, setFormData] = useState({
		uid: userId,
		orgId: "",
		FirstName: "",
		LastName: "",
		Email: "",
		Age: 0,
		JobTitle: "",
		Organisation: "",
		Phone: "",
		Address: "",
		ProfilePic: "",
		Gender: "",
		start: "",
		end: "",
	});
	console.log(formData);
	useEffect(() => {
		if (userId) {
			setFormData({
				uid: userId,
				orgId: orgId,
				FirstName: firstName,
				LastName: lastName,
				Email: email,
				Age: Math.round(age),
				JobTitle: jobTitle,
				Organisation: organisation,
				Phone: phone,
				Address: address,
				ProfilePic: profilePic,
				Gender: gender,
				start: startDate,
				end: endDate,
			});
		}
	}, [
		userId,
		orgId,
		firstName,
		lastName,
		email,
		age,
		jobTitle,
		organisation,
		phone,
		address,
		profilePic,
		gender,
		startDate,
		endDate,
	]);

	useEffect(() => {
		if (data) {
			const selectedOrg = data.find(
				(o) => o.org_name === formData.Organisation
			);
			if (selectedOrg) {
				setFormData((prev) => ({ ...prev, orgId: selectedOrg.org_id }));
			}
		}
	}, [formData.Organisation, data]);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const checkEmailExists = async (email) => {
		try {
			setloading(true);
			const result = await axios.post(
				`${String(import.meta.env["VITE_BASE_URL"])}/auth/checkEmail`,
				{ email }
			);
			const data = await result.data;
			data.isEmailExist ? setIsValid(false) : setIsValid(true);
			setloading(false);
		} catch (err) {
			setIsValid(false);
		}
	};
	const validateMyDets = async (event) => {
		event.preventDefault();
		try {
			setDetLoading(true);
			const result = await axios.post(
				`${String(import.meta.env["VITE_BASE_URL"])}/auth/checkDets`,
				formData
			);
			if (!isValid) {
				errors.push("Verify if email not already in use");
				setDetLoading(false);
			}
			if (result.data.details) {
				setErrors(result.data.details.map(({ message }) => message));
				setDetLoading(false);
			}
			if (isValid && result.data.message) {
				setErrors([]);
				setcheckDets(true);
				setDetLoading(false);
				updateUserInfo({
					userId: formData.uid,
					orgId: formData.orgId,
					firstName: formData.FirstName,
					lastName: formData.LastName,
					email: formData.Email,
					age: formData.Age,
					jobTitle: formData.JobTitle,
					organisation: formData.Organisation,
					phone: formData.Phone,
					address: formData.Address,
					profilePic: formData.ProfilePic,
					gender: formData.Gender,
					startDate: formData.start,
					endDate: formData.end,
					allDetailsValidated: true,
				});
			}
		} catch {
			setcheckDets(false);
		}
	};
	const handleProfilePicChange = (newPicUrl) => {
		setFormData({
			...formData,
			ProfilePic: newPicUrl,
		});
	};
	return userId ? (
		<Form title="User Details" requiredMark disabled={checkDets}>
			<Descriptions
				title="Your Details"
				bordered
				column={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 }}
				className="pt-3"
				items={[
					{
						label: "First Name",
						children: (
							<>
								<Input
									type="text"
									placeholder={"Enter first name"}
									className="bg-gray-50 outline-none border-0 hover:border-2 focus:border-2 text-center peer invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-4-pink-500 border-none"
									pattern="[a-zA-Z]{1,}"
									defaultValue={
										firstName.charAt(0).toUpperCase() + firstName.slice(1)
									}
									size="small"
									minLength={3}
									value={formData.FirstName}
									name="FirstName"
									required
									onChange={handleChange}
									maxLength={15}
								/>
								<p className="mt-1 peer-valid:hidden peer-invalid:visible text-pink-600 text-2xs">
									Please provide a valid first name.
								</p>
							</>
						),
					},
					{
						label: "Surname",
						children: (
							<>
								<Input
									type="text"
									placeholder={"Enter Last Name"}
									className="bg-gray-50 outline-none border-0 hover:border-2 focus:border-2 text-center peer invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-4-pink-500 border-none"
									pattern="[a-zA-Z]{1,}"
									size="small"
									defaultValue={
										lastName.charAt(0).toUpperCase() + lastName.slice(1)
									}
									required
									name="LastName"
									onChange={handleChange}
									minLength={3}
									maxLength={15}
								/>
								<p className="mt-1 peer-valid:hidden peer-invalid:visible text-pink-600 text-2xs">
									Please provide a valid last name.
								</p>
							</>
						),
					},
					{
						label: "Email-id",
						children: (
							<>
								<div className="flex flex-row justify-center">
									<input
										type="email"
										defaultValue={email}
										placeholder={"Enter your email"}
										className="bg-gray-50 outline-none border-0 hover:border-2 focus:border-2 text-center peer invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-4-pink-500 border-none disabled:cursor-not-allowed"
										required
										name="Email"
										pattern="^[^@]+@[^@]+\.[^@]+$"
										onChange={handleChange}
										maxLength={30}
										disabled={checkDets}
									/>
									{loading ? (
										<LoadingOutlined
											className="text-yellow-400"
											onClick={() => {
												setloading(false);
											}}
										/>
									) : isValid ? (
										<CheckCircleOutlined
											className="text-green-400"
											onClick={() => {
												checkEmailExists(formData.Email);
											}}
										/>
									) : (
										<CloseCircleOutlined
											className="text-red-400"
											onClick={() => {
												checkEmailExists(formData.Email);
											}}
										/>
									)}
								</div>
								<p className="mt-1 hidden peer-invalid:visible text-pink-600 text-2xs">
									Please provide a valid email address.
								</p>
							</>
						),
					},
					{
						label: "Gender",
						children: (
							<Radio.Group
								defaultValue={gender}
								buttonStyle="solid"
								size="small"
								className="max-w-fit"
								onChange={(event) => {
									setFormData({ ...formData, Gender: event.target.value });
								}}
							>
								<Radio.Button value="male">Male</Radio.Button>
								<Radio.Button value="female">Female</Radio.Button>
							</Radio.Group>
						),
					},
					{
						label: "Age",
						children: (
							<>
								<input
									type="number"
									min={20}
									max={99}
									defaultValue={Math.round(age)}
									className="bg-gray-50 outline-none border-0 hover:border-2 focus:border-2 text-center peer invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-4-pink-500 border-none disabled:cursor-not-allowed"
									name="Age"
									required
									maxLength={2}
									pattern="/\d{2}/i"
									onChange={handleChange}
									disabled={checkDets}
								/>
								<p className="mt-1 peer-valid:hidden peer-invalid:visible text-pink-600 text-2xs">
									Please provide a valid age.
								</p>
							</>
						),
					},
					{
						label: "Organisation",
						children: (
							<>
								<Select
									size="small"
									variant="borderless"
									defaultValue={organisation}
									showSearch
									onChange={(val) => {
										const selectedOrg = data.find((o) => o.org_name === val);
										if (selectedOrg) {
											setFormData((prev) => ({
												...prev,
												Organisation: val,
												orgId: selectedOrg.org_id,
											}));
										} else {
											setFormData((prev) => ({
												...prev,
												Organisation: val,
												orgId: "",
											}));
										}
									}}
									loading={isLoading}
									allowClear
									className="bg-gray-50 outline-none border-0 hover:border-2 focus:border-2 text-center peer invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-4-pink-500 border-none disabled:cursor-not-allowed w-full"
									options={(data || []).map((d) => ({
										value: d.org_name,
										label: d.org_name,
									}))}
									disabled={checkDets}
								/>
								{data ? (
									!data.find((o) => o.org_name === formData.Organisation) ? (
										<p className="mt-1 peer-valid:hidden peer-invalid:visible text-pink-600 text-2xs">
											Only employees of registered organisations can proceed
										</p>
									) : null
								) : null}
							</>
						),
					},
					{
						label: "validity",
						span: { xl: 2, xxl: 2 },
						children: (
							<RangePicker
								picker="year"
								id={{
									start: "startInput",
									end: "endInput",
								}}
								onChange={(dates, dateStrings) => {
									const startDateString = dateStrings[0]
										? `${dateStrings[0]}-01-01`
										: "";
									const endDateString = dateStrings[1]
										? `${dateStrings[1]}-12-31`
										: "";
									setFormData({
										...formData,
										start: startDateString,
										end: endDateString,
									});
								}}
								minDate={dayjs("2005-01-01", "YYYY")}
								maxDate={dayjs("2099-01-01", "YYYY")}
							/>
						),
					},
					{
						label: "Job Title",
						children: (
							<>
								<Input
									type="text"
									placeholder={"Director"}
									className="bg-gray-50 outline-none border-0 hover:border-2 focus:border-2 text-center peer invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-4-pink-500 border-none"
									pattern="[a-zA-Z0-9]+"
									size="small"
									defaultValue={jobTitle}
									name="JobTitle"
									required
									onChange={handleChange}
									maxLength={15}
									minLength={3}
								/>
								<p className="mt-1 peer-valid:hidden peer-invalid:visible text-pink-600 text-2xs">
									Please provide a valid job title.
								</p>
							</>
						),
					},
					{
						label: "Contact details",
						children: (
							<>
								<Input
									type="tel"
									placeholder={"9532816354"}
									className="bg-gray-50 outline-none border-0 hover:border-2 focus:border-2 text-center peer invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-4-pink-500 border-none "
									pattern="\b\d{10,12}\b"
									size="small"
									maxLength={12}
									name="Phone"
									required
									defaultValue={Number.parseInt(phone.slice(-10))}
									onChange={handleChange}
								/>
								<p className="mt-1 peer-valid:hidden peer-invalid:visible text-pink-600 text-2xs">
									Please provide a valid phone number.
								</p>
							</>
						),
					},
					{
						label: "Address",
						span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 },
						children: (
							<Input.TextArea
								showCount
								maxLength={40}
								placeholder="Shahdra,Delhi,India"
								style={{ height: 120, resize: "none" }}
								defaultValue={address}
								required
								name="Address"
								onChange={handleChange}
								minLength={5}
							/>
						),
					},
					{
						label: "Profile Picture",
						span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 },
						children: (
							<ProfilePic
								userID={userId}
								picUrl={formData.ProfilePic}
								handlePicChange={handleProfilePicChange}
							/>
						),
					},
				]}
			/>
			<Popover
				trigger="hover"
				title={errors.length > 0 ? "Errors in form" : "Details validation"}
				placement="bottom"
				arrow={false}
				content={
					errors.length > 0 ? (
						<List
							size="small"
							bordered
							dataSource={errors}
							renderItem={(item) => <List.Item>{item}</List.Item>}
						/>
					) : (
						<h1>No errors</h1>
					)
				}
			>
				<Button
					size="large"
					type="dashed"
					className={`mt-12 ${errors.length > 0 ? "bg-red-500" : checkDets ? "bg-green-500" : "bg-blue-500"}`}
					onClick={validateMyDets}
					icon={
						detLoading ? (
							<LoadingOutlined />
						) : errors.length > 0 ? (
							<CloseCircleOutlined />
						) : (
							<CheckCircleOutlined />
						)
					}
					disabled={detLoading}
				>
					Validate Details
				</Button>
			</Popover>
		</Form>
	) : null;
};

export default ManVerified;
