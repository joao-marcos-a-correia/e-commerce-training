using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ECommerce.Model.Domain.Customer;
using ECommerce.Service.DTOs;
using ECommerce.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace ECommerce.WEB.Controllers.NewCustomer
{
    public class NewCustomerController : BaseController
    {
        private ICustomerService _customerService;

        public NewCustomerController(ICustomerService customerService)
        {
            this._customerService = customerService;
        }
        public IActionResult NewCustomer()
        {
            return View();
        }

        [HttpPost]
        public JsonResult RegisterNewCustomer([FromBody] Customer postData)
        {
            ResponseBase<Customer> response = new ResponseBase<Customer>();
            _customerService.RegisterNewCustomerByAPI(postData);

            return buildJsonResult(response);
        }
    }
}
