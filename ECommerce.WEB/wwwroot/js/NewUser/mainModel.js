function MainModel(model) {
    var self = this;


    self.NameUser = ko.observable();
    self.EmailUser = ko.observable();
    self.PasswordUser = ko.observable();

    self.OnClickNewUser = function () {
        if (Util.IsNullOrEmpty(self.NameUser())) {
            Util.ShowErrorMessage('Nome Obrigatorio')
            return;
        };
        if (Util.IsNullOrEmpty(self.EmailUser())) {
            Util.ShowErrorMessage('Email Obrigatorio')
            return;
        };
        if (Util.IsNullOrEmpty(self.PasswordUser())) {
            Util.ShowErrorMessage('Senha Obrigatoria')
            return;
        };
        var data = {
            Name: self.NameUser(),
            Email: self.EmailUser(),
            Password: self.PasswordUser()
        };

        try {
            Util.PostApi("../NewUser/RegisterNewUser", data, self.HandlerSuccessCallback, self.HandlerErrorCallback, true, true);
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
        Util.ShowSuccessMessage('Usuario Inserido com Sucesso');
        setTimeout(function () { window.location.href = "../Home/Index"; }, 3000)
    };

};