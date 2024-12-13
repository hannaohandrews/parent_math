import styled from "styled-components";
import { useState } from "react";

const Button = styled.button`
	color: blue;
`;

export default function Baby() {
	const [name, setName] = useState("");
	const [birthdate, setBirthdate] = useState();
	const [age, setAge] = useState(0);

	const calculateAge = () => {
		const today = new Date();
		const birthdateDate = new Date(birthdate);

		let age = today.getFullYear() - birthdateDate.getFullYear();
		const monthDiff = today.getMonth() - birthdateDate.getMonth();

		if (
			monthDiff < 0 ||
			(monthDiff === 0 && today.getDate() < birthdateDate.getDate())
		) {
			age--;
		}

		setAge(age);
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
				<button onClick={calculateAge}>Calculate Age</button>
				<hr />
			</form>

			<div>
				<h1>Baby Age: {age > 0 ? `${age}` : ""}</h1>
			</div>
		</>
	);
}
