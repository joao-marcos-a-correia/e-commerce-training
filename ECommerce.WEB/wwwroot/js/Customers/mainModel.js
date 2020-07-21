function MainModel(model) {
    var self = this;

    //Constructor
    function Customer(cidcustomer, ccustomername, xcustomertype, lenabled) {
            this.cIdCustomer = cidcustomer,
            this.cCustomerName = ccustomername,
            this.xCustomerType = xcustomertype,
            this.lEnabled = lenabled
    };

    //Lists
    self.customerList = ko.observableArray();

    self.AddNewCustomer = function () {
        window.location.href = "../NewCustomer/NewCustomer";
    };


    self.ListAllCustomers = function () {
        try {
            Util.PostApi("../Customers/ListCustomerByAPI", null, self.doneCallBack, self.HandleErrorCallBack, true, true);
        } catch (err) {
            responseBase = {
                Sucess: false,
                Message: err.Message
            }
            self.HandleErrorCallback(responseBase);
        }
    };

    self.doneCallBack = function (result) {
        self.customerList([]);

        //const list = result.data.map((client) => {
        //    self.customerList.push(client);
        //});

        const list = result.data.map((client) => {
            self.customerList.push(
                new Customer(
                    client.cIdCustomer,
                    client.cCustomerName,
                    client.xCustomerType,
                    client.lEnabled
                ));
        });
    };

    self.HandleErrorCallBack = function (result) {
        if (result != undefined) {
            Util.ShowErrorMessage(result);
        }
    };
}

