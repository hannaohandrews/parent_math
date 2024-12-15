import { useState } from "react";
import BabyInfo from "./components/BabyInfo";
import Recommendations from "./components/Recommendations";
import PersonalNapSchedule from "./components/PersonalNapSchedule";
import BabySchedule from "./components/BabySchedule";

function App() {
	const [ageInMonths, setAgeInMonths] = useState(0);
	const [name, setName] = useState("");

	const [napTimes, setNapTimes] = useState([
		"00:00",
		"00:00",
		"00:00",
		"00:00",
	]);

	const updateBabyAge = (age, name) => {
		setAgeInMonths(age);
		setName(name);
	};

	const updateNaps = (napTimesArray) => {
		setNapTimes(napTimesArray);
	};

	return (
		<>
			<h1>Welcome to Nap Calculator</h1>
			<BabyInfo onUpdate={updateBabyAge} />
			<Recommendations ageInMonths={ageInMonths} name={name} />
			<BabySchedule onCalculate={updateNaps} />
			<PersonalNapSchedule napTimes={napTimes} />
		</>
	);
}

export default App;
