import styled from "styled-components";
import { useState } from "react";
import PropTypes from "prop-types";

const Button = styled.button`
	color: blue;
`;

export default function BabyInfo({ onUpdate }) {
	const [name, setName] = useState("");
	const [birthdate, setBirthdate] = useState(new Date());

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

				<Button type="submit" onClick={calculateAge}>
					Show recommended schedule
				</Button>
				<hr />
			</form>
		</>
	);
}

BabyInfo.propTypes = {
	onUpdate: PropTypes.func.isRequired,
};
