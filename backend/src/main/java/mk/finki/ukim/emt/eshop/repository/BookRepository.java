package mk.finki.ukim.emt.eshop.repository;

import mk.finki.ukim.emt.eshop.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Long> {
}
