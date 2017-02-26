$(document).ready(function() {
   var $createThingsForm = $('#createThings'),
       $notifyAlert = $('#notifyAlert'),
       stuffPreview = $('#stuffPreview')[0];

   function notify(type, text) {
        $notifyAlert.removeClass().addClass('alert alert-' + type).text(text).show();
        setTimeout( function() {
            $notifyAlert.hide();
        },
        2500);
   }

   $createThingsForm.on('submit', function (e) {
       var formData = {};

       $(this).find('input[type=text], input[type=number]').each(function() {
           formData[this.name.toLowerCase()] = this.value;
       });

       formData['image'] = stuffPreview.src.split(/,(.+)/)[1];

       e.preventDefault();

       $.ajax({
           method: 'PUT',
           url: $createThingsForm.attr('data-api-url'),
           data: JSON.stringify(formData),
           dataType: 'json',
           contentType: 'application/json; charset=utf-8',
           success: function(res) {
               notify('success', 'Success! Created new thing with ID ' + res.insertId);
               $createThingsForm[0].reset();
               stuffPreview.src = '';
           },
           error: function(error) {
               notify('danger', error.responseJSON.message)
           }
       })
   });

    $('input[type=file]').on('change', function() {
        var preview = stuffPreview,
            file    = $(this)[0].files[0],
            reader  = new FileReader();

        reader.addEventListener("load", function () {
            preview.src = reader.result;
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }
    });
});
