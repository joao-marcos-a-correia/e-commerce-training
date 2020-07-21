using ECommerce.Model.Domain.User;
using ECommerce.Service.DTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace ECommerce.Service.Interfaces
{
    public interface IRegisterNewUserService
    {
        ResponseBase<User> InsertNewUser(string name, string email, string password);
    }
}
