package mk.finki.ukim.emt.eshop.service;

import mk.finki.ukim.emt.eshop.model.Author;
import mk.finki.ukim.emt.eshop.model.Country;
import mk.finki.ukim.emt.eshop.model.dto.AuthorDto;
import mk.finki.ukim.emt.eshop.repository.AuthorRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthorService implements IAuthorService {
    private final AuthorRepository authorRepository;
    private final ICountryService countryService;

    public AuthorService(AuthorRepository authorRepository, ICountryService countryService) {
        this.authorRepository = authorRepository;
        this.countryService = countryService;
    }

    @Override
    public List<Author> getAllAuthors() {
        return authorRepository.findAll();
    }

    @Override
    public Author getAuthorById(Long id) {
        return authorRepository.findById(id).orElse(null);
    }

    @Override
    public Author addAuthor(AuthorDto author) {
        Author a = new Author();
        return saveAuthor(author, a);
    }

    @Override
    public Author editAuthor(Long id, AuthorDto author) {
        Author a = authorRepository.findById(id).orElse(null);

        if (a == null) {
            return null;
        }

        return saveAuthor(author, a);
    }

    @Override
    public void deleteAuthor(Long id) {
        authorRepository.deleteById(id);
    }

    private Author saveAuthor(AuthorDto author, Author a) {
        Country c = countryService.getCountryById(author.getCountry());

        if (c == null) {
            return null;
        }

        a.setName(author.getName());
        a.setSurname(author.getSurname());
        a.setCountry(c);

        return authorRepository.save(a);
    }


}
