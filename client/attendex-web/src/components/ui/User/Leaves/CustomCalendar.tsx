import { useState, type FC } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { addDays } from "date-fns";
import { DateRange } from "react-date-range";
import "../../../../styles/UserStyles/CalendarStyles.css";

const CustomCalendar: FC = () => {
	const [state, setState] = useState([
		{
			startDate: new Date(),
			endDate: addDays(new Date(), 7),
			key: "selection",
		},
	]);

	return (
		<div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg drop-shadow-sm">
			<DateRange
				onChange={(item: {
					selection: { startDate: Date; endDate: Date; key: string };
				}) => {
					setState([item.selection]);
				}}
				showSelectionPreview={true}
				moveRangeOnFirstSelection={false}
				months={1}
				ranges={state}
				className="custom-calendar"
				direction="horizontal"
				minDate={new Date()}
				showMonthAndYearPickers={false}
			/>
		</div>
	);
};

export default CustomCalendar;
