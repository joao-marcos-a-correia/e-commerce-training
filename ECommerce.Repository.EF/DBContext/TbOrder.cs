using System;
using System.Collections.Generic;

namespace ECommerce.Repository.EF.DBContext
{
    public partial class TbOrder
    {
        public int CIdorder { get; set; }
        public string CIdcustomer { get; set; }
        public DateTime DCreated { get; set; }
        public decimal NTotalValue { get; set; }
        public byte? LEnabled { get; set; }

        public virtual TbCustomer CIdcustomerNavigation { get; set; }
        public virtual TbOrderItem TbOrderItem { get; set; }
    }
}
