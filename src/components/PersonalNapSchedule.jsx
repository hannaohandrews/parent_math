import PropTypes from "prop-types";
import styled from "styled-components";
import dayjs from "dayjs";

const NapContainer = styled.div`
	margin-top: 20px;
	display: flex;
	flex-direction: row;
`;

const NapItem = styled.div`
	font-size: 18px;
	margin: 20px;
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
			<NapContainer>
				<NapItem>
					{newNapTimes.map((napTime, index) => (
						<div key={index}>
							Start Nap {index + 1}: {napTime}
						</div>
					))}
				</NapItem>

				<NapItem>
					{newEndOfNapTimes.map((napTime, index) => (
						<div key={index}>
							End Nap {index + 1}: {napTime}
						</div>
					))}
				</NapItem>
			</NapContainer>

			<h2>Summary</h2>

			<div>
				<p>Total Nap Time: {newNapTimes.length}</p>
				<p>Bedtime: {bedTimeLocal}</p>
				<p>
					Time difference between end of last nap and bedtime:{" "}
					{timeDifferenceInHours < 0 ? 0 : timeDifferenceInHours} hrs
				</p>
			</div>
		</>
	);
}

PersonalNapSchedule.propTypes = {
	napTimes: PropTypes.arrayOf(PropTypes.string).isRequired,
	bedTime: PropTypes.string.isRequired,
	endOfNapTimes: PropTypes.arrayOf(PropTypes.string).isRequired,
};
