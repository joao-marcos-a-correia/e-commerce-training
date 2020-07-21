using System;
using System.Collections.Generic;
using System.Text;

namespace ECommerce.Model.Repository
{
    public interface IBaseRepository
    {
        void SaveChanges();
        void Reset();
    }
}
