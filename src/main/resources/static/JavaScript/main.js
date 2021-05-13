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
                                <li><a class="dropdown-item btn-dettaglio" href='ristorante-dettaglio.html' data-id='${resume[i].id}'>Dettaglio</a></li>
                                <li><a class="dropdown-item btn-modifica-risto" data-id='${resume[i].id}'>Modifica</a></li>
                                <li><a class="dropdown-item btn-elimina-risto" data-id='${resume[i].id}'>Elimina</a></li>
                            </ul>
                    </div>
                </td>
            </tr>`).hide().appendTo(output).fadeIn(i * 150);
            }
          })
    }
    getRistoranti();

    $('#output').on('click', '.btn-dettaglio', function () {
        const idristorante = $(this).attr('data-id');
        getRisto(idristorante);
    });
    
    function getRisto(idristorante) {
        var row = "";
        $.get(`ristoranti/${idristorante}`, function (dettaglio) {
            console.log(dettaglio);
            console.log(dettaglio.ragionesociale);
            console.log(dettaglio.piva);
            const dettaglioRis = $('#dettaglioRis');
            $('#TEST').text(dettaglio.ragionesociale);
            $('#nome').text(dettaglio.piva);
			row = `
            <p class='fs-1 fw-bold text-dark'>${dettaglio.ragionesociale} nel Dettaglio</p> 
            <h4 class='fw-light text-dark'><strong class="fw-bolder">Nome: </strong>${dettaglio.ragionesociale}</h4> 
            <h4 class='fw-light text-dark' id="piva"><strong>Partita IVA: </strong>${dettaglio.piva}</h4>   
            <h4 class='fw-light text-dark' id="via"><strong>Indirizzo: </strong>[VIA]</h4> 
            <h4 class='fw-light text-dark' id="citta"><strong>Citta: </strong>[CITTA][REGIONE]</h4>
            <h4 class='fw-light text-dark' id="regione"><strong>Citta: </strong>[CITTA][REGIONE]</h4>
			`;
            console.log(row);
            $(dettaglioRis).append(row);
		})
	} 

    function deleteRistorante(id) {
        let idPagina = $(`#riga-${id}`);
        
        $.ajax({
            type: "DELETE",
            url: `ristoranti/${id}`,
            success: function (response) {
                console.log(response);
                if (response.messaggio === "Ristorante eliminato") {
                    idPagina.slideUp(300, function () {
                        idPagina.remove();
                    });
                } else {
                    alert("Errore durante la cancellazione. Riprovare.");
                }
                
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
            text: "Operazione irreversibile!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Elimina',
            cancelButtonText: 'Esci',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
              swalWithBootstrapButtons.fire(
                'Cancellato!',
                'Ristorante eliminato'
              )
              deleteRistorante(id);
            } else if (
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                'Uscita'
              )
            }
          })
      });

      
      function addRistorante(ristorante){
        console.log(ristorante);
        $.ajax({
            type: 'POST',
            url: '/ristoranti',
            data: JSON.stringify(ristorante),
            contentType: 'application/json',
            dataType: 'json',
            success: function(response){
                if (response.messaggio === "Nessun ristorante aggiunto"){
                    //  let formData = new FormData(); 
                  //  formData.append("file", fileupload.files[0]);
                  Swal.fire({
                        icon: 'error',
                        title: 'ATTENZIONE!',
                        text: 'Riprova'
                      })
                    } else if (response.messaggio === "Aggiunta effettuata con successo!") {
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
                }
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
            url: "ristorante",
            data: JSON.stringify(ristorante),
            contentType: 'application/json',
            dataType: 'json',
            success: function (response) {
                console.log(response);
                if (response.message === "Crash sistema in modifica"){
                    alert("Problema nella modifica");
                } else if (response.message === "Detto, Fatto") {
                    editMode = false;
                    idModifica = -1;
                    
                }
            }
        });
    }

    $('#output').on('click', '.btn-modifica-risto', function () {
        editMode = true;
        const id = +$(this).attr('data-id');
        idModifica = id;
        window.location.href='modifica-ristorante.html';

        $.get(`ristoranti/${id}`, function(modifica) {
            console.log(modifica);
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
        editMode = true;
        const ristorante = {
            ragionesociale: $('#nomeRistorante').val(),
            piva: $('#iva').val(),
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
    
    function addpiatto(piatto){
        console.log(piatto);
        $.ajax({
            type: 'POST',
            url: '/piatti',
            data: JSON.stringify(piatto),
            contentType: 'application/json',
            dataType: 'json',
            success: function(response){
                if (response.messaggio === "Nessun piatto aggiunto"){
                    //  let formData = new FormData(); 
                    //  formData.append("file", fileupload.files[0]);
                    Swal.fire({
                        icon: 'error',
                        title: 'ATTENZIONE!',
                        text: 'Riprova'
                    })
                } else if (response.messaggio === "Aggiunta effettuata con successo!") {
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
                    }
                }
            })
        }
        
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