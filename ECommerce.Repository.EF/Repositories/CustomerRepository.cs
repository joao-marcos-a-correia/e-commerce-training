using AutoMapper;
using ECommerce.Model.Domain.Customer;
using ECommerce.Model.Repository;
using ECommerce.Repository.EF.DBContext;
using System;
using System.Collections.Generic;
using System.Text;

namespace ECommerce.Repository.EF.Repositories
{
    public class CustomerRepository : BaseRepository, ICustomerRepository
    {
        public CustomerRepository(DbContextCommerce dBContext) : base(dBContext) { }


        #region not implemented methods

        public void Insert(Customer entity)
        {
            throw new NotImplementedException();
        }

        public Customer Get(IDictionary<string, object> keys)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Customer> List(IDictionary<string, object> keys)
        {
            throw new NotImplementedException();
        }

        public void Update(Customer entity)
        {
            throw new NotImplementedException();
        }
        #endregion
    }
}
