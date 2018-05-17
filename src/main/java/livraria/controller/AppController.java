package livraria.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by Thiago on 17/05/2018.
 */
@Controller
public class AppController {

    @RequestMapping("/")
    public String home(ModelMap modal) {
        return "home.html";
    }

    @RequestMapping("/cadastro")
    public String cadastro(ModelMap modal) {
        return "cadastro/cadastro.html";
    }

    @RequestMapping("/consulta")
    public String consulta(ModelMap modal) {
        return "consulta/consulta.html";
    }

}
