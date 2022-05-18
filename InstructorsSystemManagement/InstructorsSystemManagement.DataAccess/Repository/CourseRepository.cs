using InstructorsSystemManagement.DataAccess.Repository.IRepository;
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
