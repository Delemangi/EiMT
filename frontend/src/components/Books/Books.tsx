import { useEffect, useState } from "react";
import Book from "../Book/Book";
import "./Books.css";
import { getBooks } from "../../api";

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
