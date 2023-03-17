package mk.finki.ukim.emt.eshop.model.dto;

import lombok.Data;
import mk.finki.ukim.emt.eshop.model.enums.Category;

@Data
public class BookDto {
    private String name;

    private Category category;

    private Long author;

    private Integer availableCopies;
}
