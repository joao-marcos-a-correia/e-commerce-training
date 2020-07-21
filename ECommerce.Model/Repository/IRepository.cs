using System;
using System.Collections.Generic;
using System.Text;

namespace ECommerce.Model.Repository
{
    public interface IRepository<T> : IReadOnlyRepository<T>, IBaseRepository
    {
        void Update(T entity);
        void Insert(T entity);
    }
}
