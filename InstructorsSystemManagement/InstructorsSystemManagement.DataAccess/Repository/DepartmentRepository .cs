using InstructorsSystemManagement.DataAccess.Repository.IRepository;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InstructorsSystemManagement.DataAccess.Repository
{
    public class DepartmentRepository :  Repository<Department> , IDepartmentRepository
    {
        private readonly ApplicationDbContext _db;

        public DepartmentRepository(ApplicationDbContext db) : base(db)
        {
            _db=db;
        }

        public Department Get(string name)
        {
            return _db.Departments.Where(x => x.Name == name).FirstOrDefault();
        }

        public void Update(Department department)

        {
            var departmentFromDb=_db.Departments.FirstOrDefault(d => d.Name == department.Name);

            departmentFromDb.Name = department.Name;
            departmentFromDb.Building = department.Building;
            
            _db.SaveChanges();
        }
    }
}
