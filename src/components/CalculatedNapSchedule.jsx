import PropTypes from "prop-types";
import NapScheduleData from "./NapScheduleData";

export default function CalculatedNapSchedule({ ageInMonths }) {
	const napSchedule = NapScheduleData.find((data) =>
		data.age.includes(ageInMonths)
	);

	const {
		awake_windows_hours = "N/A",
		nap_duration_hours = "N/A",
		number_of_naps_per_day = "N/A",
	} = napSchedule || {};

	return (
		<>
			<h1>Recommended Nap Schedule</h1>
			<div>
				<h2>Age of Baby: {ageInMonths} Months </h2>
			</div>
			<ul>
				<li>Awake Window: {awake_windows_hours}</li>
				<li>Nap Duration Hours:{nap_duration_hours}</li>
				<li>Number of Naps per day: {number_of_naps_per_day}</li>
			</ul>
		</>
	);
}

CalculatedNapSchedule.propTypes = {
	ageInMonths: PropTypes.number.isRequired,
};
