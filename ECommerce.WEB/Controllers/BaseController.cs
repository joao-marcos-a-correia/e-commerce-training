using ECommerce.Service.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.VisualStudio.Web.CodeGeneration.Contracts.Messaging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerce.WEB.Controllers
{
    public class BaseController : Controller
    {
        public BaseController()
        {

        }

        public JsonResult buildJsonResult(object data)
        {
            return new JsonResult(
                data
                );
        }
    }
}
