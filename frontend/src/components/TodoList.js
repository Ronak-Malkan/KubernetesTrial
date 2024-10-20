import React, { useEffect, useState } from 'react';
import './TodoList.css';

const TodoList = ({todos, setTodos}) => {
    console.log('Todos:');
    console.log(todos);


    const handleRemoveTodo = async (id) => {
        try {
            await fetch(`http://backend-service:8000/todos/${id}`, {
                method: 'DELETE',
            });
            setTodos(todos.filter(todo => todo.id !== id));
        } catch (error) {
            console.error('Error removing todo:', error);
        }
    };

    const handleCheckboxChange = async (id) => {
        try {
            await fetch(`http://backend-service:8000/todos/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ completed: true }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setTodos(todos.map(todo => {
                if (todo.id === id) {
                    return { ...todo, completed: true };
                }
                return todo;
            }));
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    return (
        <div>
            <h1>Todo List</h1>
            <ul className='todo-list'>
                {todos.map((todo) => (
                    <li className='todo-item' key={todo.id}>
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => handleCheckboxChange(todo.id)}
                        />
                        <span>{todo.title}</span>
                        <button onClick={() => handleRemoveTodo(todo.id)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;