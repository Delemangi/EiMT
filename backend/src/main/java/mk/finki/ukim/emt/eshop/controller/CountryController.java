package mk.finki.ukim.emt.eshop.controller;

import mk.finki.ukim.emt.eshop.model.Country;
import mk.finki.ukim.emt.eshop.model.dto.CountryDto;
import mk.finki.ukim.emt.eshop.service.ICountryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/countries")
public class CountryController {
    private final ICountryService countryService;

    public CountryController(ICountryService countryService) {
        this.countryService = countryService;
    }

    @GetMapping("/list")
    public List<Country> getAllCountries() {
        return countryService.getAllCountries();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Country> getCountryById(@PathVariable Long id) {
        Country country = countryService.getCountryById(id);

        if (country == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(country);
        }
    }

    @PostMapping("/add")
    public ResponseEntity<Country> addCountry(@RequestBody CountryDto country) {
        Country newCountry = countryService.addCountry(country);

        if (newCountry == null) {
            return ResponseEntity.badRequest().build();
        } else {
            return ResponseEntity.ok(newCountry);
        }
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<Country> editCountry(@PathVariable Long id, @RequestBody CountryDto country) {
        Country newCountry = countryService.editCountry(id, country);

        if (newCountry == null) {
            return ResponseEntity.badRequest().build();
        } else {
            return ResponseEntity.ok(newCountry);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Country> deleteCountry(@PathVariable Long id) {
        Country country = countryService.getCountryById(id);

        if (country == null) {
            return ResponseEntity.notFound().build();
        } else {
            countryService.deleteCountry(id);
            return ResponseEntity.ok().build();
        }
    }
}
