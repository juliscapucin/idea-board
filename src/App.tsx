import { useState } from "react"

import "./App.css"

import { IdeaCard, Instructions } from "./components/"

function App() {
	const [count, setCount] = useState(0)

	const createIdea = () => {
		console.log("createIdea")
	}

	return (
		<>
			<h1>Idea Board</h1>
			<div className='card'>
				<button onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</button>
			</div>
			<Instructions />
			<button onClick={() => createIdea()}>Create a new idea</button>
			<IdeaCard />
		</>
	)
}

export default App
