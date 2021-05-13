package it.noteatyet.gestionale.model;
import java.util.List;

import javax.persistence.*;


import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "piatti")
public class Piatto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String nome;
    private double prezzo;
    @ManyToOne
    @JoinColumn(name="categoria_id", nullable=false)
    private Categoria categoria;
    @ManyToOne
    @JoinColumn(name="ristorante_id", nullable=false)
    @JsonIgnore
    private Ristorante ristorante;
    @Transient
    private List<Ingrediente> ingredienti;

    public Piatto(int id, String nome, double prezzo, Categoria categoria, Ristorante ristorante,
                  List<Ingrediente> ingredienti) {
        super();
        this.id = id;
        this.nome = nome;
        this.prezzo = prezzo;
        this.categoria = categoria;
        this.ristorante = ristorante;
        this.ingredienti = ingredienti;
    }

    public Piatto() {
        super();
    }
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }
    public double getPrezzo() {
        return prezzo;
    }
    public void setPrezzo(double prezzo) {
        this.prezzo = prezzo;
    }
    public Categoria getCategoria() {
        return categoria;
    }
    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }
    public Ristorante getRistorante() {
        return ristorante;
    }
    public void setRistorante(Ristorante ristorante) {
        this.ristorante = ristorante;
    }
    public List<Ingrediente> getIngredienti() {
        return ingredienti;
    }
    public void setIngredienti(List<Ingrediente> ingredienti) {
        this.ingredienti = ingredienti;
    }
}
