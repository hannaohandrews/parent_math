import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from "uuid";

const LOCAL_STORAGE_KEY = "todoApp.todos";

function App() {
	const [todos, setTodos] = useState([]);
	const todoNameRef = useRef();

	useEffect(() => {
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
	}, [todos]);

	const handleAddTodo = (e) => {
		const name = todoNameRef.current.value;
		if (name === "") return;
		setTodos((prevTodos) => {
			return [...prevTodos, { id: uuidv4(), name: name, complete: false }];
		});
		todoNameRef.current.value = null;
	};

	return (
		<>
			<div className="App">
				<TodoList todos={todos} />
				<input ref={todoNameRef} type="text"></input>
				<button onClick={handleAddTodo}> Add Todo</button>
				<button> Clear Completed Todos</button>
				<div>0 left to do </div>
			</div>
		</>
	);
}

export default App;
