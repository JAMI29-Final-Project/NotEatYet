$(document).ready(function () {
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
});