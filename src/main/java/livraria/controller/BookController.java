package livraria.controller;

import livraria.entity.Author;
import livraria.entity.Book;
import livraria.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

/**
 * Created by Thiago on 17/05/2018.
 */
@RestController
@RequestMapping("/book")
public class BookController {

    private static final String URL_BOOK = "https://bibliapp.herokuapp.com/api/books";

    @Autowired
    private BookService bookService;

    @PostMapping(value = "/listar")
    public ResponseEntity<Book[]> retrieveBooks(@RequestBody Integer authorId) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForEntity(AuthorController.URL_AUTHOR + "/" + authorId + "/books", Book[].class);
    }

    @PostMapping(value = "/salvar")
    public ResponseEntity<Book> salvar(@RequestBody final Book book) {
        RestTemplate restTemplate = new RestTemplate();
        return new ResponseEntity<>(restTemplate.postForObject(URL_BOOK, book, Book.class), HttpStatus.OK);
    }

    @PutMapping(value = "/alterar")
    public ResponseEntity<Book> alterar(@RequestBody final Book book) {
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.put(URL_BOOK, book, Author.class);
        return new ResponseEntity<>(book, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Integer id) {
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.delete(URL_BOOK + "/" + id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}