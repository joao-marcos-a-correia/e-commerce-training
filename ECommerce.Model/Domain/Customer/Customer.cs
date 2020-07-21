using System;
using System.Collections.Generic;
using System.Text;

namespace ECommerce.Model.Domain.Customer
{
    public class Customer
    {
        public string CIdCustomer { get; set; }
        public string CCustomerName  { get; set; }
        public string xCustomerType { get; set; }
        public byte lEnabled { get; set; }
    }
}
