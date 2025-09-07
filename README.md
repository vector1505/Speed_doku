# Speed_doku

A fast-paced modern twist to sudoku, where you must beat everyone else at their own game, while dealing with random chance

Note : This repository is one of the challenges made for the event "ForkThis" organized by the chapter Computer Society of India(CSI), VIT Vellore in the year 2025.

Full-stack web application built with the MERN stack (MongoDB, Express.js, React, Node.js).
This project is structured into two main parts:

client/ → React frontend

server/ → Node.js + Express backend with MongoDB

## 📂 Project Structure
```
MERN-Project/
│
├── client/               # React frontend
│   ├── src/              # React components, pages, utils
│   ├── public/           # Static assets
│   └── package.json
│
├── server/               # Node.js + Express backend
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API routes
│   ├── controllers/      # Route logic
│   ├── config/           # Database / env configs
│   └── package.json
│
├── README.md
└── .gitignore
```
## ⚙️ Installation

### Clone the repository:
```
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```
### Install dependencies
```
Backend (server)
cd server
npm install

Frontend (client)
cd ../client
npm install
```
## 🔑 Environment Variables

### Create a .env file inside the server/ folder:
```
DB_URI
```

(Add more variables as needed for your project)

## ▶️ Running the Project
### Run backend (server)
```
cd server
npm start
```
### Run frontend (client)
```
cd client
npm start
```
### Run both concurrently (optional)

If you configure concurrently or nodemon in the root package.json:
```
npm run dev
```

## 🤝 Contributing

Fork the project

Create your feature branch: git checkout -b feature/AmazingFeature

Commit your changes: git commit -m 'Add some AmazingFeature'

Push to the branch: git push origin feature/AmazingFeature

Open a Pull Request

### Happy Coding!!!
