import { useState } from "react"

import "./App.css"

import { Instructions } from "./components/"

function App() {
	const [count, setCount] = useState(0)

	return (
		<>
			<h1>Idea Board</h1>
			<div className='card'>
				<button onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</button>
			</div>
			<Instructions />
		</>
	)
}

export default App
