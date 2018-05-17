package livraria.entity;

import java.io.Serializable;

import org.hibernate.validator.constraints.NotEmpty;

/**
 * Created by Thiago on 16/05/2018.
 */
@SuppressWarnings("serial")
public abstract class BaseEntity implements Serializable {

    @NotEmpty
    private Integer id;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Author)) return false;

        Author author = (Author) o;

        return getId() != null ? getId().equals(author.getId()) : author.getId() == null;
    }

    @Override
    public int hashCode() {
        return getId() != null ? getId().hashCode() : 0;
    }
}
