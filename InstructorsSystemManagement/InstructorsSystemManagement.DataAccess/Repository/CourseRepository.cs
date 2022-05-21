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
    public class CourseRepository :  Repository<Course> , ICourseRepository
    {
        private readonly ApplicationDbContext _db;

        public CourseRepository(ApplicationDbContext db) : base(db)
        {
            _db=db;
        }

        public void AttachInstructor(IList<Instructor> instructors, Course course)
        {
            _db.Courses.Add(course);
            _db.Courses.Attach(course);

            foreach (Instructor instructor in instructors)
            {
                _db.Instructors.Add(instructor);
                _db.Instructors.Attach(instructor);

                course.Instructors.Add(instructor);

            }

            _db.SaveChanges();
        }

        public Course Get(Guid id)
        {
            return _db.Courses.Where(x => x.Id == id).Include(x => x.Instructors)
                .Include(x => x.Department).FirstOrDefault();
        }

        public void Update(Course course)
        {
            var courseFromDb=_db.Courses.FirstOrDefault(c => c.Id == course.Id);

            courseFromDb.Title = course.Title;
            courseFromDb.Credits= course.Credits;
            courseFromDb.Instructors= course.Instructors;

            _db.SaveChanges();
        }
    }
}
