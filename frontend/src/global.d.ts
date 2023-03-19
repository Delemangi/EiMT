declare global {
  type Book = {
    id: number;
    name: string;
    category: string;
    author: Author;
    availableCopies: number;
  };

  type Author = {
    id: number;
    name: string;
    surname: string;
    country: Country;
  };

  type Country = {
    id: number;
    name: string;
    continent: string;
  };
}

export {};
