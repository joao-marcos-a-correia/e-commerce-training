using AutoMapper;
using ECommerce.Model.Domain;
using ECommerce.Model.Domain.User;
using ECommerce.Model.Repository;
using ECommerce.Repository.EF.DBContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ECommerce.Repository.EF.Repositories
{
    public class UserLoginRepository : BaseRepository, IUserLoginRepository
    {
        public UserLoginRepository(DbContextCommerce dBContext) : base(dBContext) { }

        public User GetUserByEmailAndPassword(string email, string password)
        {
            return _dbContext.TbUser
                .Where(a => a.CEmail == email && a.CPassWord == password && a.LEnabled == 1)
                .Select(b => Mapper.Map<User>(b))
                .FirstOrDefault();
        }

        #region Not implemented methods
        public DBContext.TbUser Get(IDictionary<string, object> keys)
        {
            throw new NotImplementedException();
        }

        public void Insert(DBContext.TbUser entity)
        {
            throw new NotImplementedException();
        }

        public void Insert(Model.Domain.User.User entity)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<DBContext.TbUser> List(IDictionary<string, object> keys)
        {
            throw new NotImplementedException();
        }

        public void Update(DBContext.TbUser entity)
        {
            throw new NotImplementedException();
        }

        public void Update(Model.Domain.User.User entity)
        {
            throw new NotImplementedException();
        }

        Model.Domain.User.User IReadOnlyRepository<Model.Domain.User.User>.Get(IDictionary<string, object> keys)
        {
            throw new NotImplementedException();
        }

        IEnumerable<Model.Domain.User.User> IReadOnlyRepository<Model.Domain.User.User>.List(IDictionary<string, object> keys)
        {
            throw new NotImplementedException();
        }
        #endregion
    }
}
