export default function NapTimeConflict() {
	return (
		<>
			<form>
				<h1>Nap Time Conflict Details</h1>
				<label>
					Appointment Time
					<input name="wake_up_time" type="time" />
				</label>
				<br />

				<br />
				<label>
					Earlier Bedtime:
					<input type="checkbox" name="earlierBetime_checkbox" />
				</label>
				<br />
				<label>
					Later Bedtime: <input type="checkbox" name="laterBedtime_checkbox" />
				</label>
				<hr />
			</form>
		</>
	);
}

// import { useState, useCallback } from "react";
// import styled from "styled-components";
// import dayjs from "dayjs";
// import duration from "dayjs/plugin/duration";
// import PropTypes from "prop-types";

// dayjs.extend(duration);

// const Button = styled.button`
// 	color: red;
// 	margin: 10px;
// 	padding: 10px 20px;
// 	border: 1px solid black;
// 	background-color: white;
// 	cursor: pointer;
// 	&:hover {
// 		background-color: yellow;
// 	}
// `;

// export default function BabySchedule({
// 	onCalculateNap,
// 	onCalculateEndOfNap,
// 	onBedTimeChange,
// }) {
// 	const [wakeUpTime, setWakeUpTime] = useState("00:00");
// 	const [localBedTime, setlocalBedTime] = useState("00:00");

// 	const [awakeWindow, setAwakeWindow] = useState(0);
// 	const [awakeHour, setAwakeHour] = useState(0);
// 	const [awakeMin, setAwakeMin] = useState(0);

// 	const [napDuration, setNapDuration] = useState(0);
// 	const [numberOfNaps, setNumberOfNaps] = useState(0);

// 	const [napTimes, setNapTimes] = useState([]);
// 	const [napEndTimes, setNapEndTimes] = useState([]);

// 	const calculateNap = (startTime, awakeWindow, napDuration) => {
// 		console.log(awakeWindow);
// 		const [hours, minutes] = startTime.split(":");
// 		const startTimeParsed = dayjs()
// 			.hour(parseInt(hours, 10))
// 			.minute(parseInt(minutes, 10))
// 			.second(0);

// 		const awakeWindowDurationInHours = dayjs.duration(awakeWindow, "hours");
// 		const napDurationInHours = dayjs.duration(napDuration, "hours");

// 		const napTime = startTimeParsed
// 			.add(awakeWindowDurationInHours)
// 			.add(napDurationInHours);

// 		return napTime.format("HH:mm ");
// 	};

// 	const calculateFirstNap = (startTime, awakeWindow) => {
// 		console.log(awakeWindow, "awakeWindow");
// 		const [hours, minutes] = startTime.split(":");
// 		const startTimeParsed = dayjs()
// 			.hour(parseInt(hours, 10))
// 			.minute(parseInt(minutes, 10))
// 			.second(0);

// 		const awakeWindowDurationInHours = dayjs.duration(awakeWindow, "hours");

// 		const napTime = startTimeParsed.add(awakeWindowDurationInHours);

// 		return napTime.format("HH:mm ");
// 	};

// 	const calculateEndOfNap = (napTime, napDuration) => {
// 		const [hours, minutes] = napTime.split(":");
// 		const startTimeParsed = dayjs()
// 			.hour(parseInt(hours, 10))
// 			.minute(parseInt(minutes, 10))
// 			.second(0);

// 		const napDurationInHours = dayjs.duration(napDuration, "hours");

// 		const endOfNapTime = startTimeParsed.add(napDurationInHours);

// 		return endOfNapTime.format("HH:mm ");
// 	};

// 	const handleCalculate = useCallback(
// 		(e) => {
// 			e.preventDefault();
// 			const awakeMinInHours = parseFloat(awakeMin / 60).toPrecision(3);
// 			const windowInHours = Number(awakeHour) + Number(awakeMinInHours);
// 			console.log(windowInHours, "windowInHours");

// 			let lastNapTime = wakeUpTime;
// 			const calculatedNapTimes = [];
// 			const calculatedEndOfNapTimes = [];

// 			for (let i = 0; i < numberOfNaps; i++) {
// 				let napTime;
// 				let endOfNapTime;
// 				if (i === 0) {
// 					napTime = calculateFirstNap(lastNapTime, windowInHours);
// 					endOfNapTime = calculateEndOfNap(napTime, napDuration);
// 				} else {
// 					napTime = calculateNap(lastNapTime, windowInHours, napDuration);
// 					endOfNapTime = calculateEndOfNap(napTime, napDuration);
// 				}

// 				calculatedEndOfNapTimes.push(endOfNapTime);
// 				calculatedNapTimes.push(napTime);

// 				lastNapTime = napTime; // Update the last nap time for the next iteration
// 			}

// 			setNapEndTimes(calculatedEndOfNapTimes);
// 			onCalculateEndOfNap(calculatedEndOfNapTimes);

// 			setNapTimes(calculatedNapTimes);
// 			onCalculateNap(calculatedNapTimes);
// 		},
// 		[
// 			awakeMin,
// 			awakeHour,
// 			wakeUpTime,
// 			onCalculateEndOfNap,
// 			onCalculateNap,
// 			numberOfNaps,
// 			napDuration,
// 		]
// 	);

// 	const handleBedTimeChange = (e) => {
// 		const newBedTime = e.target.value;
// 		setlocalBedTime(newBedTime);
// 		onBedTimeChange(newBedTime);
// 	};

// 	return (
// 		<>
// 			<form>
// 				<h1>Sleeping Details</h1>
// 				<label>
// 					Wake up Time:
// 					<input
// 						name="wake_up_time"
// 						type="time"
// 						value={wakeUpTime}
// 						onChange={(e) => setWakeUpTime(e.target.value)}
// 					/>
// 				</label>
// 				<br />
// 				<label>
// 					Bedtime:
// 					<input
// 						name="bedTime"
// 						type="time"
// 						value={localBedTime}
// 						onChange={handleBedTimeChange}
// 					/>
// 				</label>
// 				<br />
// 				<label>
// 					Awake Window:
// 					<input
// 						name="awake hour"
// 						type="number"
// 						min="0"
// 						max="12"
// 						value={awakeHour}
// 						onChange={(e) => setAwakeHour(Number(e.target.value))}
// 					/>
// 					hrs
// 					<input
// 						name="awake min"
// 						type="number"
// 						min="0"
// 						max="60"
// 						value={awakeMin}
// 						onChange={(e) => setAwakeMin(Number(e.target.value))}
// 					/>
// 					min
// 				</label>
// 				<br />
// 				<label>
// 					Nap Duration:
// 					<input
// 						name="nap duration"
// 						type="number"
// 						min="0"
// 						max="12"
// 						value={napDuration}
// 						onChange={(e) => setNapDuration(Number(e.target.value))}
// 					/>
// 				</label>
// 				Hrs
// 				<br />
// 				<label>
// 					Number of Naps:
// 					<input
// 						name="number of naps"
// 						type="number"
// 						min="0"
// 						max="5"
// 						value={numberOfNaps}
// 						onChange={(e) => setNumberOfNaps(Number(e.target.value))}
// 					/>
// 				</label>
// 				<br />
// 				<Button type="button" onClick={handleCalculate}>
// 					Calculate Nap Schedule
// 				</Button>
// 				<hr />
// 			</form>
// 		</>
// 	);
// }

// BabySchedule.propTypes = {
// 	onCalculateNap: PropTypes.func.isRequired,
// 	onCalculateEndOfNap: PropTypes.func.isRequired,
// 	onBedTimeChange: PropTypes.func.isRequired,
// };
