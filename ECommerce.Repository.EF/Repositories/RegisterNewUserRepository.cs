using AutoMapper;
using ECommerce.Model.Domain.User;
using ECommerce.Model.Repository;
using ECommerce.Repository.EF.DBContext;
using System;
using System.Collections.Generic;
using System.Text;

namespace ECommerce.Repository.EF.Repositories
{
    public class RegisterNewUserRepository : BaseRepository, IRegisterNewUserRepository
    {
        public RegisterNewUserRepository(DbContextCommerce dBContext) : base(dBContext) {}

        public void Insert(User entity)
        {
            _dbContext.TbUser.Add(this.buildDBEntity(entity));
            _dbContext.SaveChanges();
        }

        private TbUser buildDBEntity(User entity)
        {
            TbUser value = Mapper.Map<TbUser>(entity);
            return value;
        }

        #region Not Implemented Methods
        public User Get(IDictionary<string, object> keys)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<User> List(IDictionary<string, object> keys)
        {
            throw new NotImplementedException();
        }

        public void Update(User entity)
        {
            throw new NotImplementedException();
        }
        #endregion
    }
}
