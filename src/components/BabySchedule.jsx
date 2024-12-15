import { useState } from "react";

import styled from "styled-components";

const Button = styled.button`
	color: red;
	margin: 10px;
	padding: 10px 20px;
	border: 1px solid black;
	background-color: white;
	cursor: pointer;
	&:hover {
		background-color: lightgray;
	}
`;

export default function BabySchedule({ onCalculate }) {
	const [wakeUpTime, setWakeUpTime] = useState("00:00");
	const [bedTime, setBedTime] = useState("00:00");

	const [awakeWindow, setAwakeWindow] = useState(0);
	const [napDuration, setNapDuration] = useState(0);
	const [numberOfNaps, setNumberOfNaps] = useState(0);

	const [napTimes, setNapTimes] = useState([]);

	const calculateNap = (startTime, awakeWindow, napDuration) => {
		// Convert wakeUpTime string to Date object
		const [hours, minutes] = startTime.split(":");
		const date = new Date();
		date.setHours(parseInt(hours, 10), parseInt(minutes, 10));

		// Add awakeWindow in hours and napDuration in minutes
		date.setHours(date.getHours() + Math.floor(awakeWindow)); // add full hours
		date.setMinutes(
			date.getMinutes() + (awakeWindow % 1) * 60 + napDuration * 60
		); // convert napDuration to minutes

		// Convert back to a time string
		return date.toTimeString().slice(0, 5); // Extracts the time in HH:MM format
	};
	const handleCalculate = (e) => {
		e.preventDefault();

		let lastNapTime = wakeUpTime;
		const calculatedNapTimes = [];

		for (let i = 0; i < numberOfNaps; i++) {
			console.log(`Calculating nap ${i + 1} starting from: ${lastNapTime}`);

			const napTime = calculateNap(lastNapTime, awakeWindow, napDuration);
			console.log(`Nap ${i + 1} time: ${napTime}`);

			calculatedNapTimes.push(napTime);
			lastNapTime = napTime; // Update the last nap time for the next iteration
		}

		setNapTimes(calculatedNapTimes);
		onCalculate(calculatedNapTimes);
	};

	return (
		<>
			<form>
				<h1>Sleeping Details</h1>
				<label>
					Wake up Time:
					<input
						name="wake_up_time"
						type="time"
						value={wakeUpTime}
						onChange={(e) => setWakeUpTime(e.target.value)}
					/>
				</label>
				<br />
				<label>
					Bedtime:
					<input
						name="bedTime"
						type="time"
						value={bedTime}
						onChange={(e) => setBedTime(e.target.value)}
					/>
				</label>
				<br />
				<label>
					Awake Window:
					<input
						name="awake window"
						type="number"
						min="0"
						max="60"
						value={awakeWindow}
						onChange={(e) => setAwakeWindow(parseFloat(e.target.value)) || 0}
					/>
					Hrs
				</label>
				<br />
				<label>
					Nap Duration:
					<input
						name="nap duration"
						type="number"
						min="0"
						max="12"
						value={napDuration}
						onChange={(e) => setNapDuration(e.target.value)}
					/>
				</label>
				Hrs
				<br />
				<label>
					Number of Naps:
					<input
						name="number of naps"
						type="number"
						min="0"
						max="5"
						value={numberOfNaps}
						onChange={(e) => setNumberOfNaps(e.target.value)}
					/>
				</label>
				<br />
				<Button type="button" onClick={handleCalculate}>
					Calculate Nap Schedule
				</Button>
				<hr />
			</form>
		</>
	);
}
