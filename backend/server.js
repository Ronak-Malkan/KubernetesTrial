const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const app = express();
const port = 8000;


const corsOptions = {
    origin: 'http://localhost:3000', // Adjust this to match the domain of your React app
    optionsSuccessStatus: 200,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true  // This is important for sessions or basic auth
};

// Enable CORS
app.use(cors(corsOptions));


app.use(express.json());

// PostgreSQL connection pool setup
const pool = new Pool({
    user: 'admin',
    host: 'localhost',  // Change to your PostgreSQL service name in Kubernetes
    database: 'todoapp',
    password: 'password',  // Use environment variables in production
    port: 5432,
});

// GET all todos
app.get('/todos', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM todos');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST a new todo
app.post('/todos', async (req, res) => {
    const { title, completed } = req.body;
    try {
        const { rows } = await pool.query('INSERT INTO todos (title, completed) VALUES ($1, $2) RETURNING id', [title, completed]);
        res.json({ id: rows[0].id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// PUT update a todo by ID
app.put('/todos/:id', async (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;
    try {
        const result = await pool.query('UPDATE todos SET title = $1, completed = $2 WHERE id = $3 RETURNING id', [title, completed, id]);
        if (result.rowCount === 0) {
            res.status(404).json({ error: 'Todo not found' });
        } else {
            res.json({ message: 'Todo updated successfully' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// DELETE a todo by ID
app.delete('/todos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM todos WHERE id = $1', [id]);
        if (result.rowCount === 0) {
            res.status(404).json({ error: 'Todo not found' });
        } else {
            res.json({ message: 'Todo deleted successfully' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = server;