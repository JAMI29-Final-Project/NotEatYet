package it.noteatyet.gestionale.model;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "ingredienti")
public class Ingrediente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String nome;
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="piatto_id", nullable=false)
    @JsonIgnore
    Piatto piatto;

    public Ingrediente(String nome, Piatto piatto) {
        super();
        this.nome = nome;
        this.piatto = piatto;
    }

    public Ingrediente() {
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

    public Piatto getPiatto() {
        return piatto;
    }

    public void setPiatto(Piatto piatto) {
        this.piatto = piatto;
    }
}