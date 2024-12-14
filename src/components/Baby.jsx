import styled from "styled-components";
import { useState } from "react";
import PropTypes from "prop-types";

const Button = styled.button`
	color: blue;
`;

function Baby({ onUpdate }) {
	const [name, setName] = useState("");
	const [birthdate, setBirthdate] = useState(new Date());
	const [ageYears, setAgeYears] = useState(0);
	const [ageMonths, setAgeMonths] = useState(0);
	const [message, setMessage] = useState("");

	const calculateAge = () => {
		const today = new Date();
		const birthdateDate = new Date(birthdate);

		const ageInYears = today.getFullYear() - birthdateDate.getFullYear();
		const ageInMonths = ageInYears * 12;
		const monthDiff = today.getMonth() - birthdateDate.getMonth();
		const ageTotalMonths = ageInMonths + monthDiff;

		if (ageTotalMonths < 0) {
			setMessage("Your birthday can't be in the future");
		} else {
			setAgeYears(ageInYears);
			setAgeMonths(ageTotalMonths);
			onUpdate(ageTotalMonths); //Calling the handler to update the state in App
		}
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
				<Button type="button" onClick={calculateAge}>
					Calculate Age
				</Button>
				<hr />
				<div>
					<h1>Age of Baby</h1>
					<h2>Years: {ageYears > 0 ? `${ageYears}` : "0"} </h2>
					<h2>Months: {ageMonths > 0 ? `${ageMonths} ` : `${message}`} </h2>
				</div>
				<hr />
			</form>
		</>
	);
}

Baby.propTypes = {
	onUpdate: PropTypes.func.isRequired,
};

export default Baby;
