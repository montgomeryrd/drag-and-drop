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
		const classNameCurrent = document.querySelector('.current');

		const li = document.createElement('li');
		li.id = String(node._id);
		li.className = "task";
		li.draggable = "true";
		// li.ondragstart = drag(event);
		li.innerHTML = node.name;
		
		classNameCurrent.appendChild(li);
		setCount(prev => prev + 1);
	};
	
	const drag = event => {
		event.dataTransfer.setData('text/html', event.currentTarget.outerHTML);
		event.dataTransfer.setData('text/plain', event.currentTarget.dataset.id);
	}

	const dragStart = event => {
		event.currentTarget.classList.add('dragging');
	};

	const dragEnd = event => {
		event.currentTarget.classList.remove('dragging');
	};

	document.querySelectorAll('.task').forEach(task => {
		task.addEventListener('dragstart', dragStart);
		task.addEventListener('dragend', dragEnd);
	});

	const dragEnter = event => {
		event.currentTarget.classList.add('drop');
	};

	const dragLeave = event => {
		event.currentTarget.classList.remove('drop');
	};

	document.querySelectorAll('.container').forEach(container => {
		container.addEventListener('dragenter', dragEnter);
		container.addEventListener('dragleave', dragLeave);
	});

	const drop = event => {
		document.querySelectorAll('.container').forEach(container => container.classList.remove('drop'));
		document.querySelector(`id="${event.dataTransfer.getData('text/plain')}"`).remove();
	
		event.currentTarget.innerHTML = event.currentTarget.innerHTML + event.dataTransfer.getData('text/html');
	};
	
	const allowDrop = event => {
		// event.preventDefault();
	};

	return (
		<>
			<button className="btn" onClick={() => createNode()}>Create To-Do-Node</button>
			<div className="board" onDrop={() => drop()} onDragOver={() => allowDrop()}>

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
