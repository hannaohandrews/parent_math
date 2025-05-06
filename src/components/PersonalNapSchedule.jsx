import { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import dayjs from "dayjs";

const NapContainer = styled.div`
	margin: 10px;
	display: flex;
	flex-direction: row;
`;

const NapItem = styled.div`
	font-size: 18px;
	padding: 10px;
`;

export default function PersonalNapSchedule({
	napTimes,
	bedTime,
	endOfNapTimes,
}) {
	// Function parseTimeToDayjs

	function parseTimeToDaysjs(totalMinutes) {
		const hours = Math.floor(totalMinutes / 60);
		const minutes = totalMinutes % 60;
		const finalTime = dayjs()
			.hour(hours)
			.minute(minutes)
			.second(0)
			.millisecond(0);

		return finalTime.format("hh:mm A");
	}

	// bedTime
	const [hours, minutes] = bedTime.split(":");
	const bedTimeParsed = dayjs()
		.hour(parseInt(hours, 10))
		.minute(parseInt(minutes, 10));
	const bedTimeLocal = bedTimeParsed.format("hh:mm A");

	//napTime
	const newNapTimes = napTimes.map((napTime) => {
		const [napTimeHours, napTimeMinutes] = napTime.split(":");

		const napTimeParsed = dayjs()
			.hour(parseInt(napTimeHours, 10))
			.minute(parseInt(napTimeMinutes, 10));

		return napTimeParsed.format("h:mm A");
	});

	const newEndOfNapTimes = endOfNapTimes.map((endOfNapTime) => {
		const [endNapTimeHours, endNapTimeMinutes] = endOfNapTime.split(":");

		const endNapTimeParsed = dayjs()
			.hour(parseInt(endNapTimeHours, 10))
			.minute(parseInt(endNapTimeMinutes, 10));

		return endNapTimeParsed.format("h:mm A");
	});

	//lastNapEnding
	const lastNap = endOfNapTimes[endOfNapTimes.length - 1];
	const [lastNapHours, lastNapMinutes] = lastNap.split(":");

	const lastNapParsed = dayjs()
		.hour(parseInt(lastNapHours, 10))
		.minute(parseInt(lastNapMinutes, 10));

	const timeDifferenceInMS = bedTimeParsed.diff(lastNapParsed);
	const timeDifferenceDuration = dayjs.duration(timeDifferenceInMS);
	const timeDifferenceInHours = Math.floor(timeDifferenceDuration.asHours());

	//Conflict Times
	const [conflictStartTime, setConflictStartTime] = useState("00:00");
	const [conflictTimeDuration, setConflictTimeDuration] = useState(0);

	const setConflictTime = (data) => {
		setConflictStartTime(data);
	};

	const setConflictDuration = (data) => {
		setConflictTimeDuration(data);
	};

	console.log(conflictStartTime);
	console.log(conflictTimeDuration);

	// Recalculate New sleeping times
	const handleRecalculate = (naps, appointmentTime) => {
		console.log("naps", naps);
		function toMinutes(timeStr) {
			const [hours, minutes] = timeStr.split(":").map(Number);
			return hours * 60 + minutes;
		}

		const appointmentMinutes = toMinutes(appointmentTime);
		console.log(appointmentMinutes, "appointmentMinutes");
		// find the index of closet nap time to the appointment

		let closestIndex = -1;
		let minDiff = Infinity;

		naps.forEach((nap, index) => {
			const napMinutes = toMinutes(nap);
			const diff = Math.abs(napMinutes - appointmentMinutes);

			if (diff < minDiff) {
				minDiff = diff;
				closestIndex = index;
			}

			console.log(closestIndex, "closestIndex");
		});

		console.log(closestIndex, "closestIndex");
		// Create the new nap schedule with conflict
		const newNaps = [...naps];
		const suggestFirstNewNap = parseTimeToDaysjs(
			toMinutes(naps[closestIndex]) - 60
		);
		console.log(suggestFirstNewNap, "suggestNewNap");

		let timeAddedToNap = conflictTimeDuration * 60 + 60;
		const suggestSecondNewNap = parseTimeToDaysjs(
			toMinutes(naps[closestIndex]) + timeAddedToNap
		);

		console.log(suggestSecondNewNap, "suggestSecondNewNap");

		newNaps[closestIndex] = `SKIP Nap or Earlier Nap at ${suggestFirstNewNap}`;
		newNaps.splice(closestIndex + 1, 0, `Next Nap at ${suggestSecondNewNap}`);
		newNaps[closestIndex + 1] = `Later Nap at ${suggestSecondNewNap}`;

		newNaps.push("Suggested Early Bedtime: or Suggested Late Bedtime: ");

		console.log(newNaps);
		return newNaps;
	};
	//JSX
	return (
		<>
			<h1> Nap Schedule Example</h1>
			<div>
				<NapContainer>
					<table>
						<thead>
							<tr>
								<th>#</th>
								<th>Start Window</th>
								<th>End Window</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{newNapTimes.map((napTime, index) => (
								<tr key={index}>
									<td>
										<NapItem>{index + 1}</NapItem>
									</td>
									<td>
										<NapItem>{napTime}</NapItem>
									</td>
									<td>
										<NapItem>{newEndOfNapTimes[index]}</NapItem>
									</td>
									<td></td>
								</tr>
							))}
						</tbody>
					</table>
				</NapContainer>
				<button> Edit</button>
				<br />
				<button> Save</button>
			</div>
			<hr />
			<form>
				<h1>Nap Time Conflict Details</h1>
				<label>
					Appointment Start Time:
					<input
						name="conflictTime"
						type="time"
						value={conflictStartTime}
						onChange={(e) => setConflictTime(e.target.value)}
					/>
				</label>
				<br />
				<label>
					Appointment Duration:
					<input
						name="conflictDuration"
						type="number"
						value={conflictTimeDuration}
						onChange={(e) => setConflictDuration(e.target.value)}
					/>{" "}
					hr
				</label>
				<br />
				<button
					onClick={(e) => {
						e.preventDefault();
						handleRecalculate(napTimes, conflictStartTime);
					}}>
					{" "}
					Recalculate Nap Schedule
				</button>
				<br />

				<hr />
			</form>
		</>
	);
}

PersonalNapSchedule.propTypes = {
	napTimes: PropTypes.arrayOf(PropTypes.string).isRequired,
	bedTime: PropTypes.string.isRequired,
	endOfNapTimes: PropTypes.arrayOf(PropTypes.string).isRequired,
};
