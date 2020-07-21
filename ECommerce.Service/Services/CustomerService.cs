using ECommerce.Model.Domain.Customer;
using ECommerce.Service.DTOs;
using ECommerce.Service.Interfaces;
using ECommerce.Service.Utils;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;

namespace ECommerce.Service.Services
{
    public class CustomerService : ServiceBase, ICustomerService
    {
        protected override Type ConcreteType => typeof(ICustomerService);

        public ResponseBase<List<Customer>> ListCustomerByAPI()
        {
            ResponseBase<List<Customer>> response = new ResponseBase<List<Customer>>();
            List<Customer> customers = new List<Customer>();

            string uri = "https://localhost:44331/api/Customer/ListCustomers";
            string method = "GET";
            string contentType = "application/json";

            try
            {
                string request = WebRequestUtil.Request(uri, method, contentType);
                customers = JsonConvert.DeserializeObject<List<Customer>>(request);
                response.Data = customers;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message;
            }

            return response;
        }

        public void RegisterNewCustomerByAPI(Customer customer)
        {
            ResponseBase<Customer> response = new ResponseBase<Customer>();

            string uri = "https://localhost:44331/api/Customer/NewCustomer";
            string method = "POST";
            string contentType = "application/json";

            string jsonCustomers = JsonConvert.SerializeObject(customer);

            try
            {
                string request = WebRequestUtil.RequestPost(uri, method, contentType, jsonCustomers);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
