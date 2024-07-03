import {React, useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, removeTodo, setCurrentTodo, statusComplete } from '../features/todo/todoSlice';

const Todos = () => {
    const todos = useSelector(state => state.todos)
    const todoFilter = useSelector(state => state.todoFilter)
    const dispatch = useDispatch()

    const filteredTodos = todos.filter((todo) => {
      if(todoFilter === "Completed") return todo.complete
      if(todoFilter === "Pending") return !todo.complete
      return true
    })




    return (
        <>
        <div className="container">
          {filteredTodos.map((todo) => (
            <li className="todo"  key={todo.id}>
                <span className={todo.complete ? "completed" : ""} onClick={() => dispatch(statusComplete(todo))}>{todo.text}</span>
                <div className="">
                <button onClick={() => dispatch(setCurrentTodo(todo))}>Edit</button>
                {"  "}
                <button
                onClick={() => dispatch(removeTodo(todo.id))}
                >X</button>
                </div>
            </li>
          ) )}
        </div>
        </>
    );
}

export default Todos;
