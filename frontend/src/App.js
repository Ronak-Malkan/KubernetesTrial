import './App.css';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import { useState, useEffect } from 'react';
function App() {
  const [showForm, setShowForm] = useState(false);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
        try {
            const response = await fetch('http://backend-service:8000/todos');
            const data = await response.json();
            setTodos(data);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };
    fetchTodos();
}, []);

  const handleAddTodo = () => {
    setShowForm(true);
  };

  return (
    <div className="container">
      {showForm && <TodoForm setShowForm={setShowForm} setTodos={setTodos}/>}
      <TodoList todos={todos} setTodos={setTodos} />
      <button className='add-todo-button' onClick={handleAddTodo}>Add Todo</button>
    </div>
  );
}

export default App;
