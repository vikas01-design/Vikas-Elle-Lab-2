const express = require('express')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const path = require('path')

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 3000
const dbPath = path.join(__dirname, 'books.db')
let db = null

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })

    const server = app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}/`)
    })

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Please stop any process running on this port.`)
      } else {
        console.error(`Server error: ${err.message}`)
      }
      process.exit(1)
    })
  } catch (e) {
    console.error(`DB Error: ${e.message}`)
    process.exit(1)
  }
}

initializeDBAndServer()

// GET / - Root welcome route
app.get('/', (request, response) => {
  response.status(200).send('Books API Server is running. Visit /books to view all books.')
})

// GET /books/ - Get all books
app.get('/books/', async (request, response) => {
  try {
    const getBooksQuery = `
      SELECT * FROM book
      ORDER BY id;
    `
    const books = await db.all(getBooksQuery)
    response.status(200).json(books)
  } catch (error) {
    console.error(`Error fetching books: ${error.message}`)
    response.status(500).json({error: 'Failed to retrieve books'})
  }
})

// GET /books/:bookId/ - Get single book by ID
app.get('/books/:bookId/', async (request, response) => {
  try {
    const {bookId} = request.params
    const getBookQuery = `
      SELECT * FROM book
      WHERE id = ?;
    `
    const book = await db.get(getBookQuery, [bookId])
    if (!book) {
      response.status(404).json({error: 'Book not found'})
    } else {
      response.status(200).json(book)
    }
  } catch (error) {
    console.error(`Error fetching book: ${error.message}`)
    response.status(500).json({error: 'Failed to retrieve book'})
  }
})

// POST - Add a new book
app.post('/books/', async (request, response) => {
  try {
    const {title, author, price, pages} = request.body

    const addBookQuery = `
      INSERT INTO book (title, author, price, pages)
      VALUES (?, ?, ?, ?);
    `

    const dbResponse = await db.run(addBookQuery, [
      title,
      author,
      price,
      pages,
    ])

    response.status(201).json({
      message: 'Book added successfully',
      bookId: dbResponse.lastID,
    })
  } catch (error) {
    console.error(`Error adding book: ${error.message}`)
    response.status(500).json({error: 'Failed to add book'})
  }
})

// PUT - Update a book
app.put("/books/:bookId/", async (request, response) => {
  const { bookId } = request.params;
  const { title, author, price, pages } = request.body;

  const updateBookQuery = `
    UPDATE book
    SET title = ?, author = ?, price = ?, pages = ?
    WHERE id = ?;
  `;

  const dbResponse = await db.run(updateBookQuery, [
    title,
    author,
    price,
    pages,
    bookId,
  ]);

  if (dbResponse.changes === 0) {
    response.status(404);
    response.send("Book not found");
  } else {
    response.status(200);
    response.send("Book updated successfully");
  }
});

// DELETE - Delete a book
app.delete("/books/:bookId/", async (request, response) => {
  const { bookId } = request.params;

  const deleteBookQuery = `
    DELETE FROM book
    WHERE id = ?;
  `;

  const dbResponse = await db.run(deleteBookQuery, [bookId]);

  if (dbResponse.changes === 0) {
    response.status(404);
    response.send("Book not found");
  } else {
    response.status(200);
    response.send("Book deleted successfully");
  }
});

module.exports = app
