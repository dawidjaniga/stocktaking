$(document).ready(function() {
    var $notifyAlert = $('#notifyAlert'),
        stuffTable = {
            $el: $('#stuffTable'),
            $rowTemplate: $('#stuffTable-rowTemplate'),
            getApiUrl: function () {
                return this.$el.attr('data-api-url');
            },
            getImageStoragePath: function () {
                return this.$el.attr('data-image-storage-path');
            },
            addRows: function (items) {
                items.forEach(function(item){
                    item.imagePath = this.getImageStoragePath() + item.image;
                    $(this.$el[0].tBodies[0]
                        .insertRow())
                        .loadTemplate(this.$rowTemplate, item);
                }.bind(this));
            }
        };

    function notify(type, text) {
        $notifyAlert.removeClass().addClass('alert alert-' + type).text(text).show();
        setTimeout( function() {
                $notifyAlert.hide();
            },
            2500);
    }

    $.ajax({
       method: 'GET',
       url: stuffTable.getApiUrl(),
       success: function(items) {
           stuffTable.addRows(items);
       },
       error: function(error) {
           notify('danger', error.responseJSON.message)
       }
    });
});
