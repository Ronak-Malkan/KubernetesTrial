# Todo Application

## Overview

This Todo application is a simple, full-stack web application designed for managing daily tasks. The frontend is built using React.js, and the backend is powered by Node.js with PostgreSQL as the database. The application allows users to create, read, update, and delete todos.

## Features

- **Create Todo**: Add new tasks to your todo list.
- **Read Todo**: View all tasks in your list.
- **Update Todo**: Mark tasks as completed or edit the task details.
- **Delete Todo**: Remove tasks from the list.

## Prerequisites

Ensure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/) (v14.x or newer)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Docker](https://www.docker.com/)
- [Kubernetes with Kind](https://kind.sigs.k8s.io/) (for deploying using Kubernetes locally)
- [Git](https://git-scm.com/) (for cloning the repository)

## Installation

### 1. Clone the Repository

Start by cloning the repository:

```bash
git clone https://github.com/yourusername/todo-app.git
cd todo-app

```

### 2. Create Docker Images

Create Frontend and Backend images for docker by running:

```bash
docker build -t todo-backend ./../backend
docker build -t todo-frontend ./../frontend
```

### 3. Run the setup-kind.sh script file

Run the script command by moving into the scripts folder and executing the following command:

```bash
./setup-kind.sh
```
