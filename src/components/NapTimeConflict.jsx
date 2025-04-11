import { useState } from "react";

export default function NapTimeConflict() {
	const [conflictTime, setConflictTime] = useState("00:00");

	const handleRecalculate = () => {
		console.log("recalculate Clicked! ");
	};
	return (
		<>
			<form>
				<h1>Nap Time Conflict Details</h1>
				<label>
					Appointment Time:
					<input
						name="conflictTime"
						type="time"
						value={conflictTime}
						onChange={(e) => setConflictTime(e.target.value)}
					/>
				</label>
				<button onClick={handleRecalculate}> Recalculate Nap Schedule</button>
				<br />

				<hr />
			</form>
		</>
	);
}
