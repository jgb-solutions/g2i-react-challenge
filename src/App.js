import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { useHistory } from "react-router-dom"

// Screens
import HomeScreen from "./screens/HomeScreen"
import QuizScreen from "./screens/QuizScreen"
import ResultsScreen from "./screens/ResultsScreen"

//  Routers
import Routes from "./routes"

// Layouts
import DefaultLayout from "./components/layouts/Default"

// import CSS
import "bootstrap/dist/css/bootstrap.min.css"

export default function App() {
	return (
		<Router>
			<DefaultLayout>
				<Switch>
					<Route path={Routes.home} exact>
						<HomeScreen />
					</Route>
					<Route path={Routes.quiz} exact>
						<QuizScreen />
					</Route>
					<Route path={Routes.results} exact>
						<ResultsScreen />
					</Route>

					<Route>
						<NoMatch />
					</Route>
				</Switch>
			</DefaultLayout>
		</Router>
	)
}

function NoMatch() {
	const history = useHistory()

	const handleGoToHomeScreen = () => {
		history.push(Routes.home)
	}

	return (
		<div>
			<h1>404!!! Page not found</h1>

			<p>
				<button className="btn btn-primary" onClick={handleGoToHomeScreen}>
					Go to the homepage
				</button>
			</p>
		</div>
	)
}
