import "./Categories.css";

export default function Categories({ categories }: { categories: string[] }) {
  return (
    <div className="categories">
      <h1>Categories</h1>
      <ul>
        {categories.map((category) => (
          <li key={category}>{category}</li>
        ))}
      </ul>
    </div>
  );
}
