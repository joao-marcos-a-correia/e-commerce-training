using ECommerce.Model.Domain.Customer;
using ECommerce.Service.DTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace ECommerce.Service.Interfaces
{
    public interface ICustomerService
    {
        ResponseBase<List<Customer>> ListCustomerByAPI();
        void RegisterNewCustomerByAPI(Customer customer);
    }
}
