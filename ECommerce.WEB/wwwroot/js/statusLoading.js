

var StatusLoading = new function () {

    // --------------------------------------------
    // Variables   ...@i
    // --------------------------------------------

    // *** Constants *** //
    this.STATUS_LOADING_DIV_ID = "statusLoading";
    this.STATUS_LOADING_TITLE_ID = "statusLoadingTitle";
    this.STATUS_LOADING_SUBTITLE_ID = "statusLoadingSubtitle";
    this.STATUS_LOADING_PROGRESS_ID = "statusLoadingProgress";
    this.STATUS_LOADING_UL_STEPS_ID = "statusLoadingUlSteps";

    // *** Others *** //
    this.isVisible = false;
    this.title = "Processamento em execução";
    this.subTitle = "Aguarde alguns minutos pelo término";
    this.btnDoneText = "Ok";
    this.doneCallBack = null;


    // --------------------------------------------
    // Methods   ...@i
    // --------------------------------------------

    this.AppendLoading = function () {

        if ($('#' + StatusLoading.STATUS_LOADING_DIV_ID).length <= 0) {

            var div = "<div id='" + StatusLoading.STATUS_LOADING_DIV_ID + "' style='transform: translateZ(0); z-index:1000;position:fixed; background-color:rgba(216,216,216, 1);width:100%;height:100%;top: 0;left: 0;'>" +
                "<div style='top:2%;position:relative;width:500px;margin:0 auto'>" +
                "<h5 style='color:#0d47a1;text-align: center;' id='" + StatusLoading.STATUS_LOADING_TITLE_ID + "'>" + this.title + "</h5>" +
                "<h6 style='text-align: center;' id='" + StatusLoading.STATUS_LOADING_SUBTITLE_ID + "'>" + this.subTitle + "</h6>" +
                "<div class='progress' id='" + StatusLoading.STATUS_LOADING_PROGRESS_ID + "'><div class='indeterminate'></div></div>" +
                "<div style='background:#FFF; height:350px; overflow:auto'>" +
                "<ul id='" + StatusLoading.STATUS_LOADING_UL_STEPS_ID + "' style='text-align:left; padding:6px'>" +
                "</ul>" +
                "</div><br/>" +
                "<a id='btnDone' class='waves-effect waves-light btn'>" + StatusLoading.btnDoneText + "</a>" +
                "</div>" +
                "</div>";

            $('body').append(div);

            $('#btnDone').click(function () {
                StatusLoading.HideLoading();

                if (StatusLoading.doneCallBack != null && StatusLoading.doneCallBack != undefined)
                    StatusLoading.doneCallBack();
            });

            $('#btnDone').hide();
        }
    };

    this.ShowLoading = function (titleParam, subTitleParam, btnDoneTextParam, doneCallBackParam) {

        if (StatusLoading.isVisible)
            return;

        if (titleParam != null && titleParam != undefined)
            StatusLoading.title = titleParam;

        if (subTitleParam != null && subTitleParam != undefined)
            StatusLoading.subTitle = subTitleParam;

        if (doneCallBackParam != null && doneCallBackParam != undefined)
            StatusLoading.doneCallBack = doneCallBackParam;

        if (btnDoneTextParam != null && btnDoneTextParam != undefined)
            StatusLoading.btnDoneText = btnDoneTextParam;

        if ($('#' + StatusLoading.STATUS_LOADING_DIV_ID).length <= 0)
            StatusLoading.AppendLoading();

        StatusLoading.isVisible = true;
        setTimeout(function () { $('#' + StatusLoading.STATUS_LOADING_DIV_ID).show(0); }, 0);
    };

    this.HideLoading = function () {

        if (StatusLoading.isVisible) {
            StatusLoading.isVisible = false;
            setTimeout(function () {
                $('#' + StatusLoading.STATUS_LOADING_DIV_ID).remove();
            }, 300);
        }
    };

    this.Append = function (text, icon, bgColor, txtColor) {
        
        if (bgColor == null || bgColor == undefined || bgColor == "")
            bgColor = "#e0e0e0";

        if (txtColor == null || txtColor == undefined || txtColor == "")
            txtColor = "#607d8b";

        $("#" + StatusLoading.STATUS_LOADING_UL_STEPS_ID).append("<li style='background-color:" + bgColor + ";color:" + txtColor + ";margin-bottom:2px; padding:4px !important; font-size: 12px'>" + icon + text + "</li>");
    };


    this.AppendStepWarning = function (text) {
        var icon = "<i class='fas fa-exclamation-circle' style='color:#ff8f00; margin-right:5px;'></i>";

        StatusLoading.Append(text, icon);
    };

    this.AppendStepOk = function (text) {
        let icon = "<i class='fas fa-check-circle' style='color:#1b5e20; margin-right:5px;'></i>";

        StatusLoading.Append(text, icon);
    };

    this.AppendStepError = function (text) {
        let icon = "<i class='fas fa-times-circle' style='color:#ff5722; margin-right:5px;'></i>";
        let txtColor = "#ff5722";

        StatusLoading.Append(text, icon, null, txtColor);
    };

    this.AppendStepInfo = function (text) {
        let icon = "<i class='fas fa-info-circle' style='color:#1565c0; margin-right:5px;'></i>";

        StatusLoading.Append(text, icon);
    };

    this.AppendHeader = function (text) {
        let icon = "<i class='fas fa-angle-double-right' style='color:#FFF; margin-right:5px;'></i>";
        let bgColor = "#0d47a1";
        let txtColor = "#FFF";

        StatusLoading.Append(text, icon, bgColor, txtColor);
    };

    this.EndLoading = function () {
        $('#' + StatusLoading.STATUS_LOADING_TITLE_ID).text('Processo finalizado');
        $('#' + StatusLoading.STATUS_LOADING_SUBTITLE_ID).hide();
        $('#' + StatusLoading.STATUS_LOADING_PROGRESS_ID).hide();
        $('#btnDone').show();
    };
}