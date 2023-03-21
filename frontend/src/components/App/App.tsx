import { Suspense, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import { getAuthors, getBooks, getCategories } from "../../api";
import Authors from "../Authors/Authors";
import BookDelete from "../BookDelete/BookDelete";
import BookForm from "../BookForm/BookForm";
import BookMark from "../BookMark.tsx/BookMark";
import Books from "../Books/Books";
import Categories from "../Categories/Categories";
import Header from "../Header/Header";

export default function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);

  useEffect(() => {
    getBooks().then((books) => setBooks(books));
  }, []);

  useEffect(() => {
    getCategories().then((categories) => setCategories(categories));
  }, []);

  useEffect(() => {
    getAuthors().then((authors) => setAuthors(authors));
  }, []);

  function deleteBook(id: number) {
    setBooks(books.filter((book) => book.id !== id));
  }

  function editBook(book: Book) {
    setBooks(books.map((b) => (b.id === book.id ? book : b)));
  }

  return (
    <>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <div className="container">
          <Routes>
            <Route path="/" element={<Books />} />
            <Route path="/books" element={<Books />} />
            <Route
              path="/categories"
              element={<Categories categories={categories} />}
            />
            <Route path="/authors" element={<Authors authors={authors} />} />
            <Route
              path="/books/add"
              element={
                <BookForm
                  categories={categories}
                  authors={authors}
                  editBookFn={editBook}
                />
              }
            />
            <Route
              path="/books/edit/:book"
              element={
                <BookForm
                  categories={categories}
                  authors={authors}
                  editBookFn={editBook}
                />
              }
            />
            <Route
              path="/books/delete/:book"
              element={<BookDelete updateState={deleteBook} />}
            />
            <Route path="/books/mark/:book" element={<BookMark />} />
          </Routes>
        </div>
      </Suspense>
    </>
  );
}
