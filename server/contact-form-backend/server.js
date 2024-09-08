const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const data = `Name: ${name}\nEmail: ${email}\nMessage: ${message}\n\n`;
  const filePath = path.join(__dirname, 'contacts.txt');

  fs.appendFile(filePath, data, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.status(200).json({ message: 'Form submitted successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
