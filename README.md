# Lab 2: SQLite Database and CRUD Routes

## Student Details

* **Name:** Vikas Elle
* **Registration Number:** 252U1R5042
* **Section:** 106 AIDE-2A
* **Course:** Backend Development Fundamentals
* **Year:** II
* **Term:** II

---

## Live Deployment

**Render Deployment URL:**
https://vikas-elle-lab-2.onrender.com/

**API Endpoint:**
https://vikas-elle-lab-2.onrender.com/books/

---

## 1. Objective

To connect an Express.js server to an SQLite database and implement CRUD (Create, Read, Update, Delete) operations through HTTP API endpoints.

The application manages book records stored in an SQLite database and allows users to retrieve, add, update, and delete book information using REST API requests.

## 2. Technologies Used

* **Node.js** – JavaScript runtime environment.
* **Express.js** – Backend web framework for creating REST API routes.
* **SQLite** – Lightweight relational database.
* **sqlite3** – SQLite database driver for Node.js.
* **sqlite** – Promise-based SQLite interface.
* **Nodemon** – Automatically restarts the server when code changes.
* **Postman** – API testing tool.
* **Git and GitHub** – Version control and source code management.
* **Render** – Cloud deployment platform.

## 3. Database Design

**Database Name:** `books.db`

**Table Name:** `book`

The book table contains the following columns:

| Column | Data Type           | Description                    |
| ------ | ------------------- | ------------------------------ |
| id     | INTEGER PRIMARY KEY | Unique identifier of each book |
| title  | TEXT                | Title of the book              |
| author | TEXT                | Name of the author             |
| price  | INTEGER             | Price of the book              |
| pages  | INTEGER             | Number of pages                |

Initially, 10 book records were inserted into the database using the SQLite command-line interface.

## 4. Project Structure

```text
Lab-Report-2/
│
├── screenshots/
│   ├── get-all-books.png
│   ├── get-book-by-id.png
│   ├── post-book.png
│   ├── put-book.png
│   └── delete-book.png
│
├── books.db
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```
### Database 

The following screenshot shows the `book` table in the SQLite database, containing 10 book records with their respective IDs, titles, authors, prices, and page counts.

<img width="992" height="470" alt="database-schema" src="https://github.com/user-attachments/assets/03503a3e-fd50-4b8b-b45f-62bd0e499389" />


## 5. Installation and Execution

### Prerequisites

* Node.js installed.
* nodeomn
* npm (Node Package Manager).
* SQLite database tools.
* sqlite, sqlite3
* Postman for API testing.

### Step 1: Clone the Repository

```bash
git clone https://github.com/vikas01-design/Vikas-Elle-Lab-2.git
```

### Step 2: Navigate to the Project Directory

```bash
cd Vikas-Elle-Lab-2
```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Start the Development Server

```bash
npm run dev
```

The server starts at:

```text
http://localhost:3000/
```

### Step 5: Production Execution

```bash
npm start
```

### Environment Variables

| Variable | Description                   | Default     |
| -------- | ----------------------------- | ----------- |
| PORT     | Port on which the server runs | 3000        |
| NODE_ENV | Application environment       | Development |

No environment variable values or credentials are committed to the repository.

## 6. API Endpoints

The application implements five CRUD endpoints.

### 6.1 GET – Retrieve All Books

* **Method:** GET
* **Endpoint:** `/books/`
* **Description:** Retrieves all book records stored in the database.
* **Success Status:** 200 OK

**Request URL:**

```text
GET /books/
```

**Screenshot:**
<img width="1917" height="1020" alt="get-all-books" src="https://github.com/user-attachments/assets/8d12d363-ee4c-424b-a3dd-1ba525958958" />


### 6.2 GET – Retrieve a Book by ID

* **Method:** GET
* **Endpoint:** `/books/:bookId/`
* **Description:** Retrieves a particular book using its unique ID.
* **Success Status:** 200 OK
* **Error Status:** 404 Not Found

**Request URL:**

```text
GET /books/2/
```

**Screenshot:**
<img width="1917" height="1017" alt="get-book-by-id" src="https://github.com/user-attachments/assets/9c7eb804-e579-4011-a273-d547a7b4f8eb" />


### 6.3 POST – Add a New Book

* **Method:** POST
* **Endpoint:** `/books/`
* **Description:** Adds a new book record to the SQLite database.
* **Success Status:** 201 Created

**Sample Request Body:**

```json
{
  "title": "The Pragmatic Programmer",
  "author": "Andrew Hunt",
  "price": 500,
  "pages": 352
}
```

**Screenshot:**
<img width="1917" height="1021" alt="post-book" src="https://github.com/user-attachments/assets/b7c1eb75-fec4-49be-aed5-fc0cb4610459" />


### 6.4 PUT – Update an Existing Book

* **Method:** PUT
* **Endpoint:** `/books/:bookId/`
* **Description:** Updates the details of an existing book using its ID.
* **Success Status:** 200 OK
* **Error Status:** 404 Not Found

**Sample Request Body:**

```json
{
  "title": "The Pragmatic Programmer - Updated",
  "author": "Andrew Hunt",
  "price": 550,
  "pages": 400
}
```

**Screenshot:**
<img width="1917" height="1020" alt="put-book" src="https://github.com/user-attachments/assets/95c106d3-faee-4c84-8324-78632904dd5f" />


### 6.5 DELETE – Remove a Book

* **Method:** DELETE
* **Endpoint:** `/books/:bookId/`
* **Description:** Deletes a particular book record using its ID.
* **Success Status:** 200 OK
* **Error Status:** 404 Not Found

**Request URL:**

```text
DELETE /books/11/
```

**Screenshot:**
<img width="1917" height="1015" alt="delete-book" src="https://github.com/user-attachments/assets/7992a64a-2c3a-47a7-ad84-c6dd0ec03db1" />


## 7. SQL Operations and Security

The application uses SQL queries to perform database operations.

The following SQL operations are implemented:

* `SELECT` – Retrieve book records.
* `INSERT` – Add new book records.
* `UPDATE` – Modify existing book records.
* `DELETE` – Remove book records.

Parameterized queries using `?` placeholders are used when passing user input into SQL statements.

This helps prevent SQL injection attacks and improves query safety.

## 8. Problems Faced and Solutions

During development and deployment, the following issues were encountered and resolved:

**1. Database Column Name Error**

* **Problem:** SQLite returned an error because of an incorrect column reference (`book_id`).
* **Solution:** Checked the database table structure and corrected the queries to use the actual primary key column, `id`.

**2. Server Initialization Error**

* **Problem:** The server error handler referenced an undefined `server` variable.
* **Solution:** Stored the result of `app.listen()` in a server variable before attaching the error handler.

**3. Render SQLite Compatibility Issue**

* **Problem:** The deployed application encountered a GLIBC compatibility error with the SQLite native module.
* **Solution:** Configured the SQLite module to build from source during deployment.

**4. Database File Access Error**

* **Problem:** SQLite could not open the configured database file on Render.
* **Solution:** Updated the database path to use the project directory's `books.db` file for the current deployment configuration.

## 9. Testing and Verification

All five API endpoints were tested using Postman.

The following operations were successfully verified:

* Retrieving all books.
* Retrieving an individual book by ID.
* Adding a new book.
* Updating an existing book.
* Deleting a book.

The API was tested locally and after deployment on Render.

## 10. Conclusion

This lab provided practical experience in integrating an SQLite database with an Express.js backend application.

By implementing the five CRUD endpoints, I learned how to perform database operations through REST APIs, use asynchronous database connections, handle HTTP status codes, and execute parameterized SQL queries.

I also gained experience testing APIs using Postman, managing project code with Git and GitHub, and deploying a Node.js backend application using Render.

---

**Developed by:** Vikas Elle
**Course:** Backend Development Fundamentals
**Lab:** 02 – SQLite Database and CRUD Routes
