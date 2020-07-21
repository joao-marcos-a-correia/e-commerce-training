using ECommerce.Model.Domain.User;
using ECommerce.Service.DTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace ECommerce.Service.Interfaces
{
    public interface IUserLoginService
    {
        ResponseBase<User> CheckUserCredentials(string email, string password);
    }
}
