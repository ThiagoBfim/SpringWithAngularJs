package livraria.service;

import java.util.List;

import livraria.entity.Book;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by Thiago on 17/05/2018.
 */
@Service
public class BookService {


    public List<Book> listar() {
//		return repository.findAll();
        return null;
    }

    public Book obter(Integer id) {
//		return repository.findOne(id);
        return null;
    }

    @Transactional
    public Book salvar(Book book) {
//		return repository.save(book);
        return null;
    }


    @Transactional
    public void remover(Integer id) {
//		repository.delete(id);
    }


    public List<Book> findByNomeIgnoreCaseContaining(String nome) {
//		return repository.findByNomeIgnoreCaseContaining(nome);
        return null;
    }

}
