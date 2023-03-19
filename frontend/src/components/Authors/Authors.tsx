import "./Authors.css";

export default function Authors({ authors }: { authors: Author[] }) {
  return (
    <div className="authors">
      <h1>Authors</h1>
      <ul>
        {authors.map((author) => (
          <li
            key={author.id}
          >{`${author.name} ${author.surname} (${author.id})`}</li>
        ))}
      </ul>
    </div>
  );
}
