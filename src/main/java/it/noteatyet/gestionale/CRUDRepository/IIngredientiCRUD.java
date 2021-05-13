package it.noteatyet.gestionale.CRUDRepository;


import it.noteatyet.gestionale.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IIngredientiCRUD extends JpaRepository<Ingrediente, Integer> {

    List<Ingrediente> findIngredienteByPiattoId(Integer id);
    void deleteIngredienteByPiattoId(Integer id);
}
