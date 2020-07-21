using AutoMapper;
using ECommerce.Model.Domain.Customer;
using ECommerce.Model.Domain.User;
using ECommerce.Repository.EF.DBContext;
using System;
using System.Collections.Generic;
using System.Text;

namespace ECommerce.Repository.EF.Mappings
{
    public class MappingsProfile : Profile
    {
        public MappingsProfile()
        {
            CreateMap<TbUser, User>().ReverseMap();
            CreateMap<TbCustomer, Customer>().ReverseMap();
        }
    }
}
