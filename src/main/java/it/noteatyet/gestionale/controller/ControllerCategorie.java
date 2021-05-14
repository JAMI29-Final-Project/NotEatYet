package it.noteatyet.gestionale.controller;

import it.noteatyet.gestionale.CRUDRepository.ICategorieCRUD;
import it.noteatyet.gestionale.model.Categoria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping
public class ControllerCategorie {

    @Autowired
    ICategorieCRUD categorieGEST;

    @GetMapping("/categorie")
    public List<Categoria> categorie() {
        return categorieGEST.findAll();
    }
}
