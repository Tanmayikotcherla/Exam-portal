const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Question = require("./models/Question");

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB Connected for Seeding"))
.catch(err => console.error(err));

const seedQuestions = async () => {
    await Question.deleteMany({}); // Clear old data

    const sampleQuestions = [
        // ===== STACK 1: MERN (React.js, Node.js, Express, MongoDB) =====
        { stack: "MERN", question: "What is JSX in React?", options: ["Java Syntax Extension", "JavaScript XML", "Java Server Extension", "JavaScript Extension"], correctAnswer: "JavaScript XML" },
        { stack: "MERN", question: "Which hook is used for state in React?", options: ["useState", "useEffect", "useRef", "useMemo"], correctAnswer: "useState" },
        { stack: "MERN", question: "Which MongoDB command is used to find data?", options: ["find()", "search()", "lookup()", "query()"], correctAnswer: "find()" },
        { stack: "MERN", question: "Which HTTP method is used to create data in REST API?", options: ["GET", "POST", "PUT", "DELETE"], correctAnswer: "POST" },
        { stack: "MERN", question: "Which Node.js module is used to handle HTTP requests?", options: ["http", "fs", "url", "path"], correctAnswer: "http" },
        { stack: "MERN", question: "Express.js is used for?", options: ["Database Management", "Backend Routing", "Frontend Design", "Version Control"], correctAnswer: "Backend Routing" },
        { stack: "MERN", question: "Which React hook runs code after rendering?", options: ["useState", "useEffect", "useCallback", "useReducer"], correctAnswer: "useEffect" },
        { stack: "MERN", question: "Which MongoDB type stores JSON-like documents?", options: ["BSON", "JSON", "XML", "CSV"], correctAnswer: "BSON" },
        { stack: "MERN", question: "Which method updates a document in MongoDB?", options: ["updateOne()", "findOne()", "replace()", "set()"], correctAnswer: "updateOne()" },
        { stack: "MERN", question: "React is primarily used for?", options: ["Backend", "Frontend", "Database", "Mobile OS"], correctAnswer: "Frontend" },
        { stack: "MERN", question: "Which method is used in MongoDB to delete a document?", options: ["deleteOne()", "remove()", "destroy()", "drop()"], correctAnswer: "deleteOne()" },
        { stack: "MERN", question: "Which Node.js function is asynchronous?", options: ["fs.readFile", "fs.existsSync", "path.join", "os.type"], correctAnswer: "fs.readFile" },
        { stack: "MERN", question: "What is the default port for MongoDB?", options: ["27017", "8080", "3000", "5000"], correctAnswer: "27017" },
        { stack: "MERN", question: "Which lifecycle method is replaced by useEffect in React?", options: ["componentDidMount", "componentWillUnmount", "render", "shouldComponentUpdate"], correctAnswer: "componentDidMount" },
        { stack: "MERN", question: "Which command installs a package in Node.js?", options: ["npm install", "npm add", "node get", "install"], correctAnswer: "npm install" },
        { stack: "MERN", question: "MongoDB stores data in?", options: ["Tables", "Collections", "Rows", "Schemas"], correctAnswer: "Collections" },
        { stack: "MERN", question: "Which method sends data from frontend to backend?", options: ["POST", "GET", "DELETE", "PUT"], correctAnswer: "POST" },
        { stack: "MERN", question: "Which React feature improves performance?", options: ["Memoization", "Global Variables", "useLogs", "LocalStorage"], correctAnswer: "Memoization" },
        { stack: "MERN", question: "Which Express middleware parses JSON?", options: ["express.json()", "express.urlencoded()", "body.json()", "url.parse()"], correctAnswer: "express.json()" },
        { stack: "MERN", question: "Which command starts a React project?", options: ["npx create-react-app", "npm react-init", "node start", "npm react-create"], correctAnswer: "npx create-react-app" },

        // ===== STACK 2: React + Python (FastAPI / Django / Flask) + PostgreSQL/MySQL =====
        { stack: "PYTHON", question: "Which Python framework is lightweight?", options: ["Django", "Flask", "FastAPI", "Spring Boot"], correctAnswer: "Flask" },
        { stack: "PYTHON", question: "PostgreSQL is a?", options: ["NoSQL", "Relational DB", "Graph DB", "Document DB"], correctAnswer: "Relational DB" },
        { stack: "PYTHON", question: "Which Python framework is asynchronous?", options: ["Flask", "Django", "FastAPI", "Bottle"], correctAnswer: "FastAPI" },
        { stack: "PYTHON", question: "Which ORM is used with Django?", options: ["SQLAlchemy", "Django ORM", "Mongoose", "Sequelize"], correctAnswer: "Django ORM" },
        { stack: "PYTHON", question: "MySQL stores data in?", options: ["Tables", "Collections", "JSON Files", "XML"], correctAnswer: "Tables" },
        { stack: "PYTHON", question: "Which Python command creates a virtual environment?", options: ["python -m venv env", "pip install env", "python create env", "venv create"], correctAnswer: "python -m venv env" },
        { stack: "PYTHON", question: "Which method sends data via HTTP?", options: ["POST", "GET", "DELETE", "HEAD"], correctAnswer: "POST" },
        { stack: "PYTHON", question: "Which command installs Django?", options: ["pip install django", "pip django", "python install django", "install django"], correctAnswer: "pip install django" },
        { stack: "PYTHON", question: "Which is faster for APIs?", options: ["Flask", "FastAPI", "Django", "Pyramid"], correctAnswer: "FastAPI" },
        { stack: "PYTHON", question: "Which SQL command removes a table?", options: ["DELETE", "DROP", "REMOVE", "CLEAR"], correctAnswer: "DROP" },
        { stack: "PYTHON", question: "Which database engine works with PostgreSQL in Django?", options: ["django.db.backends.postgresql", "django.db.backends.mysql", "django.db.backends.sqlite3", "postgres.engine"], correctAnswer: "django.db.backends.postgresql" },
        { stack: "PYTHON", question: "Which library connects Python to MySQL?", options: ["mysql-connector-python", "psycopg2", "sqlite3", "sqlalchemy"], correctAnswer: "mysql-connector-python" },
        { stack: "PYTHON", question: "Which Python keyword defines a function?", options: ["func", "define", "def", "function"], correctAnswer: "def" },
        { stack: "PYTHON", question: "Which is the default port for FastAPI?", options: ["8000", "8080", "5000", "3000"], correctAnswer: "8000" },
        { stack: "PYTHON", question: "Which MySQL command changes data?", options: ["UPDATE", "ALTER", "MODIFY", "SET"], correctAnswer: "UPDATE" },
        { stack: "PYTHON", question: "Which Python package is used for data analysis?", options: ["numpy", "pandas", "matplotlib", "all of the above"], correctAnswer: "all of the above" },
        { stack: "PYTHON", question: "Which HTTP method is used to delete a resource?", options: ["DELETE", "REMOVE", "DROP", "DESTROY"], correctAnswer: "DELETE" },
        { stack: "PYTHON", question: "Which Django command starts a new app?", options: ["python manage.py startapp", "django start app", "startapp", "python start"], correctAnswer: "python manage.py startapp" },
        { stack: "PYTHON", question: "Which PostgreSQL command lists databases?", options: ["\\l", "\\d", "show dbs", "list databases"], correctAnswer: "\\l" },
        { stack: "PYTHON", question: "Which Python library sends HTTP requests?", options: ["requests", "fetch", "axios", "http"], correctAnswer: "requests" },
    ];

    await Question.insertMany(sampleQuestions);
    console.log("✅ 20 questions inserted per stack");
    mongoose.connection.close();
};

seedQuestions();
