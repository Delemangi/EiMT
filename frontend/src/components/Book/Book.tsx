import { Link } from "react-router-dom";
import "./Book.css";

export default function Book({ book }: { book: Book }) {
  return (
    <div className="book">
      <h2>{book.name}</h2>
      <p>Category: {book.category}</p>
      <p>
        Author: {book.author.name} {book.author.surname}
      </p>
      <p>Available Copies: {book.availableCopies}</p>
      <Link to={`/books/edit/${book.id}`}>Edit</Link>
      <Link to={`/books/delete/${book.id}`}>Delete</Link>
      <Link to={`/books/mark/${book.id}`}>Mark</Link>
    </div>
  );
}