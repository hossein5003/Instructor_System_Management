using InstructorsSystemManagement.DataAccess.Repository.IRepository;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InstructorsSystemManagement.DataAccess.Repository
{
    public class UserRepository : Repository<User> , IUserRepository
    {
        private readonly ApplicationDbContext _db;

        public UserRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }

        public User GetByName(string name)
        {
            return _db.Users.Where(x => x.Name == name).FirstOrDefault();
        }

        public User Get(Guid id)
        {
            return _db.Users.Where(x => x.Id == id).FirstOrDefault();
        }
    }
}
