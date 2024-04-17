//npm init -y
//npm install express pm2
//node ./node_modules/pm2/bin/pm2 start app.js
//curl -X POST http://localhost:3000/process-text -H "Content-Type: application/json" -d "{\"text\":\"hello world\"}"
//node ./node_modules/pm2/bin/pm2 delete app.js

const express = require('express');
const { spawn } = require('child_process');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/process-text', (req, res) => {
    const { text } = req.body;
    
    const pythonProcess = spawn('python', ['Sever_python_code.py']);
    let pythonData = "";

    pythonProcess.stdin.write(text + "\n");
    pythonProcess.stdin.end();

    pythonProcess.stdout.on('data', (data) => {
        pythonData += data.toString();
    });

    pythonProcess.on('close', (code) => {
        res.send(`${pythonData}`);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});