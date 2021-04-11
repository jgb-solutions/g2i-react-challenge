import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"

import Routes from "../routes"
import { API_URL } from "../utils/constants"

export default function QuizScreen() {
	const history = useHistory()
	const [questions, setQuestions] = useState([])
	const [currentQuestion, setCurrentQuestion] = useState({})
	const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1)
	const [score, setScore] = useState({ total: 0, choices: [] })
	const [error, setError] = ""

	const getQuizQuestions = async () => {
		try {
			const res = await fetch(API_URL)
			const json = await res.json()
			const questions = json.results
			setQuestions(questions)
			// console.log(questions);
			setCurrentQuestion(questions[0])
		} catch (error) {
			console.log(error)
			setError("We couldn't fetch the questions for this quiz.")
		}
	}

	useEffect(() => {
		getQuizQuestions()
	}, [])

	useEffect(() => {
		if (questions.length > 0) {
			const index = questions.findIndex(
				(q) => q.question === currentQuestion.question
			)

			setCurrentQuestionNumber(index + 1)
		}
	}, [questions, currentQuestion])

	useEffect(() => {
		if (score.choices.length > 0) {
			displayNextQuestion()
		}
		// eslint-disable-next-line
	}, [score.choices])

	const handleChoose = (choice) => {
		// compare the the response
		// increment the score if they are right
		// otherwise leave it as is.
		const correctAnswer = currentQuestion.correct_answer.toLowerCase()

		const isCorrectAnswer = correctAnswer === choice

		let newScore = {
			...score,
			choices: [...score.choices, isCorrectAnswer],
		}

		if (isCorrectAnswer) {
			newScore.total = score.total + 1
		}

		setScore(newScore)
	}

	const displayNextQuestion = () => {
		const newQuestion = questions[currentQuestionNumber]

		if (newQuestion) {
			setCurrentQuestion(newQuestion)
		} else {
			history.push(Routes.results, {
				score,
				questions,
			})
		}
	}

	return questions.length > 0 ? (
		<>
			<h1
				style={{
					fontSize: 28,
					fontWeight: "bold",
					marginBottom: 48,
				}}
			>
				{currentQuestion.category}
			</h1>

			<div
				style={{
					marginBottom: 12,
					padding: 48,
					fontSize: 26,
					fontWeight: "normal",
				}}
				className="border border-dark"
				dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
			/>

			<p>
				{currentQuestionNumber} / {questions.length}
			</p>

			<p>
				<button
					className="btn btn-success"
					onClick={() => handleChoose("true")}
				>
					True
				</button>
				&nbsp;
				<button
					className="btn btn-danger"
					onClick={() => handleChoose("false")}
				>
					False
				</button>
			</p>
		</>
	) : !!error ? (
		<>
			<h3 className="text-danger">{error}</h3>
			<p>
				<button className="btn btn-primary" onClick={() => getQuizQuestions()}>
					Try again
				</button>
			</p>
		</>
	) : (
		<h3>Loading...</h3>
	)
}
