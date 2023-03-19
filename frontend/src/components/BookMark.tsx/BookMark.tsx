import { useNavigate, useParams } from "react-router-dom";
import { markBook } from "../../api";
import "./BookMark.css";

export default function BookMark() {
  const navigate = useNavigate();
  const book = Number(useParams()["book"]);

  function handleClick() {
    markBook(book).then(() => navigate("/books"));
  }

  return (
    <div className="mark">
      <h1>Mark Book</h1>
      <p>Are you sure you want to mark this book?</p>
      <button onClick={handleClick}>Mark</button>
    </div>
  );
}
