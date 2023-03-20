const backendUrl = "http://localhost:8080";

export async function getBooks(): Promise<Book[]> {
  const url = `${backendUrl}/api/books/list`;
  return await (await fetch(url)).json();
}

export async function getCategories(): Promise<string[]> {
  const url = `${backendUrl}/api/categories/list`;
  return await (await fetch(url)).json();
}

export async function getAuthors(): Promise<Author[]> {
  const url = `${backendUrl}/api/authors/list`;
  return await (await fetch(url)).json();
}

export async function getBooksByPage(page: number): Promise<Book[]> {
  const url = `${backendUrl}/api/books/list/page/${page}`;
  return await (await fetch(url)).json();
}

export async function getBookById(id: number): Promise<Book> {
  const url = `${backendUrl}/api/books/${id}`;
  return await (await fetch(url)).json();
}

export async function addBook(
  book: Omit<Partial<Book>, "author"> & { author: number }
): Promise<Book> {
  const url = `${backendUrl}/api/books/add`;
  return await (
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    })
  ).json();
}

export async function editBook(
  book: Omit<Book, "author"> & { author: number }
): Promise<Book> {
  const url = `${backendUrl}/api/books/edit/${book.id}`;
  return await (
    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    })
  ).json();
}

export async function deleteBook(id: number): Promise<Book> {
  const url = `${backendUrl}/api/books/delete/${id}`;
  return await (
    await fetch(url, {
      method: "DELETE",
    })
  ).json();
}

export async function markBook(id: number): Promise<Book> {
  const url = `${backendUrl}/api/books/mark/${id}`;
  return await (
    await fetch(url, {
      method: "PUT",
    })
  ).json();
}
