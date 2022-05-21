using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace InstructorsSystemManagement.DataAccess.Repository.IRepository
{
    public interface ICourseRepository : IRepository<Course>
    {
        Course Get(Guid id);
        void AttachInstructor(IList<Instructor> instructors, Course course);
        void Update(Course course);
    }
}
