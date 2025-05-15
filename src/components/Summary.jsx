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

export default function Summary({ napTimes, endOfNapTimes, bedTime }) {
	function formatNapTime(timeStr, format = "h:mm A") {
		const [hours, minutes] = timeStr.split(":").map(Number);
		return dayjs().hour(hours).minute(minutes).format(format);
	}
	const formatMinutesTo12Hour = (totalMinutes) => {
		const hours = Math.floor(totalMinutes / 60);
		const minutes = totalMinutes % 60;

		return dayjs()
			.hour(hours)
			.minute(minutes)
			.second(0)
			.millisecond(0)
			.format("h:mm A");
	};

	const finalNapTimes = napTimes.map((napTime) => formatNapTime(napTime));
	const newEndOfNapTimes = endOfNapTimes.map((endTime) =>
		formatNapTime(endTime)
	);

	const earlyBedTimeFinal = formatMinutesTo12Hour(bedTime.totalMinutes - 120);

	const laterBedTimeFinal = formatMinutesTo12Hour(bedTime.totalMinutes + 120);

	return (
		<>
			<h1>Final Nap Schedule</h1>
			<div>
				<NapContainer>
					<table>
						<thead>
							<tr>
								<th>#</th>
								<th>Start</th>
								<th>End</th>
							</tr>
						</thead>
						<tbody>
							{finalNapTimes.map((napTime, index) => (
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
								</tr>
							))}
						</tbody>
					</table>
				</NapContainer>
			</div>
			<hr />
			<h2>Summary</h2>
			<div>
				<p>Total Nap Time: {finalNapTimes.length}</p>
			</div>
			<p>
				Early Bedtime Option: Skip last nap and move bedtime to{" "}
				{earlyBedTimeFinal}
			</p>
			<p>
				Later Bedtime Option: Have all {finalNapTimes.length} Naps and move
				bedtime to {laterBedTimeFinal}
			</p>
		</>
	);
}

Summary.propTypes = {
	napTimes: PropTypes.arrayOf(PropTypes.string).isRequired,
	endOfNapTimes: PropTypes.arrayOf(PropTypes.string).isRequired,
	bedTime: PropTypes.object.isRequired,
};
