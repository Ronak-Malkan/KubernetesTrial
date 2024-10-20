import React, { useState } from 'react';
import './TodoForm.css';

const TodoForm = ({setShowForm, setTodos}) => {
    const [todo, setTodo] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        let bodyData = { title: todo, completed: false };
        try {
            let response = await fetch('http://backend-service:8000/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify( bodyData ),
            });
            if (response.ok) {
                // Todo added successfully
                response = await response.json();
                setTodos((prevTodos) => [
                    ...prevTodos,
                    { id: response.id, title: todo, completed: false },
                ]);
                setShowForm(false);
            } else {
                // Error occurred while adding todo
                console.error('Failed to add todo');
            }
        } catch (error) {
            console.error('Failed to add todo', error);
        }
    };

    const handleClose = () => {
        // Code to close the TodoForm pop up
        setShowForm(false);
    };

    return (
        <form className='TodoForm'>
            <input
                type="text"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                placeholder="Enter todo"
            />
            <div>
                <button onClick={handleSubmit} type="submit">Add</button>
                <button onClick={handleClose}>Close</button>
            </div>
        </form>
    );
};

export default TodoForm;