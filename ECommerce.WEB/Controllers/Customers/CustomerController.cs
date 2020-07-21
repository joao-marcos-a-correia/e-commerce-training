using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ECommerce.Service.DTOs;
using ECommerce.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;
using ECommerce.Model.Domain.Customer;

namespace ECommerce.WEB.Controllers.Customers
{
    public class CustomersController : BaseController
    {
        private ICustomerService _customerService;

        public CustomersController(ICustomerService customerService)
        {
            this._customerService = customerService;
        }
        public IActionResult Customer()
        {
            return View();
        }
        [HttpPost]
        public JsonResult ListCustomerByAPI()
        {
            ResponseBase<List<Customer>> response = new ResponseBase<List<Customer>>();

            response = _customerService.ListCustomerByAPI();

            return buildJsonResult(response);
        }
    }
}
