// --------------------------------------------------------------
//
// JS with methods to help development   ... @i
//
// --------------------------------------------------------------

//------------------------------------------------------------------
// Translated default messages for the jQuery validation plugin.
// Locale: PT_BR   ...@i
//------------------------------------------------------------------
if (jQuery.validator != null && jQuery.validator != undefined) {
    jQuery.extend(jQuery.validator.messages, {
        required: "Campo obrigatório!",
        remote: "Por favor, corrija este campo.",
        email: "Por favor, forneça um endereço eletrônico válido.",
        url: "Por favor, forneça uma URL válida.",
        date: "Por favor, forneça uma data válida.",
        dateISO: "Por favor, forneça uma data válida (ISO).",
        number: "Por favor, forneça um número válido.",
        digits: "Por favor, forneça somente dígitos.",
        creditcard: "Por favor, forneça um cartão de crédito válido.",
        equalTo: "Por favor, forneça o mesmo valor novamente.",
        accept: "Por favor, forneça um valor com uma extensão válida.",
        maxlength: jQuery.validator.format("Por favor, forneça não mais que {0} caracteres."),
        minlength: jQuery.validator.format("Por favor, forneça ao menos {0} caracteres."),
        rangelength: jQuery.validator.format("Por favor, forneça um valor entre {0} e {1} caracteres de comprimento."),
        range: jQuery.validator.format("Por favor, forneça um valor entre {0} e {1}."),
        max: jQuery.validator.format("Por favor, forneça um valor menor ou igual a {0}."),
        min: jQuery.validator.format("Por favor, forneça um valor maior ou igual a {0}.")
    });

    //--------------------------------------------
    // Validation   ...@i
    //--------------------------------------------

    $.fn.ClearValidation = function () { var v = $(this).validate(); $('[name]', this).each(function () { v.successList.push(this); v.showErrors(); }); v.resetForm(); v.reset(); };
}

// #################################
//
// UTIL
//
// #################################

var Util = new function () {

    // Use to bypass KO / Materialize refreh
    this.bypassRefresh = false;
    // Counter for number of Loadings "call"
    this.counterLoadings = 0;


    //--------------------------------------------
    // WtM   ...@i
    //--------------------------------------------

    this.WtmOpenForm = function (formName) {

        try {
            mc1.wtm.openForm(formName);
        }
        catch{ }
    };

    this.WtmSetHeader = function (title, subTitle) {

        try {
            mc1.wtm.setHeader(title, subTitle);
        }
        catch{ }
    };


    //--------------------------------------------
    // General   ...@i
    //--------------------------------------------

    this.StopPropagation = function (e) {

        if (!Util.IsNullOrEmpty(e)) {
            e.stopPropagation();
            e.preventDefault();
        }
    };

    this.Delay = function (callback, delayMileseconds) {
        var timer = 0;
        return function () {
            var context = this, args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function () {
                callback.apply(context, args);
            }, delayMileseconds || 0);
        };
    };

    this.GenerateUUID = function () {
        var d = new Date().getTime();
        if (Date.now) {
            d = Date.now(); //high-precision timer
        }
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    };

    this.GenerateRandomInt = function (minimum, maximum) {
        return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    };

    this.GetRandomColorList = function (amount) {
        var baseList = ["#e57373", "#ef5350", "#f44336", "#9575cd", "#7e57c2", "#673ab7", "#4fc3f7", "#29b6f6", "#03a9f4", "#81c784", "#66bb6a", "#4caf50", "#fff176", "#ffee58", "#ffeb3b", "#ff8a65", "#ff704", "#ff5722", "#f06292", "#ec407a", "#e91e63", "#7986cb", "#5c6bc0", "#3f51b5", "#aed581", "#9ccc65", "#8bc34a", "#a1887f", "#8d6e63", "#795548", "#ba68c8", "#ab47bc", "#9c27b0", "#4db6ac", "#26a69a", "#009688", "#ffb74d", "#ffa726", "#ff9800", "#64b5f6", "#42a5f5", "#2196f3", "#dce775", "#d4e157", "#cddc39"];
        var colorList = [];

        if (Util.IsNullOrEmpty(amount))
            return colorList;

        var iteractionControl = 1;
        while (colorList.length < amount && iteractionControl < 300) {
            let color = baseList[Util.GenerateRandomInt(0, baseList.length)];

            if (colorList.indexOf(color) < 0)
                colorList.push(color);

            iteractionControl += 1;
        }

        return colorList;
    };

    //--------------------------------------------
    // Knockout   ...@i
    //--------------------------------------------

    this.KoForceUpdate = function () {

        if (Util.bypassRefresh)
            return;

        ko.tasks.runEarly(); // Force update
    };

    //--------------------------------------------
    // Validation JQuery  ...@i
    //--------------------------------------------

    this.VALIDATION_ERROR_PLACEMENT = function (error, element) {
        $(element)
            .closest("form")
            .find("label[for='" + element.attr("id") + "']")
            .attr('data-error', error.text());

        // Combobox
        if ($(element).closest(".select-wrapper") != null)
            $(element).closest(".select-wrapper").removeClass("valid").addClass("invalid");
    };

    this.ValidationErrorPlacement = function (errorText, element) {
        $(element)
            .closest("form")
            .find("label[for='" + element.attr("id") + "']")
            .attr('data-error', errorText);

        // Combobox
        if ($(element).closest(".select-wrapper") != null)
            $(element).closest(".select-wrapper").removeClass("valid").addClass("invalid");
    };

    this.VALIDATION_SUCCESS = function (error, element) {

        // Combobox
        if ($(element).closest(".select-wrapper") != null)
            $(element).closest(".select-wrapper").removeClass("invalid").addClass("valid");
    };

    this.SetupFormValidationList = function (formIdList) {

        if (Util.IsNullOrEmpty(formIdList))
            return;

        for (i = 0; i < formIdList.length; i++)
            Util.SetupFormValidation(formIdList[i]);
    };

    this.SetupFormValidation = function (formID) {

        if (Util.IsNullOrEmpty(formID))
            return;

        $('#' + formID).validate({
            ignore: "",
            errorClass: 'invalid',
            validClass: "valid",
            errorPlacement: Util.VALIDATION_ERROR_PLACEMENT,
            success: Util.VALIDATION_SUCCESS
        });
    };

    this.ClearFormValidation = function (formID) {

        if (Util.IsNullOrEmpty(formID))
            return;

        $('#' + formID).ClearValidation();
    };

    this.IsValidForm = function (formID, customMessage) {
        if (!$('#' + formID).valid()) {
            Util.ShowInvalidFieldsMessage(customMessage);
            return false;
        }

        return true;
    };

    //--------------------------------------------
    // Validate Ajax result   ...@i
    //--------------------------------------------
    this.ValidateAjaxResult = function (result) {
        if (result.success != null && result.success != undefined && result.success == true) {
            return true;
        };

        // Error
        //Util.ShowErrorMessage(Util.BuildAjaxFailMessage(null, "teste joao", result.Message));
        return false;
    };

    // --------------------------------------------
    // Build message for ajax failt result  ...@i
    //--------------------------------------------
    this.BuildAjaxFailMessage = function (jqXHR, textStatus, errorThrown) {

        var message = errorThrown;

        if (!Util.IsNullOrEmpty(textStatus))
            message = textStatus + ': ' + errorThrown;

        if (jqXHR != null) {
            // Model Error
            if (jqXHR.status == 400) {
                if (jqXHR.responseJSON != null &&
                    jqXHR.responseJSON != undefined &&
                    jqXHR.responseJSON.Status != null &&
                    jqXHR.responseJSON.Status == "error" &&
                    jqXHR.responseJSON.Message != null &&
                    jqXHR.responseJSON.Message == "modelstate invalid" &&
                    jqXHR.responseJSON.Data != null &&
                    $.isArray(jqXHR.responseJSON.Data)) {
                    message = jqXHR.responseJSON.Data.join('\r\n');
                }
            }

            // Error Internal
            if (jqXHR.status == 500) {
                if (jqXHR.responseJSON != null &&
                    jqXHR.responseJSON != undefined &&
                    jqXHR.responseJSON.Status != null &&
                    jqXHR.responseJSON.Status == "error" &&
                    jqXHR.responseJSON.Message != null) {
                    message = jqXHR.responseJSON.Message;
                }
            }
        }

        return message;
    };

    // --------------------------------------------
    // Show message   ...@i
    //--------------------------------------------
    this.ShowSuccessMessage = function (message) {
        Util.ShowMessageBase(message, "OK", "dialogSuccess");
    };

    this.ShowErrorMessage = function (message) {
        Util.ShowMessageBase(message, "OK", "dialogError");
    };

    this.ShowInfoMessage = function (message) {
        Util.ShowMessageBase(message, "OK", "dialogInfo");
    };

    this.ShowInfoMessageWithCallback = function (title, message, callback) {
        Util.ShowMessageBase(message, "OK", "dialogInfo", callback, title);
    };

    this.ShowInvalidFieldsMessage = function (message) {

        if (Util.IsNullOrEmpty(message))
            message = "Existem campos não preenchidos ou com valores inválidos!";

        Util.ShowErrorMessage(message);
    };

    this.ShowErrorMessageWithCallback = function (message, callback) {
        Util.ShowMessageBase(message, "OK", "dialogError", callback);
    };

    this.ShowSuccessMessageWithCallback = function (message, callback) {
        Util.ShowMessageBase(message, "OK", "dialogSuccess", callback);
    };

    this.ShowMessageBase = function (message, btnOKText, cssClass, callback, title) {

        if (Util.IsNullOrEmpty(title))
            title = "Mensagem";

        // Generate Dialog unique ID (in multiple messages is necessary)
        var dialogID = "dialogMessage_" + this.GenerateUUID();

        // Jquery UI Dialog
        $('<div id="' + dialogID + '" style="z-index: 2000" title="' + title + '"></div>').dialog({
            modal: true,
            open: function () {
                $('.ui-widget-overlay').addClass('custom-overlay');
                $(this).addClass(cssClass);
                $(this).html('<p>' + message + '</p>');
            },
            buttons: [
                {
                    text: btnOKText,
                    open: function () {
                        $(this).addClass(cssClass);
                    },
                    click: function () {
                        if (callback)
                            $(this).on("dialogclose", callback);

                        $(this).dialog("close");
                        $("#" + dialogID).remove();
                    }
                }
            ]
        });
    };

    // --------------------------------------------
    // Show confirm   ...@i
    //--------------------------------------------

    this.ShowOkCancelConfirm = function (title, message, btnOkCallback, btnCancelCallback) {
        Util.ShowConfirmBase(title, message, null, btnOkCallback, null, btnCancelCallback, "dialogInfo");
    };

    this.ShowYesNoConfirm = function (title, message, btnOkCallback, btnCancelCallback) {
        Util.ShowConfirmBase(title, message, "Sim", btnOkCallback, "Não", btnCancelCallback, "dialogInfo");
    };

    this.ShowCustomDialog = function (modalSelector, btnOkCallback, btnCancelCallback, width, height) {
        if ($(modalSelector).length == 0) {
            console.log(modalSelector + ' does not exist');
        }
        else {
            $(modalSelector).removeClass('hide');
            $(modalSelector).dialog({
                modal: true,
                open: function () {
                    $('.ui-widget-overlay').addClass('custom-overlay');
                    $(this).addClass('dialogInfo');
                },
                buttons: [
                    {
                        text: 'OK',
                        open: function () {
                            $(this).addClass('dialogInfo');
                        },
                        click: function () {
                            if (btnOkCallback)
                                $(this).on("dialogclose", btnOkCallback);

                            $(this).dialog("close");
                        }
                    },
                    {
                        text: 'Cancelar',
                        open: function () {
                            $(this).addClass('dialogInfo');
                        },
                        click: function () {
                            if (btnCancelCallback)
                                $(this).on("dialogclose", btnCancelCallback);

                            $(this).dialog("close");
                        }
                    }
                ],
                width: width,
                maxHeight: height,
                height: height,
            });
        }
    };

    this.ShowConfirmBase = function (title, message, btnOKText, btnOkCallback, btnCancelText, btnCancelCallback, cssClass) {

        if (Util.IsNullOrEmpty(cssClass))
            cssClass = "dialogInfo";

        if (Util.IsNullOrEmpty(btnOKText))
            btnOKText = "Ok";

        if (Util.IsNullOrEmpty(btnCancelText))
            btnCancelText = "Cancelar";

        if (Util.IsNullOrEmpty(title))
            title = "";

        if (Util.IsNullOrEmpty(message))
            message = "Mensagem";

        // Generate Dialog unique ID (in multiple messages is necessary)
        var dialogID = "dialogConfirm_" + this.GenerateUUID();

        // Jquery UI Dialog
        $('<div id="' + dialogID + '" style="z-index: 2000" title="' + title + '"></div>').dialog({
            modal: true,
            open: function () {
                $('.ui-widget-overlay').addClass('custom-overlay');
                $(this).addClass(cssClass);
                $(this).html('<p>' + message + '</p>');
            },
            buttons: [
                {
                    text: btnOKText,
                    open: function () {
                        $(this).addClass(cssClass);
                    },
                    click: function () {
                        if (btnOkCallback)
                            $(this).on("dialogclose", btnOkCallback);

                        $(this).dialog("close");
                        $("#" + dialogID).remove();
                    }
                },
                {
                    text: btnCancelText,
                    open: function () {
                        $(this).addClass(cssClass);
                    },
                    click: function () {
                        if (btnCancelCallback)
                            $(this).on("dialogclose", btnCancelCallback);

                        $(this).dialog("close");
                        $("#" + dialogID).remove();
                    }
                }
            ]

            //buttons: {

            //    btnOKText: function () {
            //        if (btnOkCallback)
            //            $(this).on("dialogclose", btnOkCallback);

            //        $(this).dialog("close");
            //        $("#dlgConfirm").remove();
            //    },
            //    btnCancelText: function () {
            //        if (btnCancelCallback)
            //            $(this).on("dialogclose", btnCancelCallback);

            //        $(this).dialog("close");
            //        $("#dlgConfirm").remove();
            //    }
            //}
        });
    };

    // --------------------------------------------
    // ShowLoading   ...@i
    //--------------------------------------------

    this.AppendLoading = function () {

        if ($('#customLoader').length <= 0) {

            var div = "<div id='customLoader' style='transform: translateZ(0); z-index:3000;position:fixed; background-color:rgba(216,216,216, 0.7);width:100%;height:100%;text-align: center;top: 0;left: 0;'><div class='preloader-wrapper big active' style='top:47%;'>" +
                "<div class='spinner-layer spinner-blue-only'>" +
                "<div class=1circle-clipper left1>" +
                "<div class='circle'></div>" +
                " </div><div class='gap-patch'>" +
                "<div class='circle'></div>" +
                "</div><div class='circle-clipper right'>" +
                "<div class='circle'></div>" +
                "</div>" +
                "</div>" +
                "</div></div>";

            $('body').append(div);
        }
    };

    this.ShowLoading = function () {

        if ($('#customLoader').length <= 0) {

            Util.AppendLoading();
        }

        Util.counterLoadings++;

        if (Util.counterLoadings == 1) {
            setTimeout(function () {
                $('#customLoader').show(0);
            }, 0);
        }
    };

    this.HideLoading = function () {

        if (Util.counterLoadings > 0)
            Util.counterLoadings--;

        if (Util.counterLoadings == 0) {
            setTimeout(function () {
                $('#customLoader').hide();
            }, 700);
        }
    };

    this.ForceHideLoading = function () {
        Util.counterLoadings = 0;
        $('#customLoader').remove();
    };

    //--------------------------------------------
    // Helpers   ...@i
    //--------------------------------------------

    this.IsNullOrEmpty = function (value) {

        if (value != null && value != undefined) {

            if ($.type(value) === "string")
                return (!value || 0 === value.length);

            return false;
        }

        return true;
    };

    this.LeftPad = function (value, size) {
        var s = String(value);
        while (s.length < (size || 2)) { s = "0" + s; }
        return s;
    };

    this.GroupBy = function (array, f) {
        var groups = {};

        array.forEach(function (o) {
            var group = f(o);

            groups[group] = groups[group] || [];
            groups[group].push(o);
        });

        return Object.keys(groups).map(function (group) {
            return groups[group];
        });
    };

    //--------------------------------------------
    // Format   ...@i
    //--------------------------------------------

    this.FormatCurrency = function (value, str_cifrao) {

        if (Util.IsNullOrEmpty(value))
            value = 0;

        try {
            return str_cifrao + ' ' + parseFloat(value).formatMoney(2, ',', '.');
        }
        catch (ex) {
            try {
                return str_cifrao + ' ' + parseFloat(value()).formatMoney(2, ',', '.');
            }
            catch (ex) {
                var error = ex;
            }
        }
    };

    Number.prototype.formatMoney = function (c, d, t) {
        var n = this,
            c = isNaN(c = Math.abs(c)) ? 2 : c,
            d = d == undefined ? "." : d,
            t = t == undefined ? "," : t,
            s = n < 0 ? "-" : "",
            i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
            j = (j = i.length) > 3 ? j % 3 : 0;
        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    };

    this.FormatDecimal = function (value, precision) {
        if (value) {
            return value.formatMoney(precision, ',', '.');
        } else {
            return '0,00';
        }
    };

    this.FormatPercent = function (value) {
        if (Util.IsNullOrEmpty(value))
            value = 0;

        return parseFloat(value).toFixed(2) + "%";
    };

    this.Format2decimals = function (value) {
        if ($.isNumeric(value))
            return parseFloat(value).toFixed(2);
        else
            return parseFloat(0).toFixed(2);
    };


    //--------------------------------------------
    // Combobox - Multiselect   ...@i
    //--------------------------------------------

    this.KOComboBoxSelectAll = function (koObsListValues, valueAttribute, koObsListSelectedItems, selectListRefresh) {

        if (Util.IsNullOrEmpty(koObsListValues))
            return;

        // get all list values
        var values = koObsListValues();

        // clear all selected items value
        koObsListSelectedItems([]);

        // Add all "ids" from Values to selected
        for (i = 0; i < values.length; i++)
            koObsListSelectedItems.push(values[i][valueAttribute]);

        // KO Defer
        Util.KoForceUpdate();

        // Refresh Materialize select
        if (!Util.IsNullOrEmpty(selectListRefresh))
            Util.RefreshMaterializeSelect(selectListRefresh);
    };

    this.KOComboBoxUnSelectAll = function (koObsListSelectedItems, selectListRefresh) {

        // clear all selected items value
        koObsListSelectedItems([]);

        // KO Defer
        Util.KoForceUpdate();

        // Refresh Materialize select
        if (!Util.IsNullOrEmpty(selectListRefresh))
            Util.RefreshMaterializeSelect(selectListRefresh);
    };

    //--------------------------------------------
    // Date   ...@i
    //--------------------------------------------

    this.StringToDate = function (stringDate) {

        if (Util.IsNullOrEmpty(stringDate))
            return null;

        // Try Convert - pt-BR Format
        var momentDate = moment(stringDate, 'DD/MM/YYYY');

        // If not valid - Try Convert
        if (!momentDate._isValid)
            momentDate = moment(stringDate);

        if (momentDate._isValid)
            return momentDate.format('YYYY-MM-DD');

        return null;
    };

    this.DateToString = function (date) {

        // Try Convert - pt-BR Format
        var momentDate = moment(date);

        if (momentDate._isValid)
            return momentDate.format('DD/MM/YYYY');

        return null;
    };

    this.DateMoneyString = function (value) {
        if (value == null) {
            return null;
        }

        value = Util.FormatDecimal(value, 2);

        return 'R$ ' + value;
    };

    this.DateTimeToString = function (date) {

        // Try Convert - pt-BR Format
        var momentDate = moment(date);

        if (momentDate._isValid)
            return momentDate.format('DD/MM/YYYY HH:MM');

        return null;
    };

    this.KODateToString = function (koObs) {

        // Try Convert - pt-BR Format
        var momentDate = moment(koObs());

        if (momentDate._isValid)
            koObs(momentDate.format('DD/MM/YYYY'));
    };

    this.DateSubtract = function (date, days) {

        var momentDate = moment();
        if (!Util.IsNullOrEmpty(date))
            momentDate = moment(date);

        if (momentDate._isValid)
            return momentDate.subtract('days', days);
        else
            return date;
    };

    this.DateToday = function () {

        return moment();
    };


    //--------------------------------------------
    // Boolean   ...@i
    //--------------------------------------------

    this.BoolToInt = function (value) {

        if (value)
            return 1;
        else
            return 0;
    };

    //--------------------------------------------
    // Materialize   ...@i
    //--------------------------------------------

    this.RefreshMaterialize = function () {

        if (Util.bypassRefresh)
            return;

        if ($('select').material_select)
            $('select').material_select();

        try {
            Materialize.updateTextFields();
        }
        catch (ex) { }
    };

    this.RefreshMaterializeSelect = function (selectIdList) {

        if (Util.bypassRefresh)
            return;

        for (i = 0; i < selectIdList.length; i++) {
            if ($('#' + selectIdList[i]).material_select)
                $('#' + selectIdList[i]).material_select();
        }
    };

    //--------------------------------------------
    // Datatable   ...@i
    //--------------------------------------------

    // DataTable With Pagination
    this.DataTableWithPagination = function (tableId, ajax, columnDef, columns, pageLength) {
        var datatable = $('#' + tableId).DataTable({
            "ordering": false,
            "paging": true,
            "info": true,
            "searching": true,
            "bFilter": false,
            "bPaginate": false,
            "autoWidth": false,
            "proccessing": true, processing: true,
            "pageLength": pageLength,
            "lengthChange": false,
            "ajax": ajax,
            "language": {
                "url": "//cdn.datatables.net/plug-ins/1.10.19/i18n/Portuguese-Brasil.json"
            },
            "buttons": [],
            "columnDefs": columnDef,
            "columns": columns
        });

        return datatable;
    };

    // DataTable With Pagination
    this.DataTableWithPaginationJs = function (tableId, jsData, columnDef, columns, pageLength) {
        var datatable = $('#' + tableId).DataTable({
            "scrollX": true,
            "destroy": true,
            "ordering": false,
            "paging": true,
            "info": true,
            "searching": false,
            "bFilter": false,
            "bPaginate": false,
            "autoWidth": false,
            "lengthChange": false,
            "proccessing": true, processing: true,
            "pageLength": pageLength,
            "data": jsData,
            "language": {
                "url": "//cdn.datatables.net/plug-ins/1.10.19/i18n/Portuguese-Brasil.json"
            },
            "buttons": [],
            "columnDefs": columnDef,
            "columns": columns
        });

        return datatable;
    };

    // Server Side Source
    this.DataTableServerSide = function (tableId, ajax, columnDef, columns, drawCallBack, createRowCallBack, scrollY) {

        var datatable = $('#' + tableId).DataTable({
            "scrollY": !Util.IsNullOrEmpty(scrollY) ? "58vh" : null,
            scrollY: !Util.IsNullOrEmpty(scrollY) ? "58vh" : null,
            "scrollCollapse": !Util.IsNullOrEmpty(scrollY),
            scrollCollapse: !Util.IsNullOrEmpty(scrollY),
            "ordering": false,
            "info": false,
            "searching": false,
            "bFilter": false,
            "bPaginate": false,
            "bLengthChange": false,
            "autoWidth": false,
            "proccessing": true, processing: true,
            "serverSide": true, serverSide: true,
            "ajax": ajax,
            "language": {
                "search": "",
                "searchPlaceholder": "Search...",
                sProcessing: "<div style='z-index:1000;position:fixed; background-color:rgba(216,216,216, 0.9);width:100%;height:100%;text-align: center;top: 0;left: 0;'><div class='preloader-wrapper big active' style='top:47%;'>" +
                    "<div class='spinner-layer spinner-blue-only'>" +
                    "<div class=1circle-clipper left1>" +
                    "<div class='circle'></div>" +
                    " </div><div class='gap-patch'>" +
                    "<div class='circle'></div>" +
                    "</div><div class='circle-clipper right'>" +
                    "<div class='circle'></div>" +
                    "</div>" +
                    "</div>" +
                    "</div></div>"
            },
            //"order": [[1, "asc"]],
            "buttons": [],
            "columnDefs": columnDef,
            "columns": columns,
            "drawCallback": drawCallBack,
            "createdRow": createRowCallBack
        });

        return datatable;
    };

    this.DataTableServerSidePagination = function (tableId, ajax, columnDef, columns, pageLength, scrollX, drawCallBack, createRowCallBack) {

        var datatable = $('#' + tableId).DataTable({
            "scrollX": (!Util.IsNullOrEmpty(scrollX) && scrollX == true) ? "100%" : null,
            scrollX: (!Util.IsNullOrEmpty(scrollX) && scrollX == true) ? "100%" : null,
            "scrollY": null,
            scrollY: null,
            "scrollCollapse": false,
            scrollCollapse: false,
            "ordering": false,
            "paging": true,
            "pageLength": pageLength,
            "info": false,
            "searching": false,
            "bFilter": false,
            "bPaginate": true,
            "bLengthChange": true,
            "autoWidth": false,
            "proccessing": true, processing: true,
            "serverSide": true, serverSide: true,
            "ajax": ajax,
            "language": {
                "paginate": {
                    "previous": "Anterior",
                    "next": "Próxima"
                },
                "emptyTable": "Não existem resultados a serem exibidos",
                "search": "",
                "searchPlaceholder": "Search...",
                sProcessing: "<div style='z-index:1000;position:fixed; background-color:rgba(216,216,216, 0.9);width:100%;height:100%;text-align: center;top: 0;left: 0;'><div class='preloader-wrapper big active' style='top:47%;'>" +
                    "<div class='spinner-layer spinner-blue-only'>" +
                    "<div class=1circle-clipper left1>" +
                    "<div class='circle'></div>" +
                    " </div><div class='gap-patch'>" +
                    "<div class='circle'></div>" +
                    "</div><div class='circle-clipper right'>" +
                    "<div class='circle'></div>" +
                    "</div>" +
                    "</div>" +
                    "</div></div>"
            },
            //"order": [[1, "asc"]],
            "buttons": [],
            "columnDefs": columnDef,
            "columns": columns,
            "drawCallback": drawCallBack,
            "createdRow": createRowCallBack
        });

        return datatable;
    };

    this.DatatableServerSideRefresh = function (formID, datatable) {

        if (!Util.IsNullOrEmpty(formID))
            Util.ClearFormValidation(formID);

        if (!Util.IsNullOrEmpty(datatable)) {
            datatable.ajax.reload();
        }

    };

    // JS Source - Grouped Mode
    this.DataTableJsGrouped = function (tableId, jsData, columnDef, columns, columnIndexGroup) {

        var datatable = $('#' + tableId).DataTable({
            "scrollY": "58vh", scrollY: "58vh",
            "scrollCollapse": true, scrollCollapse: true,
            "ordering": false,
            "paging": false,
            "info": false,
            "searching": false,
            "bFilter": false,
            "bPaginate": false,
            "autoWidth": false,
            "proccessing": true, processing: true,
            "data": jsData,
            "language": {
                "search": "",
                "searchPlaceholder": "Search...",
                sProcessing: "<div style='z-index:1000;position:fixed; background-color:rgba(216,216,216, 0.9);width:100%;height:100%;text-align: center;top: 0;left: 0;'><div class='preloader-wrapper big active' style='top:47%;'>" +
                    "<div class='spinner-layer spinner-blue-only'>" +
                    "<div class=1circle-clipper left1>" +
                    "<div class='circle'></div>" +
                    " </div><div class='gap-patch'>" +
                    "<div class='circle'></div>" +
                    "</div><div class='circle-clipper right'>" +
                    "<div class='circle'></div>" +
                    "</div>" +
                    "</div>" +
                    "</div></div>"
            },
            "order": [[1, "asc"]],
            "buttons": [],
            "columnDefs": columnDef,
            "columns": columns,
            "drawCallback": function (settings) {

                var api = this.api();
                var rows = api.rows({ page: 'current' }).nodes();
                var last = null;

                api.column(columnIndexGroup, { page: 'current' }).data().each(function (group, i) {
                    if (last !== group) {
                        $(rows).eq(i).before(
                            '<tr class="group"><td colspan="6">' + group + '</td></tr>'
                        );

                        last = group;
                    }
                });
            },

        });

        return datatable;
    };

    // JS Source
    this.DataTableJs = function (tableId, jsData, columnDef, columns, drawCallBack) {

        var datatable = $('#' + tableId).DataTable({
            "scrollX": "100%",
            scrollX: "100%",
            "scrollY": null,
            scrollY: null,
            "scrollCollapse": true, scrollCollapse: true,
            "ordering": false,
            "paging": false,
            "info": false,
            "searching": false,
            "bFilter": false,
            "bPaginate": false,
            "autoWidth": false,
            "proccessing": true, processing: true,
            "data": jsData,
            select: true,
            "language": {
                "paginate": {
                    "previous": "Anterior",
                    "next": "Próxima"
                },
                "emptyTable": "Não existem resultados a serem exibidos",
                "search": "",
                "searchPlaceholder": "Search...",
                sProcessing: "<div style='z-index:1000;position:fixed; background-color:rgba(216,216,216, 0.9);width:100%;height:100%;text-align: center;top: 0;left: 0;'><div class='preloader-wrapper big active' style='top:47%;'>" +
                    "<div class='spinner-layer spinner-blue-only'>" +
                    "<div class=1circle-clipper left1>" +
                    "<div class='circle'></div>" +
                    " </div><div class='gap-patch'>" +
                    "<div class='circle'></div>" +
                    "</div><div class='circle-clipper right'>" +
                    "<div class='circle'></div>" +
                    "</div>" +
                    "</div>" +
                    "</div></div>"
            },
            "order": [[1, "asc"]],
            "buttons": [],
            "columnDefs": columnDef,
            "columns": columns,
            "drawCallback": drawCallBack,
        });

        return datatable;
    };

    this.DatatableAdjustColumns = function (id) {
        var api = $('#' + id).dataTable().api();
        api.columns.adjust();
        api.draw(false);
        return;
    };

    //--------------------------------------------
    // Combobox   ...@i
    //--------------------------------------------

    this.GetComboList = function (url, koObsToPopulate, KoObsSelectItem, selectedItem, data,
        doneCallback, errorCallback,
        selectFirstIfNoneSelected, selectFirstAttributeName) {

        Util.ShowLoading();

        $.ajax({
            type: 'POST',
            url: url,
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        })
            .done(function (result) {

                var selectedItemFounded = true;

                if (!Util.ValidateAjaxResult(result)) {
                    koObsToPopulate([]);

                    if (!Util.IsNullOrEmpty(errorCallback))
                        errorCallback();
                }
                else {
                    if (!Util.IsNullOrEmpty(result.Data.DescriptionValue)) {
                        // If Condition = Used when Controller method returned object type = DescriptionValueWithDefault
                        // The object contains default selected value 
                        koObsToPopulate(result.Data.DescriptionValue);
                        let selectedValue;
                        let existInList = true;

                        if (ko.isObservable(selectedItem))
                            selectedValue = selectedItem();
                        else if (!Util.IsNullOrEmpty(selectedItem))
                            selectedValue = selectedItem;

                        if (!Util.IsNullOrEmpty(selectedValue) &&
                            !result.Data.DescriptionValue.find(function (element) { return element.Value == selectedValue; })) {
                            existInList = false;
                        }

                        if (!Util.IsNullOrEmpty(result.Data.ValueDefault) &&
                            (Util.IsNullOrEmpty(selectedValue) ||
                                !existInList)
                        ) {
                            selectedItem = result.Data.ValueDefault;
                            selectedItemFounded = false;
                        } else if (Util.IsNullOrEmpty(result.Data.ValueDefault) && !existInList) {
                            selectedItem = result.Data.DescriptionValue[0].Value;
                            selectedItemFounded = false;
                        }

                        if (!Util.IsNullOrEmpty(KoObsSelectItem) && !Util.IsNullOrEmpty(selectedItem))
                            KoObsSelectItem(selectedItem);
                    }
                    else {
                        koObsToPopulate(result.Data);

                        // Rules to select first element (start)                        
                        if (result.Data.length > 0 && !Util.IsNullOrEmpty(selectFirstAttributeName)) {
                            if (!Util.IsNullOrEmpty(selectFirstIfNoneSelected)) {
                                if (selectFirstIfNoneSelected == true) {
                                    if (Util.IsNullOrEmpty(selectedItem))
                                        selectedItem = result.Data[0][selectFirstAttributeName];
                                }
                                else {
                                    selectedItem = result.Data[0][selectFirstAttributeName];
                                }
                            }
                        }
                        // Rules to select first element (end)

                        if (!Util.IsNullOrEmpty(KoObsSelectItem) && !Util.IsNullOrEmpty(selectedItem))
                            KoObsSelectItem(selectedItem);
                    }
                }

                if (!Util.IsNullOrEmpty(doneCallback))
                    doneCallback(selectedItemFounded);

                Util.KoForceUpdate();
                Util.RefreshMaterialize();
                Util.HideLoading();
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                Util.HideLoading();

                if (!Util.IsNullOrEmpty(errorCallback))
                    errorCallback();

                Util.ShowErrorMessage(Util.BuildAjaxFailMessage(jqXHR, textStatus, errorThrown));
            });
    };
    this.GetComboListGet = function (url, koObsToPopulate, KoObsSelectItem, selectedItem,
        doneCallback, errorCallback,
        selectFirstIfNoneSelected, selectFirstAttributeName) {

        Util.ShowLoading();

        $.ajax({
            type: 'GET',
            url: url,
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        })
            .done(function (result) {
                var selectedItemFounded = true;
                if (!Util.ValidateAjaxResult(result)) {
                    koObsToPopulate([]);

                    if (!Util.IsNullOrEmpty(errorCallback))
                        errorCallback();
                }
                else {
                    if (!Util.IsNullOrEmpty(result.Data.DescriptionValue)) {
                        // If Condition = Used when Controller method returned object type = DescriptionValueWithDefault
                        // The object contains default selected value 
                        koObsToPopulate(result.Data.DescriptionValue);
                        let selectedValue;
                        let existInList = true;

                        if (ko.isObservable(selectedItem))
                            selectedValue = selectedItem();
                        else if (!Util.IsNullOrEmpty(selectedItem))
                            selectedValue = selectedItem;

                        if (!Util.IsNullOrEmpty(selectedValue) &&
                            !result.Data.DescriptionValue.find(function (element) { return element.Value == selectedValue; })) {
                            existInList = false;
                        }

                        if (!Util.IsNullOrEmpty(result.Data.ValueDefault) &&
                            (Util.IsNullOrEmpty(selectedValue) ||
                                !existInList)
                        ) {
                            selectedItem = result.Data.ValueDefault;
                            selectedItemFounded = false;
                        } else if (Util.IsNullOrEmpty(result.Data.ValueDefault) && !existInList) {
                            selectedItem = result.Data.DescriptionValue[0].Value;
                            selectedItemFounded = false;
                        }

                        if (!Util.IsNullOrEmpty(KoObsSelectItem) && !Util.IsNullOrEmpty(selectedItem))
                            KoObsSelectItem(selectedItem);
                    }
                    else {
                        koObsToPopulate(result.Data);

                        // Rules to select first element (start)                        
                        if (result.Data.length > 0 && !Util.IsNullOrEmpty(selectFirstAttributeName)) {
                            if (!Util.IsNullOrEmpty(selectFirstIfNoneSelected)) {
                                if (selectFirstIfNoneSelected == true) {
                                    if (Util.IsNullOrEmpty(selectedItem))
                                        selectedItem = result.Data[0][selectFirstAttributeName];
                                }
                                else {
                                    selectedItem = result.Data[0][selectFirstAttributeName];
                                }
                            }
                        }
                        // Rules to select first element (end)

                        if (!Util.IsNullOrEmpty(KoObsSelectItem) && !Util.IsNullOrEmpty(selectedItem))
                            KoObsSelectItem(selectedItem);
                    }
                }

                if (!Util.IsNullOrEmpty(doneCallback))
                    doneCallback(selectedItemFounded);

                Util.KoForceUpdate();
                Util.RefreshMaterialize();
                Util.HideLoading();
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                Util.HideLoading();

                if (!Util.IsNullOrEmpty(errorCallback))
                    errorCallback();

                Util.ShowErrorMessage(Util.BuildAjaxFailMessage(jqXHR, textStatus, errorThrown));
            });
    };

    //--------------------------------------------
    // Print   ...@i
    //--------------------------------------------  

    this.Print = function (content) {
        var mywindow = window.open('', 'PRINT', 'height=800,width=600');

        //mywindow.document.write('<html><head><title>' + document.title + '</title>');
        //mywindow.document.write('</head><body >');
        //mywindow.document.write('<h1>' + document.title + '</h1>');
        //mywindow.document.write(document.getElementById(elem).innerHTML);
        //mywindow.document.write('</body></html>');

        mywindow.document.write(content);
        mywindow.document.close(); // necessary for IE >= 10
        mywindow.focus(); // necessary for IE >= 10*/

        mywindow.print();
        mywindow.close();

        return true;
    };


    //--------------------------------------------
    // CALL API   ...@i
    //--------------------------------------------  

    this.PostApi = function (url, data, doneCallback, errorCallback, async, callErrorCallBackOnResultFalse) {
        Util.ShowLoading();

        $.ajax({
            type: 'POST',
            url: url,
            data: JSON.stringify(data),
            async: Util.IsNullOrEmpty(async) || async,
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        })
            .done(function (result) {

                if (Util.ValidateAjaxResult(result)) {
                    if (doneCallback) {
                        doneCallback(result);
                    }
                } else if (!Util.IsNullOrEmpty(callErrorCallBackOnResultFalse) || callErrorCallBackOnResultFalse == undefined) {

                    if (!Util.IsNullOrEmpty(errorCallback))
                        errorCallback(result);
                }

                Util.HideLoading();
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                Util.HideLoading();

                if (!Util.IsNullOrEmpty(errorCallback))
                    errorCallback();

                Util.ShowErrorMessage(Util.BuildAjaxFailMessage(jqXHR, textStatus, errorThrown));
            });

    };
    this.PostApiStealth = function (url, data, doneCallback, errorCallback, async, callErrorCallBackOnResultFalse) {

        $.ajax({
            type: 'POST',
            url: url,
            data: JSON.stringify(data),
            async: Util.IsNullOrEmpty(async) || async,
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        })
            .done(function (result) {

                if (Util.ValidateAjaxResult(result)) {

                    if (doneCallback) {
                        doneCallback(result);
                    }
                } else if (!Util.IsNullOrEmpty(callErrorCallBackOnResultFalse)) {

                    if (!Util.IsNullOrEmpty(errorCallback))
                        errorCallback(result);
                }

            })
            .fail(function (jqXHR, textStatus, errorThrown) {

                if (!Util.IsNullOrEmpty(errorCallback))
                    errorCallback();

                Util.ShowErrorMessage(Util.BuildAjaxFailMessage(jqXHR, textStatus, errorThrown));
            });

    };

    this.PostApiWithoutParseData = function (url, data, doneCallback, errorCallback) {
        Util.ShowLoading();

        $.ajax({
            type: 'POST',
            url: url,
            data: data,
            dataType: "json"
        })
            .done(function (result) {

                if (Util.ValidateAjaxResult(result)) {

                    if (doneCallback)
                        doneCallback(result.Data);
                } else {
                    if (errorCallback)
                        errorCallback();
                }

                Util.HideLoading();
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                Util.HideLoading();

                if (errorCallback)
                    errorCallback();

                Util.ShowErrorMessage(Util.BuildAjaxFailMessage(jqXHR, textStatus, errorThrown));
            });
    };

    this.GetValue = function (url, data, callbackReturnValue, errorCallback) {
        return this.GetValue(url, data, callbackReturnValue, errorCallback, true)
    };



    this.GetValue = function (url, data, callbackReturnValue, errorCallback, showLoading) {

        if (showLoading) {
            Util.ShowLoading();
        }


        $.ajax({
            type: 'POST',
            url: url,
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        })
            .done(function (result) {
                if (Util.ValidateAjaxResult(result)) {
                    if (callbackReturnValue)
                        callbackReturnValue(result.Data);
                }
                else {

                    if (!Util.IsNullOrEmpty(errorCallback)) {
                        errorCallback();
                    }

                }
                if (showLoading) {
                    Util.HideLoading();
                }
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                if (showLoading) {
                    Util.HideLoading();
                }
                if (!Util.IsNullOrEmpty(errorCallback)) {
                    errorCallback();
                }


                Util.ShowErrorMessage(Util.BuildAjaxFailMessage(jqXHR, textStatus, errorThrown));
            });
    };

};

//--------------------------------------------
// SAMPLES   ...@i
//--------------------------------------------

// MODAL

//$('.modal').modal({
//    dismissible: true, // Modal can be dismissed by clicking outside of the modal
//    opacity: .5, // Opacity of modal background
//    inDuration: 300, // Transition in duration
//    outDuration: 200, // Transition out duration
//    startingTop: '4%', // Starting top style attribute
//    endingTop: '10%', // Ending top style attribute
//    ready: function (modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
//        alert("Ready");
//        console.log(modal, trigger);
//    },
//    complete: function () { alert('Closed'); } // Callback for Modal close
//}