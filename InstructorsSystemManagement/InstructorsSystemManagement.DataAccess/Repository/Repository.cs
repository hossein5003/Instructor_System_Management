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
        protected readonly DbContext Context;
        internal DbSet<T> dbSet;

        public Repository(DbContext context)
        {
            Context = context;
            this.dbSet = context.Set<T>();
        }

        public void Add(T entity)
        {
            dbSet.Add(entity);
        }

        public T Get(Guid id)
        {
            return dbSet.Find(id);
        }

        public IEnumerable<T> GetAll(Expression<Func<T, bool>> filter = null, string inculdeProperties = null)
        {
            IQueryable<T> query = dbSet;

            if (filter != null)
                query = query.Where(filter);
            

            if (inculdeProperties != null)
               foreach (var includePeroperty in inculdeProperties.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))             
                    query = query.Include(includePeroperty);
                
            return query.ToList();
        }

        public void Remove(Guid id)
        {
            T entityToRemove = dbSet.Find(id);
            Remove(entityToRemove);
        }

        public void Remove(T entity)
        {
            dbSet.Remove(entity);
        }
    }
}
