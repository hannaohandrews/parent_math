import { useState } from "react";

import styled from "styled-components";

const Button = styled.button`
	color: red;
`;

export default function BabySchedule() {
	const [wakeUpTime, setWakeUpTime] = useState("00:00");
	const [bedTime, setBedTime] = useState("00:00");
	const [awakeWindow, setAwakeWindow] = useState(0);

	const [napDuration, setNapDuration] = useState(0);
	const [numberOfNaps, setNumberOfNaps] = useState(0);

	const [firstNap, setFirstNap] = useState("00:00");

	const handleClick = (e) => {
		e.preventDefault();

		//convert wakeUpTime string to Date object
		const [hours, minutes] = wakeUpTime.split(":");
		const date = new Date();
		date.setHours(parseInt(hours, 10));
		date.setMinutes(parseInt(minutes, 10));

		// add awakeWindows
		date.setHours(date.getHours() + parseInt(awakeWindow, 10));

		// convert back to a time string
		const newTime = date.toTimeString().slice(0, 5);

		setFirstNap(newTime);
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
						onChange={(e) => setAwakeWindow(e.target.value)}
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
						max="60"
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
				<Button type="submit" onClick={handleClick}>
					Calculate Nap Schedule
				</Button>
				<hr />
			</form>
			<h1> Personalized Nap Schedule</h1>
			<div>FIRST NAP {firstNap}</div>
		</>
	);
}
