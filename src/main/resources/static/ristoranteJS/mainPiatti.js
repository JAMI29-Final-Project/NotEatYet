$(document).ready(function () {
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