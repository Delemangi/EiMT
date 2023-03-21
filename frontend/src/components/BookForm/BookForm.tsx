import "./BookForm.css";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { addBook, editBook, getBooks } from "../../api";

export default function BookForm({
  categories,
  authors,
  editBookFn,
}: {
  categories: string[];
  authors: Author[];
  editBookFn: (book: Book) => void;
}) {
  const bookId = useParams()["book"];
  const [books, setBooks] = useState<Book[]>([]);
  const book = books.find((book) => book.id === Number(bookId));
  const navigate = useNavigate();
  const [name, setName] = useState(book?.name ?? "Unnamed Book");
  const [category, setCategory] = useState(book?.category ?? categories[0]);
  const [author, setAuthor] = useState(book?.author.id ?? authors[0]?.id);
  const [availableCopies, setAvailableCopies] = useState(
    book?.availableCopies ?? 0
  );
  const [error, setError] = useState("");

  useEffect(() => {
    getBooks().then((books) => setBooks(books));
  }, []);

  useEffect(() => {
    if (book === undefined) {
      setName("Unnamed Book");
      setCategory(categories[0]);
      setAuthor(authors[0]?.id);
      setAvailableCopies(0);
    } else {
      setName(book.name);
      setCategory(book.category);
      setAuthor(book.author.id);
      setAvailableCopies(book.availableCopies);
    }
  }, [book]);

  function handleClick() {
    if (name === "") {
      setError("Please set a name.");
      return;
    }

    if (availableCopies < 0) {
      setError("Available copies must be a positive number.");
      return;
    }

    if (book !== undefined) {
      editBook({ id: book.id, name, category, author, availableCopies }).then(
        () => {
          editBookFn({
            id: book.id,
            name,
            category,
            author: authors.find((a) => a.id === author) as Author,
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
    <>
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
      {error !== "" && <p className="error">{error}</p>}
    </>
  );
}
