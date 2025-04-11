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

	return (
		<>
			<h1>Personalized Nap Schedule</h1>
			<div>
				<NapContainer>
					<table>
						<tr>
							<th>#</th>
							<th>Start</th>
							<th>End</th>
						</tr>
						<td>
							<NapItem>
								{newNapTimes.map((napTime, index) => (
									<div key={index}>{index + 1}</div>
								))}
							</NapItem>
						</td>
						<td>
							<NapItem>
								{newNapTimes.map((napTime, index) => (
									<div key={index}>{napTime}</div>
								))}
							</NapItem>
						</td>
						<td>
							<NapItem>
								{newEndOfNapTimes.map((napTime, index) => (
									<div key={index}>{napTime}</div>
								))}
							</NapItem>
						</td>
					</table>
				</NapContainer>
				<button> Nap time conflict – Click to Adjust </button>
				<br />
				<button> Edit</button>
				<br />
				<button> Save</button>
			</div>
			<hr />
		</>
	);
}

PersonalNapSchedule.propTypes = {
	napTimes: PropTypes.arrayOf(PropTypes.string).isRequired,
	bedTime: PropTypes.string.isRequired,
	endOfNapTimes: PropTypes.arrayOf(PropTypes.string).isRequired,
};
