package it.noteatyet.gestionale.controller;



import it.noteatyet.gestionale.CRUDRepository.*;
import it.noteatyet.gestionale.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
public class ControllerPiatti {

    //interfaccia che gestisce le chiamate della tabella Ristoranti
    @Autowired
    IRistorantiCRUD ristorantiGEST;

    //interfaccia che gestisce le chiamate della tabella piatti
    @Autowired
    IPiattiCRUD piattiGEST;

    //interfaccia che gestisce le chiamate della tabella categorie
    @Autowired
    ICategorieCRUD categorieGEST;

    //interfaccia che gestisce le chiamate della tabella Ingredienti
    @Autowired
    IIngredientiCRUD ingredientiGEST;

    @GetMapping("/piatti")
    public List<Piatto> getAll(){
        return piattiGEST.findAll();
    }

    @GetMapping("/piatti/ristoranteid/{idRistoratore}")
    public List<Piatto> piatti (@PathVariable int idRistoratore){
        List <Piatto> piatti = piattiGEST.findPiattoByRistoranteId(idRistoratore);
        for(Piatto piatto : piatti){
            piatto.setIngredienti(ingredientiGEST.findIngredienteByPiattoId(piatto.getId()));
        }

        return piatti;

    }

    @GetMapping("/piatti/piattoid/{idPiatto}")
    public Piatto piatto (@PathVariable int idPiatto){
        System.out.println(idPiatto +"");
        Piatto piatto = piattiGEST.findById(idPiatto).orElse(null);
        piatto.setIngredienti(ingredientiGEST.findIngredienteByPiattoId(piatto.getId()));
        return piatto;
    }

    @PostMapping("/piatti/aggiungi/{idRistorante}/{idCategoria}")
    public void addPiatto(@PathVariable int idRistorante, @PathVariable int idCategoria, @RequestBody Piatto piatto){
        Categoria categoria = categorieGEST.findById(idCategoria).orElse(null);
        Ristorante ristorante = ristorantiGEST.findById(idRistorante).orElse(null);
        piatto.setCategoria(categoria);
        piatto.setRistorante(ristorante);
        piattiGEST.save(piatto);
    }

    @DeleteMapping("/piatti/elimina/{idPiatto}")
    public void delete(@PathVariable int idPiatto){
       ingredientiGEST.deleteIngredienteByPiattoId(idPiatto);
       piattiGEST.deleteById(idPiatto);
    }

    @PutMapping("/piatti/edit/{idRistorante}/{idCategoria}")
    public void editPiatto(@PathVariable int idRistorante, @PathVariable int idCategoria, @RequestBody Piatto piatto ){
        Categoria categoria = categorieGEST.findById(idCategoria).orElse(null);
        Ristorante ristorante = ristorantiGEST.findById(idRistorante).orElse(null);
        piatto.setCategoria(categoria);
        piatto.setRistorante(ristorante);
        piattiGEST.save(piatto);
    }
}
