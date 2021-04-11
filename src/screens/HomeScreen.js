import { useHistory } from "react-router-dom"

import Routes from "../routes"

export default function HomeScreen() {
	const history = useHistory()

	const handleStartQuiz = () => {
		history.push(Routes.quiz)
	}

	return (
		<>
			<h1
				style={{
					fontSize: 28,
					fontWeight: "bold",
					marginBottom: 96,
				}}
			>
				Welcome to the Trivia Challenge!
			</h1>

			<h3
				style={{
					fontSize: 26,
					fontWeight: "normal",
					marginBottom: 96,
				}}
			>
				You will be presented with 10 True or False questions.
			</h3>

			<h4
				style={{
					fontSize: 26,
					fontWeight: "normal",
					marginBottom: 96,
				}}
			>
				Can you score 100%
			</h4>

			<p>
				<button className="btn btn-primary" onClick={handleStartQuiz}>
					BEGIN
				</button>
			</p>
		</>
	)
}
