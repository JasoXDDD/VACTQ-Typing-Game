const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const app = express();
const db = new sqlite3.Database('image_db.sqlite');

// Create a table to store image URLs if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS images (url TEXT)`);

app.use(express.static('public')); // Serve HTML and other files from a 'public' directory

app.use(express.json());

app.post('/saveImage', (req, res) => {
  const { imageUrl } = req.body;

  if (imageUrl) {
    db.run('INSERT INTO images (url) VALUES (?)', imageUrl, (err) => {
      if (err) {
        console.error(err.message);
        res.status(500).send('Error saving image URL');
      } else {
        res.status(200).send('Image URL saved');
      }
    });
  } else {
    res.status(400).send('Bad request');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
