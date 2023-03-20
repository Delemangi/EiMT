package mk.finki.ukim.emt.eshop.controller;

import mk.finki.ukim.emt.eshop.model.Author;
import mk.finki.ukim.emt.eshop.model.dto.AuthorDto;
import mk.finki.ukim.emt.eshop.service.IAuthorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/authors")
public class AuthorController {
    private final IAuthorService authorService;

    public AuthorController(IAuthorService authorService) {
        this.authorService = authorService;
    }

    @GetMapping("/list")
    public List<Author> listAuthors() {
        return authorService.getAllAuthors();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Author> getAuthorById(@PathVariable Long id) {
        Author author = authorService.getAuthorById(id);

        if (author == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(author);
        }
    }

    @PostMapping("/add")
    public ResponseEntity<Author> addAuthor(@RequestBody AuthorDto author) {
        Author newAuthor = authorService.addAuthor(author);

        if (newAuthor == null) {
            return ResponseEntity.badRequest().build();
        } else {
            return ResponseEntity.ok(newAuthor);
        }
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<Author> editAuthor(@PathVariable Long id, @RequestBody AuthorDto author) {
        Author newAuthor = authorService.editAuthor(id, author);

        if (newAuthor == null) {
            return ResponseEntity.badRequest().build();
        } else {
            return ResponseEntity.ok(newAuthor);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Author> deleteAuthor(@PathVariable Long id) {
        Author author = authorService.getAuthorById(id);

        if (author == null) {
            return ResponseEntity.notFound().build();
        } else {
            authorService.deleteAuthor(id);
            return ResponseEntity.ok(author);
        }
    }
}
