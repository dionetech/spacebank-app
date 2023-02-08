import { useEffect } from "react";
import { Router } from "./routes";
import Aos from "aos";

const App = () => {

	useEffect(() => {
		Aos.init({
			duration: "1500"
		});
	})

	return (
		<Router />
	)
}

export default App;