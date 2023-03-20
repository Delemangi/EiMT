package mk.finki.ukim.emt.eshop.service;

import mk.finki.ukim.emt.eshop.model.Country;
import mk.finki.ukim.emt.eshop.model.dto.CountryDto;
import mk.finki.ukim.emt.eshop.repository.CountryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CountryService implements ICountryService {
    private final CountryRepository countryRepository;

    public CountryService(CountryRepository countryRepository) {
        this.countryRepository = countryRepository;
    }

    @Override
    public List<Country> getAllCountries() {
        return countryRepository.findAll();
    }

    @Override
    public Country getCountryById(Long country) {
        return countryRepository.findById(country).orElse(null);
    }

    @Override
    public Country addCountry(CountryDto country) {
        Country newCountry = new Country();

        newCountry.setName(country.getName());

        return countryRepository.save(newCountry);
    }

    @Override
    public Country editCountry(Long id, CountryDto country) {
        Country newCountry = countryRepository.findById(id).orElse(null);

        if (newCountry == null) {
            return null;
        }

        newCountry.setName(country.getName());

        return countryRepository.save(newCountry);
    }

    @Override
    public void deleteCountry(Long id) {
        countryRepository.deleteById(id);
    }
}
