using System;
using System.Collections.Generic;

namespace ECommerce.Repository.EF.DBContext
{
    public partial class TbCustomer
    {
        public TbCustomer()
        {
            TbOrder = new HashSet<TbOrder>();
        }

        public string CIdcustomer { get; set; }
        public string CCustomerName { get; set; }
        public string XCustomerType { get; set; }
        public byte? LEnabled { get; set; }

        public virtual ICollection<TbOrder> TbOrder { get; set; }
    }
}
