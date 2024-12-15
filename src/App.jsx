import { useState } from "react";
import BabyInfo from "./components/BabyInfo";
import Recommendations from "./components/Recommendations";
import PersonalNapSchedule from "./components/PersonalNapSchedule";
import BabySchedule from "./components/BabySchedule";

function App() {
	const [ageInMonths, setAgeInMonths] = useState(0);

	const updateBabyAge = (age) => {
		setAgeInMonths(age);
	};

	return (
		<>
			<h1>Welcome to Nap Calculator</h1>
			<BabyInfo onUpdate={updateBabyAge} />
			<Recommendations ageInMonths={ageInMonths} />
			<BabySchedule />
			<PersonalNapSchedule />
		</>
	);
}

export default App;
