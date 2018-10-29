
$(document).ready(function () {

    /**
     * Form submit 
     */
    $('form.task').on('submit', function (e) {
        e.preventDefault();

        var formData = APP.serializeFormJson('form.task');
        var formMethod = (formData.id) ? 'PUT' : 'POST';
        var action = (formData.id) ? 'edit/'+formData.id : 'save';

        $.ajax({
            url: 'api/task/'+action,
            headers: {
                'task-token': '123456',
                'Content-Type': 'application/json'
            },
            method: formMethod,
            dataType: 'json', 
            data: JSON.stringify(formData),
            success: function (data) {
                if (data.type == 'success') {
                    swal({
                        position: 'top-end',
                        type: 'success',
                        text: 'Salvo com sucesso!',
                        showConfirmButton: false,
                        timer: 1500
                      });
                      
                      APP.resetForm('form.task');
                      APP.listAllTask();
                }
            }
        });

        event.preventDefault();
    });

    $('form.task').on('reset', function (e) {
        APP.resetForm('form.task');
    });

    $(document).on('click', ".edit", function (e) {
        e.preventDefault();
        APP.resetForm('form.task');

        var task_id = $(this).attr('rel');
        $.ajax({
            url: 'api/task/get/'+task_id,
            headers: {
                'task-token': '123456',
                'Content-Type': 'application/json'
            },
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                APP.populateForm('form.task', data);
                $('textarea[name="description"]').focus();
            }
        });
    });

    $(document).on('click', ".delete", function (e) {
        e.preventDefault();
        var task_id = $(this).attr('rel');
        $.ajax({
            url: 'api/task/delete/'+task_id,
            headers: {
                'task-token': '123456',
                'Content-Type': 'application/json'
            },
            method: 'DELETE',
            dataType: 'json',
            success: function (data) {
                if (data.type == 'success') {
                    swal({
                        position: 'top-end',
                        type: 'success',
                        text: 'Deletado com sucesso!',
                        showConfirmButton: false,
                        timer: 1500
                      });

                      APP.listAllTask();
                }
            }
        });
    });


    APP.listAllTask();
    $('[data-toggle="popover"]').popover();

});


