import PropTypes from "prop-types";
import styled from "styled-components";

const NapContainer = styled.div`
	margin-top: 20px;
`;

const NapItem = styled.div`
	font-size: 18px;
	margin: 10px 0;
`;

export default function PersonalNapSchedule({ napTimes }) {
	return (
		<>
			<NapContainer>
				<h1> Personalized Nap Schedule</h1>
				{napTimes.length > 0 ? (
					napTimes.map((napTime, index) => (
						<NapItem key={index}>
							Nap Number {index + 1}: {napTime}
						</NapItem>
					))
				) : (
					<div>No naps!</div>
				)}
			</NapContainer>
		</>
	);
}

PersonalNapSchedule.propTypes = {
	napTimes: PropTypes.arrayOf(PropTypes.string).isRequired,
};
