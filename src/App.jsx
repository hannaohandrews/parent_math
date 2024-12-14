import { useState } from "react";
import Baby from "./components/Baby";
import CalculatedNapSchedule from "./components/CalculatedNapSchedule";

function App() {
	const [ageInMonths, setAgeInMonths] = useState(0);
	const updateBabyAge = (age) => {
		setAgeInMonths(age);
	};
	return (
		<>
			<h1>Welcome to Nap Calculator</h1>
			<Baby onUpdate={updateBabyAge} />
			<CalculatedNapSchedule ageInMonths={ageInMonths} />
		</>
	);
}

export default App;
