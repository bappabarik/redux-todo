import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, setFilter, updateTodo } from '../features/todo/todoSlice';

const AddTodo = () => {
    const [text, setText] = useState("");
    const dispatch = useDispatch()
    const currentTodo = useSelector(state => state.currentTodo)
    const todos = useSelector(state => state.todos)

    useEffect(() => {
        if(currentTodo){
            setText(currentTodo.text)
        } else {
            setText("")
        }
    }, [currentTodo]);

    const addTodoHandler = (e) => {
        e.preventDefault()
        if(!text) return
        if(currentTodo){
            dispatch(updateTodo({...currentTodo, text}))
        } else{
        dispatch(addTodo(text))
        }
        setText('')
    }

    useEffect(() => {
       localStorage.setItem("todos", JSON.stringify(todos))
    }, [addTodoHandler]);

    return (
        <div className='input-wrapper'>
            <form
            onSubmit={addTodoHandler}
            >
                <input 
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                />
                {"  "}
                <button type='submit'>{currentTodo ? "Update" : "Add"}</button>
            </form>
            <select name="Filter" id="" onChange={(e) => dispatch(setFilter(e.target.value))}>
                <option value="Filter" defaultValue="Filter" >Filter</option>
                <option value="All">All</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
            </select>

        </div>
    );
}

export default AddTodo;
