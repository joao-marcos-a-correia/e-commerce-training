using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ECommerce.WEB.Models;
using ECommerce.Service.DTOs;
using Newtonsoft.Json;
using ECommerce.Service.Interfaces;
using ECommerce.Repository.EF.DBContext;

namespace ECommerce.WEB.Controllers
{
    public class HomeController : BaseController
    {
        private IUserLoginService _userloginService;

        public HomeController(
            IUserLoginService userLoginService
        )
        {
            this._userloginService = userLoginService;
        }
        public IActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public JsonResult GetUserLogin([FromBody] dynamic postData)
        {
            ResponseBase result;
            string userEmail = postData.Name.ToString();
            string userPass = postData.Pass.ToString();

            result = _userloginService.CheckUserCredentials(userEmail.ToString(), userPass.ToString()); 
            return buildJsonResult(result);
        }
    }
}
