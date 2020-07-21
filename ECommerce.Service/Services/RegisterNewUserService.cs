using ECommerce.Model.Domain.User;
using ECommerce.Model.Repository;
using ECommerce.Service.DTOs;
using ECommerce.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Net.Security;
using System.Security.Cryptography;
using System.Text;

namespace ECommerce.Service.Services
{
    public class RegisterNewUserService: ServiceBase, IRegisterNewUserService
    {
        protected override Type ConcreteType => typeof(IRegisterNewUserService);

        private IRegisterNewUserRepository _registerNewUserRepository;

        public RegisterNewUserService(IRegisterNewUserRepository registerNewUserRepository)
        {
            this._registerNewUserRepository = registerNewUserRepository;
        }

        public ResponseBase<User> InsertNewUser(string name, string email, string password)
        {
            ResponseBase<User> response = new ResponseBase<User>();

            try
            {
                _registerNewUserRepository.Insert(new User { 
                CUserName = name,
                CEmail = email,
                CPassword = password,
                lEnabled = 1
                });

                if (!response.Success)
                {
                    response.Success = false;
                    response.Message = "Falha ao Inserir Usuario";
                }
            }
            catch(Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message;
            }
            return response;
        }
    }
}
