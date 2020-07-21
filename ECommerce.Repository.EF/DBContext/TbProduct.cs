using System;
using System.Collections.Generic;

namespace ECommerce.Repository.EF.DBContext
{
    public partial class TbProduct
    {
        public TbProduct()
        {
            TbOrderItem = new HashSet<TbOrderItem>();
        }

        public string CIdproduct { get; set; }
        public string CProductName { get; set; }
        public byte? LEnabled { get; set; }

        public virtual ICollection<TbOrderItem> TbOrderItem { get; set; }
    }
}
