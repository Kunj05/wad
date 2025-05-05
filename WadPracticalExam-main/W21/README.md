# Environment Variables Setup

1. Create a `.env` file in the root directory.
2. Add the following variables to the `.env` file:

MONGO_URI=<Your MongoDB connection string>  
PORT=<Port number for the server>

# Example:
MONGO_URI=mongodb://127.0.0.1:27017/bookstore  
PORT=3000

# How to Run the Application

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   npm start
   ```

3. The server will run at `http://localhost:<PORT>` (default: `http://localhost:3000`).

# Testing Information

- Use Postman to test the following endpoints:

  1. **Add a new book**  
     - **Endpoint:** `POST /api/books`  
     - **Body (JSON):**
       ```json
       {
         "title": "Book Title",
         "author": "Author Name",
         "price": 19.99,
         "genre": "Fiction"
       }
       ```
     - **CURL:**
       ```bash
       curl -X POST http://localhost:3000/api/books \
         -H "Content-Type: application/json" \
         -d '{"title":"Book Title","author":"Author Name","price":19.99,"genre":"Fiction"}'
       ```

  2. **Retrieve all books**  
     - **Endpoint:** `GET /api/books`
     - **CURL:**
       ```bash
       curl -X GET http://localhost:3000/api/books
       ```

  3. **Update a book by ID**  
     - **Endpoint:** `PUT /api/books/:id`  
     - **Body (JSON):**
       ```json
       {
         "title": "Updated Title",
         "price": 24.99
       }
       ```
     - **CURL:**
       ```bash
       curl -X PUT http://localhost:3000/api/books/[BOOK_ID] \
         -H "Content-Type: application/json" \
         -d '{"title":"Updated Title","price":24.99}'
       ```

  4. **Delete a book by ID**  
     - **Endpoint:** `DELETE /api/books/:id`
     - **CURL:**
       ```bash
       curl -X DELETE http://localhost:3000/api/books/[BOOK_ID]
       ```

- Replace `:id` or `[BOOK_ID]` with the actual book ID when testing `PUT` and `DELETE` endpoints.


