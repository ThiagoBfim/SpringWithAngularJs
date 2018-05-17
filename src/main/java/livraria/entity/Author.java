package livraria.entity;

import org.hibernate.validator.constraints.NotEmpty;

/**
 * Created by Thiago on 16/05/2018.
 */
public class Author extends BaseEntity {

    @NotEmpty
    private String firstName;

    @NotEmpty
    private String lastName;

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
}
