package livraria.entity;

import org.hibernate.validator.constraints.NotEmpty;

/**
 * Created by Thiago on 16/05/2018.
 */
public class Book extends BaseEntity {

    @NotEmpty
    private String title;

    @NotEmpty
    private String isbn;

    @NotEmpty
    private Integer authorId;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public Integer getAuthorId() {
        return authorId;
    }

    public void setAuthorId(Integer authorId) {
        this.authorId = authorId;
    }
}
