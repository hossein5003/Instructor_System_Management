using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InstructorsSystemManagement.DataAccess.Repository.IRepository
{
    public interface IInstructorRepository : IRepository<Instructor>
    {
        Instructor Get(Guid id);
        void AttachCourse(IList<Course> courses,Instructor instructor);
        void Update(Instructor instructor);
    }
}
