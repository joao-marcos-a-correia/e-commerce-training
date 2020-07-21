function MainModel(model) {
    var self = this;

    self.CustomerName = ko.observable();
    self.CustomerType = ko.observable();

    self.RegisterNewCustomer = function () {
        if (Util.IsNullOrEmpty(self.CustomerName())) {
            Util.ShowErrorMessage("Campo Nome é obrigatorio");
            return;
        }

        if (Util.IsNullOrEmpty(self.CustomerType())) {
            Util.ShowErrorMessage("Tipo de Cliente é obrigatorio");
            return;
        }

        var data = {
            CIdCustomer: "1",
            CCustomerName: self.CustomerName(),
            xCustomerType: self.CustomerType(),
            lEnabled: 1
        };

        try {
            Util.PostApi("../NewCustomer/RegisterNewCustomer", data, self.HandlerSuccessCallback, self.HandlerErrorCallback, true, true);
        }
        catch (err) {
            responseBase = {
                Sucess: false,
                Message: err.message
            };
            self.HandlerErrorCallback(responseBase);
        }
    };

    self.HandlerErrorCallback = function (result) {
        if (result != undefined) {
            Util.ShowErrorMessage(result.message)
        };
    };

    self.HandlerSuccessCallback = function () {
        Util.ShowSuccessMessage('Cliente Inserido com Sucesso');
        setTimeout(function () { window.location.href = "../Customers/Customer"; }, 3000)
    };
};