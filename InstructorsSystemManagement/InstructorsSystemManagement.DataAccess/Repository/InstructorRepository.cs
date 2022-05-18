using InstructorsSystemManagement.DataAccess.Repository.IRepository;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InstructorsSystemManagement.DataAccess.Repository
{
    public class InstructorRepository :  Repository<Instructor> , IInstructorRepository
    {
        private readonly ApplicationDbContext _db;

        public InstructorRepository(ApplicationDbContext db) : base(db)
        {
            _db=db;
        }

        public void Update(Instructor instructor)
        {
            var instructionFromDb=_db.Instructors.FirstOrDefault(i => i.Id == instructor.Id);

            instructionFromDb.Name = instructor.Name;
            instructionFromDb.DeptName = instructor.DeptName;
            instructionFromDb.Courses= instructor.Courses;

            _db.SaveChanges();
        }
    }
}
