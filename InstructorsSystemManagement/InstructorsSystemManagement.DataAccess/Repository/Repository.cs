using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace InstructorsSystemManagement.DataAccess.Repository
{
    public class Repository<T> : IRepository<T> where T : class
    {
        protected readonly ApplicationDbContext _context;
        internal DbSet<T> dbSet;

        public Repository(ApplicationDbContext context)
        {
            _context = context;
            dbSet = context.Set<T>();
        }

        public void Add(T entity)
        {
            dbSet.Add(entity);
            _context.SaveChanges();
        }

        public IEnumerable<T> GetAll(Expression<Func<T, bool>>? filter = null)
        {
            IQueryable<T> query = dbSet;

            if (filter != null)
                query = query.Where(filter);
                          
            return query.ToList();
        }

        public void Remove(string id)
        {
            T? entityToRemove = dbSet.Find(id);
            Remove(entityToRemove);
        }

        public void Remove(T? entity)
        {
            dbSet.Remove(entity);
            _context.SaveChanges();
        }
    }
}
