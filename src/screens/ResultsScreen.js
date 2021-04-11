import { useHistory, useLocation } from "react-router-dom"
import { FaCheckCircle, FaWindowClose, FaInfoCircle } from "react-icons/fa"

import Routes from "../routes"

export default function ResultsScreen() {
	const history = useHistory()
	const location = useLocation()
	const { questions, score } = location.state || {}

	const handleStartQuiz = () => {
		history.push(Routes.quiz)
	}

	return questions ? (
		<>
			<h1
				style={{
					fontSize: 28,
					fontWeight: "bold",
					marginBottom: 48,
				}}
			>
				You scored <br />
				{score.total} / {questions.length}
			</h1>

			<div
				style={{
					marginBottom: 96,
					textAlign: "left",
				}}
			>
				{questions.map((question, index) => (
					<div
						className="row"
						style={{
							marginBottom: 12,
						}}
						key={index}
					>
						<div className="col-1">
							{score.choices[index] ? (
								<FaCheckCircle className="text-success" />
							) : (
								<FaWindowClose className="text-danger" />
							)}
						</div>
						<div className="col-11">
							<p
								style={{
									fontSize: 26,
									fontWeight: "normal",
								}}
								dangerouslySetInnerHTML={{ __html: question.question }}
							/>
						</div>
					</div>
				))}
			</div>

			<p>
				<button
					className="btn btn-primary text-uppercase"
					onClick={handleStartQuiz}
				>
					play again?
				</button>
			</p>
		</>
	) : (
		<div>
			<h3>
				<FaInfoCircle /> You have to play to see your results
			</h3>
			<p>
				<button
					className="btn btn-primary text-uppercase"
					onClick={handleStartQuiz}
				>
					play
				</button>
			</p>
		</div>
	)
}
