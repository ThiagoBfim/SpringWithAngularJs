package livraria.controller;

import java.util.List;

import livraria.entity.Book;
import livraria.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by Thiago on 17/05/2018.
 */
@RestController
public class BookController {

    @Autowired
    private BookService bookService;

    @ResponseBody
    @PostMapping(value = "/fabricantes")
    public ResponseEntity<List<Book>> getFabricantes(@RequestBody String startWith) {
        List<Book> books;
        if (StringUtils.isEmpty(startWith.trim())) {
            books = bookService.listar();
        } else {
            books = bookService.findByNomeIgnoreCaseContaining(startWith);
        }
        if (books.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return new ResponseEntity<List<Book>>(books, HttpStatus.OK);
    }

    @ResponseBody
    @PostMapping(value = "/fabricante/salvar")
    public ResponseEntity<Book> salvar(@RequestBody final Book book) {
        return new ResponseEntity<Book>(bookService.salvar(book), HttpStatus.OK);
    }

}