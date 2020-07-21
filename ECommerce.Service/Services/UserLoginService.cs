using ECommerce.Model.Domain.User;
using ECommerce.Model.Repository;
using ECommerce.Service.DTOs;
using ECommerce.Service.Interfaces;
using ECommerce.Service.Services;
using System;
using System.Collections.Generic;
using System.Text;

namespace ECommerce.Service.Services
{
    public class UserLoginService: ServiceBase, IUserLoginService
    {
        protected override Type ConcreteType => typeof(IUserLoginService);

        private IUserLoginRepository _userLoginRepository;

        public UserLoginService(IUserLoginRepository userLoginRepository)
        {
            this._userLoginRepository = userLoginRepository;
        }

        public ResponseBase<User> CheckUserCredentials(string email, string password)
        {
            ResponseBase<User> result = new ResponseBase<User>();
            try
            {
                result.Data = _userLoginRepository.GetUserByEmailAndPassword(email, password);

                if (result.Data == null)
                {
                    result.Success = false;
                    result.Message = "Usuario nao Encontrado. Favor realizar o cadastro";
                }
            } 
            catch(Exception ex)
            {
                result.Success = false;
                result.Message = ex.Message;
            }

            return result;
        }
    }
}
