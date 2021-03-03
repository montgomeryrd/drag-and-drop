import { useState } from 'react';

function App() {	
	
	class Node {
		constructor(_id, name) {
			this._id = _id;
			this.name = name;
		}
	}

	const [count, setCount] = useState(1);
	
	const createNode = () => {
		const node = new Node(count, `to-do-${count}`);
		const todo = document.querySelector('.current');
		const element = document.createElement('li');
		const content = document.createTextNode(`${node._id}. ${node.name}`);
		element.appendChild(content);
		todo.append(element);
		setCount(prev => prev + 1);
		console.log(node)
	}
	
	return (
		<>
			<button className="btn" onClick={() => createNode()}>Create To-Do-Node</button>
			<div className="board">

				<ul className="container current" style={{listStyle: "none"}}>
					<h2>Current Tasks</h2>
				</ul>
				
				<ul className="container hold" style={{listStyle: "none"}}>
					<h2>Tasks on Hold</h2>
				</ul>

				<ul className="container completed" style={{listStyle: "none"}}>
					<h2>Completed Tasks</h2>
				</ul>
				
			</div>
		</>
	);
}

export default App;
