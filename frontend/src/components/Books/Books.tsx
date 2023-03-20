import "./Books.css";

import { useEffect, useState } from "react";

import { getBooks } from "../../api";
import Book from "../Book/Book";

export default function Books() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    getBooks().then((books) => setBooks(books));
  }, []);

  return (
    <div className="books">
      <h1>Books</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <Book book={book} />
          </li>
        ))}
      </ul>
    </div>
  );
}
