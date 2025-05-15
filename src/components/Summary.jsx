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

export default function Summary({ napTimes, endOfNapTimes }) {
	function formatNapTime(timeStr, format = "h:mm A") {
		const [hours, minutes] = timeStr.split(":").map(Number);
		return dayjs().hour(hours).minute(minutes).format(format);
	}

	const finalNapTimes = napTimes.map((napTime) => formatNapTime(napTime));
	const newEndOfNapTimes = endOfNapTimes.map((endTime) =>
		formatNapTime(endTime)
	);

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
				<button>EDIT </button>
			</div>

			<h2>Summary</h2>
			<div>
				<p>Total Nap Time: {finalNapTimes.length}</p>
			</div>
			<p>Early Bedtime Option</p>
			<p>Later Bedtime Option</p>
		</>
	);
}

Summary.propTypes = {
	napTimes: PropTypes.arrayOf(PropTypes.string).isRequired,
	endOfNapTimes: PropTypes.arrayOf(PropTypes.string).isRequired,
};
