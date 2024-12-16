import { useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

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

export default function BabySchedule({ onCalculate }) {
	const [wakeUpTime, setWakeUpTime] = useState("00:00");
	const [bedTime, setBedTime] = useState("00:00");

	const [awakeWindow, setAwakeWindow] = useState(0);
	const [napDuration, setNapDuration] = useState(0);
	const [numberOfNaps, setNumberOfNaps] = useState(0);

	const [napTimes, setNapTimes] = useState([]);

	const calculateNap = (startTime, awakeWindow, napDuration) => {
		const [hours, minutes] = startTime.split(":");
		const startTimeParsed = dayjs()
			.hour(parseInt(hours, 10))
			.minute(parseInt(minutes, 10));

		const awakeWindowDurationInHours = dayjs.duration(awakeWindow, "hours");
		const napDurationInHours = dayjs.duration(napDuration, "hours");

		const napTime = startTimeParsed
			.add(awakeWindowDurationInHours)
			.add(napDurationInHours);

		return napTime.format("hh:mm A");
	};

	const handleCalculate = (e) => {
		e.preventDefault();

		let lastNapTime = wakeUpTime;
		const calculatedNapTimes = [];

		for (let i = 0; i < numberOfNaps; i++) {
			const napTime = calculateNap(lastNapTime, awakeWindow, napDuration);

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
