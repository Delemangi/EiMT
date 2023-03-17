package mk.finki.ukim.emt.eshop.repository;

import mk.finki.ukim.emt.eshop.model.Country;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CountryRepository extends JpaRepository<Country, Long> {
}
