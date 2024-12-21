import PropTypes from "prop-types";
import styled from "styled-components";
import dayjs from "dayjs";

const NapContainer = styled.div`
	margin-top: 20px;
`;

const NapItem = styled.div`
	font-size: 18px;
	margin: 10px 0;
`;

export default function PersonalNapSchedule({ napTimes, bedTime }) {
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

	//lastNap
	const lastNap = napTimes[napTimes.length - 1];
	const [lastNapHours, lastNapMinutes] = lastNap.split(":");

	const lastNapParsed = dayjs()
		.hour(parseInt(lastNapHours, 10))
		.minute(parseInt(lastNapMinutes, 10));

	const timeDifferenceInMS = bedTimeParsed.diff(lastNapParsed);
	const timeDifferenceDuration = dayjs.duration(timeDifferenceInMS);
	const timeDifferenceInHours = Math.floor(timeDifferenceDuration.asHours());

	return (
		<NapContainer>
			<h1>Personalized Nap Schedule</h1>
			{newNapTimes.map((napTime, index) => (
				<NapItem key={index}>
					Nap Number {index + 1}: {napTime}
				</NapItem>
			))}
			<h3>Bedtime: {bedTimeLocal}</h3>
			<div>
				<p>
					Time difference between last nap and bedtime:{" "}
					{timeDifferenceInHours < 0 ? 0 : timeDifferenceInHours} hrs
				</p>
			</div>
		</NapContainer>
	);
}

PersonalNapSchedule.propTypes = {
	napTimes: PropTypes.arrayOf(PropTypes.string).isRequired,
	bedTime: PropTypes.string.isRequired,
};
