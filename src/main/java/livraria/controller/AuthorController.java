package livraria.controller;

import java.util.Arrays;
import java.util.List;
import java.util.function.Predicate;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import livraria.entity.Author;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/author")
public class AuthorController {

    public final static String URL_AUTHOR = "https://bibliapp.herokuapp.com/api/authors";

    @PostMapping("/salvar")
    public ResponseEntity<Author> salvar(@RequestBody final Author author) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.postForEntity(URL_AUTHOR, author, Author.class);

    }

    @PutMapping("/alterar")
    public ResponseEntity<Author> editar(@RequestBody final Author author) {
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.put(URL_AUTHOR, author, Author.class);
        return new ResponseEntity<>(author, HttpStatus.OK);
    }

    @PostMapping("/listar")
    public ResponseEntity<List<Author>> retrieveByFiltro(@RequestBody(required = false) final Author author) {

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Author[]> authors = restTemplate.getForEntity(URL_AUTHOR, Author[].class);
        //TODO procurar qual é o method da API que consulta com filtro.
        if (author != null) {
            List<Author> autores = Stream.of(authors.getBody())
                    .filter(firstNamePredicate(author).and(lastNamePredicate(author))).collect(Collectors.toList());
            return new ResponseEntity<>(autores, HttpStatus.OK);
        }
        return new ResponseEntity<>(Arrays.asList(authors.getBody()), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Author> getAuthor(@PathVariable("id") Integer id) {
        RestTemplate restTemplate = new RestTemplate();
        return new ResponseEntity<>(restTemplate.getForObject(URL_AUTHOR + "/" + id, Author.class), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Integer id) {
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.delete(URL_AUTHOR + "/" + id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    private Predicate<Author> firstNamePredicate(Author author) {
        return a -> StringUtils.isEmpty(author.getFirstName())
                || !StringUtils.isEmpty(a.getFirstName())
                && a.getFirstName().toLowerCase().contains(author.getFirstName().toLowerCase());
    }

    private Predicate<Author> lastNamePredicate(Author author) {
        return a -> StringUtils.isEmpty(author.getLastName())
                || !StringUtils.isEmpty(a.getLastName())
                && a.getLastName().toLowerCase().contains(author.getLastName().toLowerCase());
    }
}
