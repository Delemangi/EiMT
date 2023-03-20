import "./Header.css";

import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <div className="info">Book Store</div>
      <ul className="header-list">
        <li>
          <Link to="/books">Books</Link>
        </li>
        <li>
          <Link to="/categories">Categories</Link>
        </li>
        <li>
          <Link to="/authors">Authors</Link>
        </li>
        <li>
          <Link to="/books/add">Add Book</Link>
        </li>
      </ul>
    </header>
  );
}
