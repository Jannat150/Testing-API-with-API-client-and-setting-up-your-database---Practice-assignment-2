const express = require('express');
const bodyParser = require('body-parser');
const bookdata = require('./data.json');

const app = express();
app.use(bodyParser.json());

app.get('/books', (req, res) => {
    try {
        res.status(200).json(bookdata);
    } catch (error) {
        res.json({ error });
    }
});

app.get('/books/:id', (req, res) => {
    let id = req.params.id;
    const book = bookdata.find(book => book.book_id === id);
    res.status(200).json(book);
});

app.post('/book', (req, res) => {
    let { book_id, title, author, genre, year, copies } = req.body;
    let book = { book_id, title, author, genre, year, copies };
    try {
        bookdata.push(book);
        res.status(200).json(book);
    } catch (error) {
        res.json({ error });
    }
});

app.put('/books/:id', (req, res) => {
    const { id } = req.params;
    const { title, author, genre, year, copies } = req.body;

    const bookIndex = bookdata.findIndex(book => book.book_id === id);
    if (bookIndex === -1) {
        return res.status(404).json({ error: 'Book not found!' });
    }

    if (title) bookdata[bookIndex].title = title;
    if (author) bookdata[bookIndex].author = author;
    if (genre) bookdata[bookIndex].genre = genre;
    if (year) bookdata[bookIndex].year = year;
    if (copies) bookdata[bookIndex].copies = copies;

    res.status(200).json(bookdata[bookIndex]);
});

app.delete('/books/:id', (req, res) => {
    const { id } = req.params;
    const bookIndex = bookdata.findIndex(book => book.book_id === id);

    if (bookIndex === -1) {
        return res.status(404).json({ error: 'Book not found!' });
    }

    bookdata.splice(bookIndex, 1);
    res.status(200).json({ message: 'Book deleted successfully!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
