package livraria.service;

import java.util.List;

import livraria.entity.Author;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by Thiago on 17/05/2018.
 */
@Service
public class AuthorService {


    public List<Author> listar(Author author) {
//        return repository.listarByFiltro(author);
        return null;
    }

    public Author obter(Integer id) {
//        return repository.findOne(id);
        return null;
    }

    @Transactional
    public Author salvar(Author author) {
        return null;
    }

    @Transactional
    public void remover(Integer id) {
    }


}
