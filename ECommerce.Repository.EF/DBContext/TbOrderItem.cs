using System;
using System.Collections.Generic;

namespace ECommerce.Repository.EF.DBContext
{
    public partial class TbOrderItem
    {
        public int CIdorder { get; set; }
        public string CIdproduct { get; set; }
        public int NAmount { get; set; }
        public decimal NUnitValue { get; set; }
        public decimal NTotalValue { get; set; }
        public byte? LEnabled { get; set; }

        public virtual TbOrder CIdorderNavigation { get; set; }
        public virtual TbProduct CIdproductNavigation { get; set; }
    }
}
