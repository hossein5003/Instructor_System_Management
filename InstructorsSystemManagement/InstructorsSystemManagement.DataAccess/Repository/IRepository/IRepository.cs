using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace InstructorsSystemManagement.DataAccess.Repository
{
    public interface IRepository<T> where T : class
    {
        IEnumerable<T> GetAll(Expression<Func<T, bool>>? filter=null);
        void Add(T entity);
        void Remove(string id); 
        void Remove(T entity);
    }
}
