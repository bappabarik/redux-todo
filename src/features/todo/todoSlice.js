import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    todos: JSON.parse(localStorage.getItem("todos")) || [
        { id: 1, text: "Hello World!", complete: false }
    ],
    currentTodo: null,
    todoFilter: "completed"

}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
    addTodo: (state, action) => {
        const todo = {
            id: nanoid(),
            text: action.payload,
            complete: false
        }
        state.todos.push(todo)
    },
    removeTodo: (state, action) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload)
    },

    setCurrentTodo: (state, action) => {
        return {
            ...state, 
            currentTodo: action.payload
        }
    },

    updateTodo: (state, action) => {
        return {
            ...state, todos: state.todos.map((todo) => todo.id === action.payload.id ? action.payload : todo), 
            currentTodo: null
        }
    },

    statusComplete: (state, action) => {
    
             state.todos.map((todo) => todo.id === action.payload.id ? (todo.complete = !action.payload.complete) : action.payload.complete)
        
    },

    setFilter: (state, action) => {
        state.todoFilter = action.payload
    }
}
})

export const {addTodo, removeTodo, updateTodo, setCurrentTodo, statusComplete, setFilter} = todoSlice.actions

export default todoSlice.reducer