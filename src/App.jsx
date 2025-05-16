import { useState, useReducer } from "react";
import BabyInfo from "./components/BabyInfo";
import Recommendations from "./components/Recommendations";
import PersonalNapSchedule from "./components/PersonalNapSchedule";
import BabySchedule from "./components/BabySchedule";
import Summary from "./components/Summary";
import dayjs from "dayjs";

const bedTimeReducer = (state, action) => {
	switch (action.type) {
		case "SET_BEDTIME": {
			const { timeStr } = action.payload;
			const [hours, minutes] = timeStr.split(":").map(Number);
			const totalMinutes = hours * 60 + minutes;
			const formatted = dayjs().hour(hours).minute(minutes).format("h:mm A");

			return {
				time: timeStr,
				totalMinutes,
				formatted,
			};
		}
		default:
			return state;
	}
};

function App() {
	const [ageInMonths, setAgeInMonths] = useState(0);
	const [awakeWindow, setAwakeWindow] = useState(0);
	const [napDuration, setNapDuration] = useState(0);

	const [napTimes, setNapTimes] = useState([
		"00:00",
		"00:00",
		"00:00",
		"00:00",
	]);

	const [endOfNapTimes, setEndOfNapTimes] = useState([
		"00:00",
		"00:00",
		"00:00",
		"00:00",
	]);

	const [bedTime, dispatchBedTime] = useReducer(bedTimeReducer, {
		time: "19:00",
		totalMinutes: 1140,
		formatted: "7:00 PM",
	});

	const [newNapTimes, setNewNapTimes] = useState([]);
	const [newEndOfNapTimes, setNewEndOfNapTimes] = useState([]);
	const [napNumber, setNapNumber] = useState(0);

	const updateBedTime = (timeStr) => {
		dispatchBedTime({ type: "SET_BEDTIME", payload: { timeStr } });
	};

	const updateNewNapTimes = (newNapTimes) => {
		setNewNapTimes(newNapTimes);
	};

	const updateNewEndNapTimes = (newEnd) => {
		setNewEndOfNapTimes(newEnd);
	};

	const updateAwakeWindow = (awakeWindowNumber) => {
		setAwakeWindow(awakeWindowNumber);
	};

	const updateBabyAge = (age) => {
		setAgeInMonths(age);
	};

	const updateNaps = (napTimesArray) => {
		setNapTimes(napTimesArray);
	};

	const updateEndOfNapTimes = (endOfNapTimesArray) => {
		setEndOfNapTimes(endOfNapTimesArray);
	};

	const updateNapDuration = (num) => {
		setNapDuration(num);
	};

	const updateNapNumber = (num) => {
		setNapNumber(num);
	};

	const finalNapTimes = newNapTimes?.some((time) => time !== "00:00")
		? newNapTimes
		: napTimes;

	const finalEndNapTimes = newEndOfNapTimes?.some((time) => time !== "00:00")
		? newEndOfNapTimes
		: endOfNapTimes;

	console.log(finalEndNapTimes, "finalEndNapTimes");

	return (
		<>
			<h1>Welcome to Nap Calculator</h1>
			<BabyInfo onUpdate={updateBabyAge} />
			<Recommendations ageInMonths={ageInMonths} />

			<BabySchedule
				onCalculateNap={updateNaps}
				onCalculateEndOfNap={updateEndOfNapTimes}
				onBedTimeChange={updateBedTime}
				onAwakeWindow={updateAwakeWindow}
				onNapDuration={updateNapDuration}
				onNumberOfNaps={updateNapNumber}
			/>

			<PersonalNapSchedule
				napTimes={napTimes}
				napDuration={napDuration}
				endOfNapTimes={endOfNapTimes}
				awakeWindow={awakeWindow}
				napNumber={napNumber}
				onNewNapTimes={updateNewNapTimes}
				onNewEndNapTimes={updateNewEndNapTimes}
			/>

			<Summary
				napTimes={finalNapTimes}
				endOfNapTimes={finalEndNapTimes}
				bedTime={bedTime}
			/>
		</>
	);
}

export default App;
