package livraria.entity;

import org.hibernate.validator.constraints.NotEmpty;

/**
 * Created by Thiago on 16/05/2018.
 */
public class Book extends BaseEntity {


    @NotEmpty
    private String titulo;

    @NotEmpty
    private String isbn;

    @NotEmpty
    private Author author;

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public Author getAuthor() {
        return author;
    }

    public void setAuthor(Author author) {
        this.author = author;
    }

}
