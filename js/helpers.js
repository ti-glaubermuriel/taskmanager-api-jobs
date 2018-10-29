var APP = {};

APP.serializeFormJson = function (form) {
    var o = {};
    var returnJson = {};
    var getempty = false;

    var a = $(form).serializeArray();
    $.each(a, function () {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });

    // clear json
    $.each(o, function (i, item) {
        if (!getempty) {
            if (item.replace(/\s/g, "") != "") {
                returnJson[i] = item;
            }
        }
        else {
            returnJson[i] = item;
        }

    });

    return returnJson;
};


APP.populateTaskTable = function (table, data) {

    $(table + ' tbody').empty();

    $.each(data, function (i, item) {
        time_hour = (item.time_hour) ? item.time_hour + 'h ' : '';
        time_minute = (item.time_minute) ? item.time_minute + 'm ' : '';
        row_duration = time_hour + '' + time_minute;
        $('<tr>').append(
            $('<td>').text(item.description),
            $('<td>').text(row_duration),
            $('<td>').html('<button type="button" class="btn btn-secondary btn-sm edit" rel="' + item.id + '"><i class="fa fa-pencil-alt"></i></button>'),
            $('<td>').html('<button type="button" class="btn btn-danger btn-sm delete"  rel="' + item.id + '"><i class="fa fa-trash-alt"></i></button>')
        ).appendTo(table + ' tbody');

    });
};



APP.populateForm = function (form, data) {
    $.each(data, function(key, value) {
        
        var $ctrl = $(form).find('[name='+key+']');

        if ($ctrl.is('select')){
            $('option', $ctrl).each(function() {
                if (this.value == value)
                    this.selected = true;
            });
        } else if ($ctrl.is('textarea')) {
            $ctrl.val(value);
        } else {
            switch($ctrl.attr("type")) {
                case "text":
                case "number":
                case "hidden":
                    $ctrl.val(value);   
                    break;
                case "checkbox":
                    if (value == '1')
                        $ctrl.prop('checked', true);
                    else
                        $ctrl.prop('checked', false);
                    break;
            } 
        }
    });

};

APP.resetForm = function (form) {
    $(form)[0].reset();
    $(form).find('input:hidden').val('');
};



APP.listAllTask = function () {
    $.ajax({
        url: 'api/task/list',
        headers: {
            'task-token': '123456',
            'Content-Type': 'application/json'
        },
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            APP.populateTaskTable('table.table-task', data);
        }
    });
};