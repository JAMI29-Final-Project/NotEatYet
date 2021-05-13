$(document).ready(function () {
    function getRistoranti() {
        $.get('/ristoranti', function (resume) {
            const output = $('#output');
            console.log(resume);
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
                                <li><a class="dropdown-item btn-modifica" data-bs-toggle="modal" data-bs-target="#modifica" data-id='${resume[i].id}'>Modifica</a></li>
                                <li><a class="dropdown-item btn-elimina" data-id='${resume[i].id}'>Elimina</a></li>
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
        $.get(`ristoranti/${idristorante}`, function (dettaglio) {
            console.log(dettaglio);
            console.log(dettaglio.ragionesociale);
            console.log(dettaglio.piva);
            const dettaglioRis = $('#dettaglioRis');
			let row = `
            <p class='fs-1 fw-bold text-dark'>${dettaglio.ragionesociale} nel Dettaglio</p> 
            <h4 class='fw-light text-dark'><strong class="fw-bolder">Nome: </strong>${dettaglio.ragionesociale}</h4> 
            <h4 class='fw-light text-dark' id="piva"><strong>Partita IVA: </strong>${dettaglio.piva}</h4>   
            <h4 class='fw-light text-dark' id="via"><strong>Indirizzo: </strong>[VIA]</h4> 
            <h4 class='fw-light text-dark' id="citta"><strong>Citta: </strong>[CITTA][REGIONE]</h4>
            <h4 class='fw-light text-dark' id="regione"><strong>Citta: </strong>[CITTA][REGIONE]</h4>
			`;
            console.log(row);
            $(dettaglioRis).append(row);
           /* window.location.href='ristorante-dettaglio.html';*/
		})
	}

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

   /* function addristorante(ristorante){
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
    } */

    function addRistorante(ristorante){
        $.post('/ristoranti', JSON.stringify(ristorante), function (render){
            console.log(render);
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
        })
    }

    $('#aggiungiRistorante').click(function () {
        const ristorante = {
            nome: $('#nomeRistorante').val(),
            piva: $('#iva').val(),
            citta: $('#cittaRistorante').val(),
            regione: $('#regioneRistorante').val(),
            citta: $('#viaRistorante').val(),
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