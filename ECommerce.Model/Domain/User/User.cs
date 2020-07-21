using System;
using System.Collections.Generic;
using System.Text;

namespace ECommerce.Model.Domain.User
{
    public class User
    {
        public int CiDUser { get; set; }
        public string CUserName { get; set; }
        public string CPassword { get; set; }
        public string  CEmail { get; set; }
        public byte lEnabled { get; set; }
    }
}
