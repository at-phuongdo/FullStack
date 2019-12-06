import React from 'react';
import ReactDOM from 'react-dom'

const Header = (props) => {
	return (
		<div>
			<h1>{props.course}</h1>
		</div>
	)
}

const Part = (props) => {
	return (
		<div>
			{props.part.part} {props.part.exercises}
		</div>
	)
}

const Content = (props) => {
	return (
		<div>
			<Part part={props.content.part1}/>
			<Part part={props.content.part2}/>
			<Part part={props.content.part3}/>
		</div>
	)
}

const Total = (props) => {
	return (
		<div>
			<p>Number of exercises {props.exercises.exercises1 + props.exercises.exercises2 + props.exercises.exercises3}</p>
		</div>
	)
}

const App = () => {
	const course = 'Half Stack application development'
	const part1 = 'Fundamentals of React'
	const exercises1 = 10
	const part2 = 'Using props to pass data'
	const exercises2 = 7
	const part3 = 'State of a component'
	const exercises3 = 14

	let exercises = {
		exercises1: 10,
		exercises2: 7,
		exercises3: 14
	}

	let content = {
		part1: { part: part1, exercises: exercises1 },
		part2: { part: part2, exercises: exercises2 },
		part3: { part: part3, exercises: exercises3 }
	}
	return (
		<div>
			<Header course={course} />
			<Content content={content} />
			<Total exercises={exercises} />
		</div>
	)
}

ReactDOM.render(<App />, document.getElementById('root'))
