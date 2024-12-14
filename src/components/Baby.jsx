import styled from "styled-components";
import { useState } from "react";
import PropTypes from "prop-types";

const Button = styled.button`
	color: blue;
`;

function Baby({ onUpdate }) {
	const [name, setName] = useState("");
	const [birthdate, setBirthdate] = useState(new Date());
	const [wakeUpTime, setWakeUpTime] = useState("00:00");
	const [bedTime, setBedTime] = useState("00:00");

	const calculateAge = (event) => {
		event.preventDefault();

		const today = new Date();
		const birthdateDate = new Date(birthdate);
		const ageInYears = today.getFullYear() - birthdateDate.getFullYear();
		const ageInMonths = ageInYears * 12;
		const monthDiff = today.getMonth() - birthdateDate.getMonth();
		const ageTotalMonths = ageInMonths + monthDiff;

		onUpdate(ageTotalMonths); //Calling the handler to update the state in App
	};

	return (
		<>
			<h1>Baby Info</h1>
			<form>
				<label>
					Name:{" "}
					<input
						name="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</label>
				<br />
				<label>
					Date of Birth:{" "}
					<input
						name="birthdate"
						type="date"
						value={birthdate}
						onChange={(e) => setBirthdate(e.target.value)}
					/>
				</label>
				<br />
				<label>
					Wake up Time
					<input
						name="wake_up_time"
						type="time"
						value={wakeUpTime}
						onChange={(e) => setWakeUpTime(e.target.value)}
					/>
				</label>
				<br />
				<label>
					Bedtime
					<input
						name="bedTime"
						type="time"
						value={bedTime}
						onChange={(e) => setBedTime(e.target.value)}
					/>
				</label>
				<br />
				<Button type="submit" onClick={calculateAge}>
					Calculate Nap Schedule
				</Button>
				<hr />
			</form>
		</>
	);
}

Baby.propTypes = {
	onUpdate: PropTypes.func.isRequired,
};

export default Baby;
