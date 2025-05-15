import styled from "styled-components";
import { useState } from "react";
import PropTypes from "prop-types";

const Button = styled.button`
	color: red;
	margin: 10px;
	padding: 10px 20px;
	border: 1px solid black;
	background-color: white;
	cursor: pointer;
	&:hover {
		background-color: yellow;
	}
`;
export default function BabyInfo({ onUpdate }) {
	const [birthdate, setBirthdate] = useState(new Date());

	const calculateAge = (event) => {
		event.preventDefault();

		const today = new Date();
		const birthdateDate = new Date(birthdate);
		const ageInYears = today.getFullYear() - birthdateDate.getFullYear();
		const ageInMonths = ageInYears * 12;
		const monthDiff = today.getMonth() - birthdateDate.getMonth();
		const ageTotalMonths = ageInMonths + monthDiff;

		onUpdate(ageTotalMonths, name); //Calling the handler to update the state in App
	};

	return (
		<>
			<h1>Baby Info</h1>
			<form>
				<label>
					Date of Birth:
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
