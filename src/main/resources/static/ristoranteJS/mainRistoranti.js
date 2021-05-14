$(document).ready(function () {
    function getRistoranti() {
        $.get('/ristoranti', function (resume) {
            const output = $('#output');
            for (let i = 0; i < resume.length; i++) {
                $(`<tr id='riga-${resume[i].id}'>
                <td class='ragionesociale'>${resume[i].ragionesociale}</td>
                <td class='piva'>${resume[i].piva}</td>
                <td class='via'>${resume[i].via}</td>
                <td class='citta'>${resume[i].citta}</td>
                <td class='regione'>${resume[i].regione}</td>
                <td>
                    <div class="btn-group" role="group">
                        <button id="btnGroupDrop1" type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">Opzioni</button>
                            <ul class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                                <li><a class="dropdown-item btn-dettaglio" data-bs-toggle="modal" data-bs-target="#dettaglio" data-id='${resume[i].id}'>Dettaglio</a></li>
                                <li><a class="dropdown-item btn-modifica-risto" data-bs-toggle="modal" data-bs-target="#modifica" data-id='${resume[i].id}'>Modifica</a></li>
                                <li><a class="dropdown-item btn-elimina-risto" data-id='${resume[i].id}'>Elimina</a></li>
                            </ul>
                    </div>
                </td>
            </tr>`).hide().appendTo(output).fadeIn(i * 150);
            }
          })
    }
    getRistoranti();

    // Dettaglio Del Ristorante
    $('#output').on('click', '.btn-dettaglio', function () {
        const idristorante = $(this).attr('data-id');
        getRisto(idristorante);
    });
    function getRisto(idristorante) {
        $.get(`ristoranti/${idristorante}`, function (dettaglio) {
            console.log(dettaglio);
            const dettaglioRis = $('#dettaglioRis');
            $('#title').text(dettaglio.ragionesociale + ' Nel Dettaglio');
            $('#menuDettaglio').text("Menu di " + dettaglio.ragionesociale);
			let row = `
            <h4 class='fw-light text-dark'><strong class="fw-bolder">Nome: </strong>${dettaglio.ragionesociale}</h4> 
            <h4 class='fw-light text-dark' id="piva"><strong>Partita IVA: </strong>${dettaglio.piva}</h4>   
            <h4 class='fw-light text-dark' id="via"><strong>Indirizzo: </strong>${dettaglio.via} ${dettaglio.ncivico}</h4> 
            <h4 class='fw-light text-dark' id="citta"><strong>Citta: </strong>${dettaglio.citta}</h4>
            <h4 class='fw-light text-dark' id="regione"><strong>Regione: </strong>${dettaglio.regione}</h4>
			`;
            $(row).hide().appendTo(dettaglioRis).fadeIn(500);
		})
        $.get(`piatti/ristoranteid/${idristorante}`, function(listaPiatti) {
            const ristoranteListaPiatti = $('#listaMenuDettaglio');
            for (let i = 0; i < listaPiatti.length; i++) {
                $(`<tr id='riga-${listaPiatti[i].id}'>
                <td>${listaPiatti[i].nome}</td>
                <td>${listaPiatti[i].prezzo}</td>
                <td>${listaPiatti[i].categoria.nome}</td>
                <td>
                    <div class="btn-group" role="group">
                        <button id="btnGroupDrop1" type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">Opzioni</button>
                            <ul class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                                <li><a class="dropdown-item btn-dettaglio" data-bs-toggle="modal" data-bs-target="#dettaglio" data-id='${listaPiatti[i].id}'>Dettaglio</a></li>
                                <li><a class="dropdown-item btn-modifica-risto" data-bs-toggle="modal" data-bs-target="#modifica" data-id='${listaPiatti[i].id}'>Modifica</a></li>
                                <li><a class="dropdown-item btn-elimina-risto" data-id='${listaPiatti[i].id}'>Elimina</a></li>
                            </ul>
                    </div>
                </td>
            </tr>`).hide().appendTo(ristoranteListaPiatti).fadeIn(i * 150); //Gestisci i pulsanti
            }
        })
	} 
    

    function deleteRistorante(id) {
        let idPagina = $(`#riga-${id}`);
        
        $.ajax({
            type: "DELETE",
            url: `ristoranti/${id}`,
            success: function (response) {
                idPagina.slideUp(300, function () {
                    idPagina.remove(); 
                })
            },
            error: function(error) {
                alert("Errore durante la cancellazione. Riprovare."); 
            }
        });
      }
      
      
      $('#output').on('click', '.btn-elimina-risto', function() {
        const id = $(this).attr('data-id');
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-danger',
                cancelButton: 'btn btn-primary mx-2'
            },
            buttonsStyling: false
          })
          
          swalWithBootstrapButtons.fire({
            title: 'Sei Sicuro?',
            text: "Operazione Irreversibile!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Elimina',
            cancelButtonText: 'Esci',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
              swalWithBootstrapButtons.fire(
                'Cancellato!',
                'Il tuo Ristorante è stato Eliminato.',
                'success'
              )
              deleteRistorante(id);
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                'Uscita',
                'Il tuo Ristorante è salvo',
                'error'
              )
            }
          })
      });

      
      function addRistorante(ristorante){
        $.ajax({
            type: 'POST',
            url: 'ristoranti',
            data: JSON.stringify(ristorante),
            contentType: 'application/json',
          /*  dataType: 'json', */
            success: function(success){
                Swal.fire({
                    icon: 'success',
                    title: 'INSERITO!',
                    text: 'Aggiunta andata a buon fine',
                    showConfirmButton: false,
                    timer: 1500
                })
                setTimeout(function () {
                      window.location.href='ristoranti.html';
                    }, 1500);
            },
            error: function () {
                Swal.fire({
                      icon: 'error',
                      title: 'ATTENZIONE!',
                      text: 'Riprova'
                    })                
            } 
        })
    } 
    
    $('#aggiungiRistorante').click(function () {
        const ristorante = {
            ragionesociale: $('#nomeRistorante').val(),
            piva: $('#iva').val(),
            citta: $('#cittaRistorante').val(),
            regione: $('#regioneRistorante').val(),
            via: $('#viaRistorante').val(),
            ncivico: $('#ncivico').val()            
        }
        addRistorante(ristorante);
        
        $('#nomeRistorante').val('');
        $('#iva').val('');
        $('#cittaRistorante').val('');
        $('#regioneRistorante').val('');
        $('#viaRistorante').val('');
        $('#ncivico').val('');
        
    })

    let editMode = false;
    let idModifica = -1;

    function modificaRistorante(ristorante) {
        $.ajax({
            type: "PUT",
            url: "ristoranti",
            data: JSON.stringify(ristorante),
            contentType: 'application/json',
            dataType: 'json',
            success: function (response) {
                    editMode = false;
                    idModifica = -1;
            },
           /* error: function (error) {
                alert("Problema nella modifica");                
            }*/
        });
    }

    $('#output').on('click', '.btn-modifica-risto', function () {
        editMode = true;
        const id = +$(this).attr('data-id');
        idModifica = id;

        $.get(`/ristoranti/${id}`, function(modifica) {
            $('#ragionesociale').val(modifica.ragionesociale);
            $('#piva').val(modifica.piva);
            $('#cittaRistorante').val(modifica.citta);
            $('#regioneRistorante').val(modifica.regione);
            $('#viaRistorante').val(modifica.via);
            $('#ncivico').val(modifica.ncivico);
            $('#modificaRistorante').text('Modifica ' + modifica.ragionesociale);
            $('#title').text('Modifica ' + modifica.ragionesociale);
         
        });
    });

    $('#modificaRistorante').click(function () {
        const ristorante = {
            ragionesociale: $('#ragionesociale').val(),
            piva: $('#piva').val(),
            citta: $('#cittaRistorante').val(),
            regione: $('#regioneRistorante').val(),
            via: $('#viaRistorante').val(),
            ncivico: $('#ncivico').val()            
        }
        console.log(ristorante);
        if (editMode) {
            Swal.fire({
                icon: 'question',
                title: 'Vuoi salvare la Modifica di ' + ristorante.ragionesociale + '?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: `Salva`,
                denyButtonText: `Non Salvare`,
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                  Swal.fire('Salvato!', '', 'success')
                  ristorante.id = idModifica;
                  modificaRistorante(ristorante);
                  setTimeout(function () {
                    window.location.href='ristoranti.html';
                  }, 2000);
                } else if (result.isDenied) {
                  Swal.fire('Modifiche non salvate', '', 'info')
                }
              })     
        }
    })




    /* GESTIONE PIATTI */

    function getPiatti() {
        $.get('/piatti', function (resume) {
            const listaPiatti = $('#listaPiatti');
            for (let i = 0; i < resume.length; i++) {
                $(`<tr id='riga-${resume[i].id}'>
                <td class='nome'>${resume[i].nome}</td>
                <td class='prezzo'>${resume[i].prezzo}</td>
                <td class='categoria'>${resume[i].categoria.nome}</td>
                <td>
                    <div class="btn-group" role="group">
                        <button id="btnGroupDrop1" type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">Opzioni</button>
                            <ul class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                                <li><a class="dropdown-item btn-modifica" data-bs-toggle="modal" data-bs-target="#modifica" data-id='${resume[i].id}'>Modifica</a></li>
                                <li><a class="dropdown-item btn-elimina" data-id='${resume[i].id}'>Elimina</a></li>
                            </ul>
                    </div>
                </td>
            </tr>`).hide().appendTo(listaPiatti).fadeIn(i * 150);
            }
          })
    }
    getPiatti();
        
        $ ( "#myInput" ).on ( "keyup", function () {
            var value = $ ( this ).val ().toLowerCase ();
            $ ( "#output tr" ).filter ( function () {
                $ ( this ).toggle ( $ ( this ).text ().toLowerCase ().indexOf ( value ) > -1 )
            } );
        });
        $ ( "#myInput" ).on ( "keyup", function () {
            var value = $ ( this ).val ().toLowerCase ();
            $ ( "#listaPiatti tr" ).filter ( function () {
                $ ( this ).toggle ( $ ( this ).text ().toLowerCase ().indexOf ( value ) > -1 )
            } );
    });
});