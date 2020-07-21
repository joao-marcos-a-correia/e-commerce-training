using ECommerce.Model.Domain.User;
using System;
using System.Collections.Generic;
using System.Text;

namespace ECommerce.Model.Repository
{
    public interface IUserLoginRepository : IRepository<User>
    {
        User GetUserByEmailAndPassword(string email, string password);
    }
}
