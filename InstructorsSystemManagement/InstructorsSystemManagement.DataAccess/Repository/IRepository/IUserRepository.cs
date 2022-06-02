using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InstructorsSystemManagement.DataAccess.Repository.IRepository
{
    public interface IUserRepository:IRepository<User>
    {
        User GetByName(string username);
    }
}
