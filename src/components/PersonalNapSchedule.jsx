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
	awakeWindow,
	onNewNapTimes,
	napDuration,
}) {
	// Function parse Minutes to Hours
	function parseTimeToDaysjs(totalMinutes) {
		const hours = Math.floor(totalMinutes / 60);
		const minutes = totalMinutes % 60;
		const finalTime = dayjs()
			.hour(hours)
			.minute(minutes)
			.second(0)
			.millisecond(0);

		return finalTime.format("HH:mm");
	}

	//napTime
	const formatTimeString = (timeStr) => {
		const [hours, minutes] = timeStr.split(":").map(Number);
		return dayjs().hour(hours).minute(minutes).format("h:mm A");
	};

	const newNapTimes = napTimes.map(formatTimeString);
	const newEndOfNapTimes = endOfNapTimes.map(formatTimeString);

	//Conflict Times
	const [conflictStartTime, setConflictStartTime] = useState("00:00");
	const [conflictTimeDuration, setConflictTimeDuration] = useState(0);

	const setConflictTime = (data) => {
		setConflictStartTime(data);
	};

	const setConflictDuration = (data) => {
		setConflictTimeDuration(data);
	};

	// Recalculate New sleeping times
	const handleRecalculate = (naps, appointmentTime) => {
		function toMinutes(timeStr) {
			const [hours, minutes] = timeStr.split(":").map(Number);
			return hours * 60 + minutes;
		}

		const appointmentMinutes = toMinutes(appointmentTime);

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
		});

		// Create the new nap schedule with conflict
		const newNapsFinal = [...naps];
		const suggestFirstNewNap = parseTimeToDaysjs(
			toMinutes(naps[closestIndex]) - 90
		);

		// Constants
		const timeAddedToNap = conflictTimeDuration * 60 + 60;
		const suggestSecondNewNap = parseTimeToDaysjs(
			toMinutes(naps[closestIndex]) + timeAddedToNap
		);
		const suggestThirdNewNap = parseTimeToDaysjs(
			toMinutes(naps[closestIndex]) +
				timeAddedToNap +
				awakeWindow * 60 +
				napDuration * 60
		);

		//
		newNapsFinal[closestIndex] = suggestFirstNewNap;
		newNapsFinal[closestIndex + 1] = suggestSecondNewNap;
		newNapsFinal[closestIndex + 2] = suggestThirdNewNap;

		console.log("NEW NAPS", newNapsFinal);

		onNewNapTimes(newNapsFinal);
		return newNapsFinal;
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
	onNewNapTimes: PropTypes.arrayOf(PropTypes.string).isRequired,
	napTimes: PropTypes.arrayOf(PropTypes.string).isRequired,
	bedTime: PropTypes.object.isRequired,
	endOfNapTimes: PropTypes.arrayOf(PropTypes.string).isRequired,
	awakeWindow: PropTypes.number.isRequired,
	napDuration: PropTypes.number.isRequired,
};
