package mk.finki.ukim.emt.eshop.service;

import mk.finki.ukim.emt.eshop.model.Book;
import mk.finki.ukim.emt.eshop.model.dto.BookDto;

import java.util.List;

public interface IBookService {
    List<Book> getAllBooks();

    Book getBookById(Long id);

    Book addBook(BookDto book);

    Book editBook(Long id, BookDto book);

    void deleteBook(Long id);

    void markBookAsTaken(Long id);
}
