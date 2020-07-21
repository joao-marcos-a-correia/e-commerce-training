using ECommerce.Model.Repository;
using ECommerce.Repository.EF.DBContext;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ECommerce.Repository.EF.Repositories
{
    public class BaseRepository : IBaseRepository
    {
        protected DbContextCommerce _dbContext;

        public BaseRepository(DbContextCommerce dbContext)
        {
            _dbContext = dbContext;
        }

        public virtual void SaveChanges()
        {
            _dbContext.SaveChanges();
        }

        public virtual void Reset()
        {
            try
            {
                var entries = _dbContext.ChangeTracker.Entries().Where(e => e.State != EntityState.Unchanged).ToArray();
                foreach (var entry in entries)
                {
                    switch (entry.State)
                    {
                        case EntityState.Modified:
                            entry.State = EntityState.Unchanged;
                            break;
                        case EntityState.Added:
                            entry.State = EntityState.Detached;
                            break;
                        case EntityState.Deleted:
                            entry.Reload();
                            break;
                    }
                }
            }
            catch { }
        }
    }
}

