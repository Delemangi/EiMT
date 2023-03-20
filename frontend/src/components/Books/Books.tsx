import "./Books.css";

import { useEffect, useState } from "react";

import { getBooks, getBooksByPage } from "../../api";
import Book from "../Book/Book";

export default function Books() {
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);

  useEffect(() => {
    getBooksByPage(page).then((books) => {
      if (books.length !== 0) {
        setBooks(books);
      }
    });
  }, [page]);

  useEffect(() => {
    getBooks().then((books) => {
      if (books.length !== 0) {
        setPages(Math.ceil(books.length / 5));
      }
    });
  }, []);

  function handlePrevious() {
    if (page > 0) {
      setPage(page - 1);
    }
  }

  function handleNext() {
    if (page < pages - 1) {
      setPage(page + 1);
    }
  }

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
      <button type="button" onClick={handlePrevious}>
        ⬅️
      </button>
      <span className="page-number">
        {page + 1} / {pages}
      </span>
      <button type="button" onClick={handleNext}>
        ➡️
      </button>
    </div>
  );
}
