using System;
using System.Collections.Generic;
using System.Text;

namespace ECommerce.Model.Repository
{
    public interface IReadOnlyRepository<T>
    {
        IEnumerable<T> List(IDictionary<string, object> keys);
        T Get(IDictionary<string, object> keys);
    }
}
