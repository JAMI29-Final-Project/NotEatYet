package it.noteatyet.gestionale.CRUDRepository;

import it.noteatyet.gestionale.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IRistorantiCRUD extends JpaRepository<Ristorante, Integer> {

}
