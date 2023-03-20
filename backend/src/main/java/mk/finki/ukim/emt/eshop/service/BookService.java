package mk.finki.ukim.emt.eshop.service;

import mk.finki.ukim.emt.eshop.model.Author;
import mk.finki.ukim.emt.eshop.model.Book;
import mk.finki.ukim.emt.eshop.model.dto.BookDto;
import mk.finki.ukim.emt.eshop.repository.BookRepository;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService implements IBookService {
    private final BookRepository bookRepository;
    private final IAuthorService authorService;

    public BookService(BookRepository bookRepository, IAuthorService authorService) {
        this.bookRepository = bookRepository;
        this.authorService = authorService;
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
        return saveBook(book, b);
    }

    @Override
    public Book editBook(Long id, BookDto book) {
        Book b = bookRepository.findById(id).orElse(null);

        if (b == null) {
            return null;
        }

        return saveBook(book, b);
    }

    @Override
    public void deleteBook(Long id) {
        bookRepository.deleteById(id);
    }

    @Override
    public void markBookAsTaken(Long id) {
        Book b = bookRepository.findById(id).orElse(null);

        if (b == null) {
            return;
        }

        b.setAvailableCopies(b.getAvailableCopies() - 1);

        bookRepository.save(b);
    }

    @Override
    public List<Book> getAllBooksByPage(Pageable withPage) {
        return bookRepository.findAll(withPage).getContent();
    }

    private Book saveBook(BookDto book, Book b) {
        Author a = authorService.getAuthorById(book.getAuthor());

        if (a == null) {
            return null;
        }

        b.setName(book.getName());
        b.setCategory(book.getCategory());
        b.setAuthor(a);
        b.setAvailableCopies(book.getAvailableCopies());

        return bookRepository.save(b);
    }
}
