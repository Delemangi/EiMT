import "./BookDelete.css";

import { useNavigate, useParams } from "react-router-dom";

import { deleteBook } from "../../api";

export default function BookDelete({
  updateState,
}: {
  updateState: (book: number) => void;
}) {
  const navigate = useNavigate();
  const book = Number(useParams()["book"]);

  function handleClick() {
    deleteBook(book).then(() => {
      updateState(book);
      navigate("/");
    });
  }

  return (
    <div className="delete">
      <h1>Delete Book</h1>
      <p>Are you sure you want to delete this book?</p>
      <button type="button" onClick={handleClick}>
        Delete
      </button>
    </div>
  );
}
