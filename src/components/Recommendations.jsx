import PropTypes from "prop-types";
import NapScheduleData from "./NapScheduleData";
import styled from "styled-components";

const Name = styled.h2`
	color: ${(props) => (props.name ? "blue" : "black")};
`;

export default function Recommendations(props) {
	const { ageInMonths, name } = props;

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
			<h1>Recommendations </h1>
			<div>
				<Name name={name}>Name: {name}</Name>
				<h2>Age of Baby: {ageInMonths} Months </h2>
			</div>
			<ul>
				<li>Awake Window: {awake_windows_hours}</li>
				<li>Nap Duration Hours:{nap_duration_hours}</li>
				<li>Number of Naps per day: {number_of_naps_per_day}</li>
			</ul>
			<hr />
		</>
	);
}

Recommendations.propTypes = {
	ageInMonths: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
};
