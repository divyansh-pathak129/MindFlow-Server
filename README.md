# MindFlow - Production Server

MindFlow is a productivity-focused Chrome extension with a Pomodoro timer, task management, and habit tracking. This repository contains the backend API for MindFlow, supporting user authentication and syncing data.

## Installation

Clone the repository:
```bash
   git clone https://github.com/DivyanshPathak/mindflow-production-server.git
   cd mindflow-production-server
```
Install dependencies:
```bash
Copy code
npm install
Set up environment variables in .env:
```

env
Copy code
```
DB_URI=mongodb://localhost:27017/mindflow
JWT_SECRET=your_jwt_secret
```

Run the server
```bash
Copy code
npm start
```
Features
User authentication with JWT
Habit tracking and task management
Real-time updates with WebSockets
Deployment
Deploy on platforms like Vercel, AWS, or using Docker.

License
MIT License
