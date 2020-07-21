using ECommerce.Model.Repository;
using ECommerce.Repository.EF.Repositories;
using ECommerce.Service.Interfaces;
using ECommerce.Service.Services;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerce.WEB
{
    public static class Register
    {
        public static void RegisterDependencies(IServiceCollection services)
        {
            //Interfaces
            services.AddTransient<IUserLoginRepository, UserLoginRepository>();
            services.AddTransient<IRegisterNewUserRepository, RegisterNewUserRepository>();
            services.AddTransient<ICustomerRepository, CustomerRepository>();

            //Services
            services.AddTransient<IUserLoginService, UserLoginService>();
            services.AddTransient<IRegisterNewUserService, RegisterNewUserService>();
            services.AddTransient<ICustomerService, CustomerService>();
        }
    }
}
