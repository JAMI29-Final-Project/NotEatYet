package it.noteatyet.gestionale.controller;

import it.noteatyet.gestionale.CRUDRepository.*;
import it.noteatyet.gestionale.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping
public class ControllerRistoranti {

    //interfaccia che gestisce le chiamate della tabella Ristoranti
    @Autowired
    IRistorantiCRUD ristorantiGEST;

    //interfaccia che gestisce le chiamate della tabella piatti
    @Autowired
    IPiattiCRUD piattiGEST;

    //interfaccia che gestisce le chiamate della tabella Ingredienti
    @Autowired
    IIngredientiCRUD ingredientiGEST;

    @GetMapping("/ristoranti")
        public List<Ristorante> getAll() {

            return ristorantiGEST.findAll();
        }

        @GetMapping("/ristoranti/{id}")
        public Ristorante getOne(@PathVariable int id) {

        Ristorante ristorante = ristorantiGEST.findById(id).orElse(null);
        ristorante.setMenu(piattiGEST.findPiattoByRistoranteId(id));
        for(Piatto piatto : ristorante.getMenu()){
            piatto.setIngredienti(ingredientiGEST.findIngredienteByPiattoId(piatto.getId()));
        }
        return ristorante;

    }

    @PostMapping("/ristoranti")
    public void addResturant(@RequestBody Ristorante ristorante) {
        ristorantiGEST.save(ristorante);
    }

    @DeleteMapping("/ristoranti/{id}")
    public void deleteResturant(@PathVariable int id) {

        Ristorante ristorante = getOne(id);

        for (Piatto piattodel : ristorante.getMenu()) {
            for(Ingrediente ingrediente : piattodel.getIngredienti()) {
                ingredientiGEST.deleteById(ingrediente.getId());
            }
            piattiGEST.deleteById(piattodel.getId());
        }
        ristorantiGEST.deleteById(ristorante.getId());
    }

    @PutMapping("/ristoranti")
    public void editRistorant(@RequestBody Ristorante ristoranteedit){
        ristorantiGEST.save(ristoranteedit);
    }

}
