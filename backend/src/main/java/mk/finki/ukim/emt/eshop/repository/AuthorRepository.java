package mk.finki.ukim.emt.eshop.repository;

import mk.finki.ukim.emt.eshop.model.Author;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorRepository extends JpaRepository<Author, Long> {
}
