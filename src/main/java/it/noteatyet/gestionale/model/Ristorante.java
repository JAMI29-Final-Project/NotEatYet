package it.noteatyet.gestionale.model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "ristoranti")
public class Ristorante {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String ragionesociale;
    private String piva;
    private String regione;
    private String citta;
    private String via;
    private int ncivico;
    @Transient
    private List<Piatto>menu;

    public Ristorante(int id, String ragionesociale, String piva, String regione, String citta, String via, int ncivico, List<Piatto> menu) {
        super();
        this.id = id;
        this.ragionesociale = ragionesociale;
        this.piva = piva;
        this.regione = regione;
        this.citta = citta;
        this.via = via;
        this.ncivico = ncivico;
        this.menu = menu;
    }

    public Ristorante() {
        super();
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getRagionesociale() {
        return ragionesociale;
    }

    public void setRagionesociale(String ragionesociale) {
        this.ragionesociale = ragionesociale;
    }

    public String getPiva() {
        return piva;
    }

    public void setPiva(String piva) {
        this.piva = piva;
    }

    public String getRegione() {
        return regione;
    }

    public void setRegione(String regione) {
        this.regione = regione;
    }

    public String getCitta() {
        return citta;
    }

    public void setCitta(String citta) {
        this.citta = citta;
    }

    public String getVia() {
        return via;
    }

    public void setVia(String via) {
        this.via = via;
    }

    public int getNcivico() {
        return ncivico;
    }

    public void setNcivico(int ncivico) {
        this.ncivico = ncivico;
    }

    public List<Piatto> getMenu() {
        return menu;
    }

    public void setMenu(List<Piatto> menu) {
        this.menu = menu;
    }
}
