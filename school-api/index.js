const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sql = require('mssql');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const dbConfig = {
  server: 'LAPTOP-5PMRBLQK\\SQLEXPRESS01', // SQL Server instance
  database: 'SchoolDB', // Database name
  port: 1433, // Explicitly specify port 1433
  options: {
    encrypt: true, // Required for Azure; optional for local
    trustServerCertificate: true, // For self-signed certificates in local dev
  },
  authentication: {
    type: 'ntlm', // Use NTLM for Windows Authentication
    options: {
      userName: 'shrey', // Your Windows username
      password: '', // No password for local Windows Auth
      domain: 'LAPTOP-5PMRBLQK', // Your machine's name
    },
  },
};


// Connect to Database
sql.connect(dbConfig)
  .then(() => console.log('Connected to the database'))
  .catch((err) => {
    console.error('Database connection failed:', err);
    process.exit(1); // Exit if connection fails
  });

// Basic API Routes

// Get all students
app.get('/api/students', async (req, res) => {
  try {
    const result = await sql.query('SELECT * FROM Students');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send('Error fetching students: ' + err.message);
  }
});

// Get all classes
app.get('/api/classes', async (req, res) => {
  try {
    const result = await sql.query('SELECT * FROM Classes');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send('Error fetching classes: ' + err.message);
  }
});

// Get students in a specific class
app.get('/api/classes/:classId/students', async (req, res) => {
  const { classId } = req.params;
  try {
    const result = await sql.query(`
      SELECT s.StudentID, s.FirstName, s.LastName
      FROM Students s
      JOIN StudentClasses sc ON s.StudentID = sc.StudentID
      WHERE sc.ClassID = ${classId}
    `);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send('Error fetching students for the class: ' + err.message);
  }
});

// Get test scores for a specific student
app.get('/api/students/:studentId/tests', async (req, res) => {
  const { studentId } = req.params;
  try {
    const result = await sql.query(`
      SELECT * FROM TestScores WHERE StudentID = ${studentId}
    `);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send('Error fetching test scores: ' + err.message);
  }
});

// Get exam scores for a specific student
app.get('/api/students/:studentId/exams', async (req, res) => {
  const { studentId } = req.params;
  try {
    const result = await sql.query(`
      SELECT * FROM ExamScores WHERE StudentID = ${studentId}
    `);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send('Error fetching exam scores: ' + err.message);
  }
});

// Get attendance for a specific student
app.get('/api/students/:studentId/attendance', async (req, res) => {
  const { studentId } = req.params;
  try {
    const result = await sql.query(`
      SELECT * FROM Attendance WHERE StudentID = ${studentId}
    `);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send('Error fetching attendance: ' + err.message);
  }
});

// Get average scores for a class
app.get('/api/classes/:classId/average-scores', async (req, res) => {
  const { classId } = req.params;
  try {
    const result = await sql.query(`
      SELECT 
        AVG(t.Score) AS AverageTestScore, 
        AVG(e.Score) AS AverageExamScore
      FROM TestScores t
      JOIN ExamScores e ON t.ClassID = e.ClassID
      WHERE t.ClassID = ${classId}
    `);
    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).send('Error fetching average scores: ' + err.message);
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
