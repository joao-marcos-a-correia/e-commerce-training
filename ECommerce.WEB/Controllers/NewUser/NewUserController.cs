using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ECommerce.Service.DTOs;
using ECommerce.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace ECommerce.WEB.Controllers.NewUser
{
    public class NewUserController : BaseController
    {
        private IRegisterNewUserService _registerNewUserService;

        public NewUserController(IRegisterNewUserService registerNewUserService)
        {
            this._registerNewUserService = registerNewUserService;
        }
        public IActionResult NewUser()
        {
            return View();
        }

        [HttpPost]
        public JsonResult RegisterNewUser([FromBody] dynamic postData)
        {
            ResponseBase response = new ResponseBase();

            string nameUser = postData.Name.ToString();
            string emailUser = postData.Email.ToString();
            string passwordUser = postData.Password.ToString();

            _registerNewUserService.InsertNewUser(nameUser, emailUser, passwordUser);
            return buildJsonResult(response);

        }
    }
}