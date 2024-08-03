import type { FC } from "react";
import { DatePicker, Select, Input } from "antd";

const { TextArea } = Input;
const { Option } = Select;

const LeaveForm: FC = () => {
	return (
		<div className="w-full p-4">
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div>
					<label className="block text-gray-700 mb-1">Start date</label>
					<DatePicker className="w-full" format="DD-MM-YYYY" />
				</div>
				<div>
					<label className="block text-gray-700 mb-1">End date</label>
					<DatePicker className="w-full" format="DD-MM-YYYY" />
				</div>
				<div>
					<label className="block text-gray-700 mb-1">Days</label>
					<Input className="w-full" value="3" readOnly />
				</div>
			</div>
			<div className="mt-4">
				<label className="block text-gray-700 mb-1">Approval manager</label>
				<Select defaultValue="Linda Smith" className="w-full">
					<Option value="Linda Smith">Linda Smith</Option>
					<Option value="John Doe">John Doe</Option>
					<Option value="Jane Doe">Jane Doe</Option>
				</Select>
			</div>
			<div className="mt-4">
				<label className="block text-gray-700 mb-1">Leave type</label>
				<Select defaultValue="Paid Time Off (PTO)" className="w-full">
					<Option value="Paid Time Off (PTO)">Paid Time Off (PTO)</Option>
					<Option value="Sick Leave">Sick Leave</Option>
					<Option value="Maternity Leave">Maternity Leave</Option>
				</Select>
			</div>
			<div className="mt-4">
				<label className="block text-gray-700 mb-1">Comment (optional)</label>
				<TextArea
					rows={4}
					autoSize={{ minRows: 4, maxRows: 6 }}
					placeholder="Type reason of leave"
				/>
			</div>
		</div>
	);
};

export default LeaveForm;
