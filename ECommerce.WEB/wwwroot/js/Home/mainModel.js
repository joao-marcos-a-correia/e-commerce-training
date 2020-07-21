
function MainModel(model) {
    var self = this;

    self.UserEmail = ko.observable();
    self.UserPassword = ko.observable();


    self.OnClickLogin = function () {
        if (Util.IsNullOrEmpty(self.UserEmail())) {
            Util.ShowErrorMessage("Necessario preencher o E-Mail");
            return;
        }

        if (Util.IsNullOrEmpty(self.UserPassword())) {
            Util.ShowErrorMessage("Necessario preencher a Senha");
            return;
        }

        var data = {
            Name: self.UserEmail(),
            Pass: self.UserPassword()
        };

        try {
            Util.PostApi("../Home/GetUserLogin", data, self.HandleSuccessCallback, self.HandleErrorCallback, true, true);
        } catch (err) {
            responseBase = {
                Success: false,
                Message: err.message
            };
            self.HandleErrorCallback(responseBase);
        }
    };
    
    self.RegisterNewUser = function () {
        try {
            window.location.href = "../NewUser/NewUser";
        }
        catch (err) {
            responseBase = {
                Success: false,
                Message: err.message
            }
        }
    };

    self.HandleErrorCallback = function (result) {
        if (result != undefined) {
            Util.ShowErrorMessage(result.message);
        }
    };
    self.HandleSuccessCallback = function () {
        Util.ShowSuccessMessage('Deu tudo certo');
        window.location.href = "../Customers/Customer";
    };
}



















