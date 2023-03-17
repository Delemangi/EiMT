package mk.finki.ukim.emt.eshop.service;

import mk.finki.ukim.emt.eshop.model.Book;
import mk.finki.ukim.emt.eshop.model.dto.BookDto;
import mk.finki.ukim.emt.eshop.model.exceptions.AuthorNotFoundException;
import mk.finki.ukim.emt.eshop.model.exceptions.BookNotFoundException;
import mk.finki.ukim.emt.eshop.repository.AuthorRepository;
import mk.finki.ukim.emt.eshop.repository.BookRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService implements IBookService {
    private final BookRepository bookRepository;
    private final AuthorRepository authorRepository;

    public BookService(BookRepository bookRepository, AuthorRepository authorRepository) {
        this.bookRepository = bookRepository;
        this.authorRepository = authorRepository;
    }

    @Override
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    @Override
    public Book getBookById(Long id) {
        return bookRepository.findById(id).orElse(null);
    }

    @Override
    public Book addBook(BookDto book) {
        Book b = new Book();

        b.setName(book.getName());
        b.setCategory(book.getCategory());
        b.setAuthor(authorRepository.findById(book.getAuthor()).orElseThrow(AuthorNotFoundException::new));
        b.setAvailableCopies(book.getAvailableCopies());

        return bookRepository.save(b);
    }

    @Override
    public Book editBook(Long id, BookDto book) {
        Book b = bookRepository.findById(id).orElseThrow(BookNotFoundException::new);

        b.setName(book.getName());
        b.setCategory(book.getCategory());
        b.setAuthor(authorRepository.findById(book.getAuthor()).orElseThrow(AuthorNotFoundException::new));
        b.setAvailableCopies(book.getAvailableCopies());

        return bookRepository.save(b);
    }

    @Override
    public void deleteBook(Long id) {
        bookRepository.deleteById(id);
    }

    @Override
    public void markBookAsTaken(Long id) {
        Book b = bookRepository.findById(id).orElseThrow(BookNotFoundException::new);

        b.setAvailableCopies(b.getAvailableCopies() - 1);

        bookRepository.save(b);
    }
}
