package mk.finki.ukim.emt.eshop.controller;

import mk.finki.ukim.emt.eshop.model.Author;
import mk.finki.ukim.emt.eshop.service.IAuthorService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
        return this.authorService.getAllAuthors();
    }
}
