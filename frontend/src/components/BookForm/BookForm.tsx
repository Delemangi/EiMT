import "./BookForm.css";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { addBook, editBook } from "../../api";

export default function BookForm({
  books,
  categories,
  authors,
  editBookFn,
}: {
  books: Book[];
  categories: string[];
  authors: Author[];
  editBookFn: (book: Book) => void;
}) {
  const bookId = useParams()["book"];
  const book = books.find((book) => book.id === Number(bookId));
  const navigate = useNavigate();
  const [name, setName] = useState(book?.name || "");
  const [category, setCategory] = useState(book?.category || "");
  const [author, setAuthor] = useState(book?.author.id || 0);
  const [availableCopies, setAvailableCopies] = useState(
    book?.availableCopies || 0
  );

  useEffect(() => {
    if (book === undefined) {
      setName("");
      setCategory(categories[0]);
      setAuthor(0);
      setAvailableCopies(0);
    } else {
      setName(book.name);
      setCategory(book.category);
      setAuthor(book.author.id);
      setAvailableCopies(book.availableCopies);
    }
  }, [book]);

  function handleClick() {
    if (book !== undefined) {
      editBook({ id: book.id, name, category, author, availableCopies }).then(
        () => {
          editBookFn({
            id: book.id,
            name,
            category,
            author: authors.find((a) => a.id === author) ?? authors[0],
            availableCopies,
          });
          navigate("/");
        }
      );
    } else {
      addBook({ name, category, author, availableCopies }).then(() => {
        navigate("/");
      });
    }
  }

  return (
    <form>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="category">Category</label>
      <select
        title="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <label htmlFor="author">Author</label>
      <select
        title="Author"
        value={author}
        onChange={(e) => setAuthor(Number(e.target.value))}
      >
        {authors.map((author) => (
          <option key={author.id} value={author.id}>
            {`${author.name} ${author.surname}`}
          </option>
        ))}
      </select>
      <label htmlFor="availableCopies">Available Copies</label>
      <input
        type="number"
        id="availableCopies"
        value={availableCopies}
        onChange={(e) => setAvailableCopies(Number(e.target.value))}
      />
      <button type="button" onClick={handleClick}>
        Submit
      </button>
    </form>
  );
}
