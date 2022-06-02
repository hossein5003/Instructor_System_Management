using InstructorsSystemManagement.DataAccess.Repository.IRepository;
using Microsoft.EntityFrameworkCore;
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

        public void AttachCourse(IList<Course> courses,Instructor instructor)
        {
            
            _db.Instructors.Add(instructor);
            _db.Instructors.Attach(instructor);

            foreach (Course course in courses)
            {
                _db.Courses.Add(course);
                _db.Courses.Attach(course);

                instructor.Courses.Add(course);

            }

            _db.SaveChanges();
        }

        public Instructor? Get(Guid id)
        {
            var instructor= _db.Instructors.Where(x => x.Id == id).Include(x => x.Courses).Include(x => x.Department).FirstOrDefault();
            _db.Entry(instructor).State = EntityState.Detached;

            return instructor;
        }

        public void Update(Instructor instructor)
        {
            var instructionFromDb=_db.Instructors.Include(x=>x.Courses).FirstOrDefault(i => i.Id == instructor.Id);

            instructionFromDb.Name = instructor.Name;
            instructionFromDb.DeptName = instructor.DeptName;
            instructionFromDb.Courses.Clear();

            _db.SaveChanges();
        }
    }
}
