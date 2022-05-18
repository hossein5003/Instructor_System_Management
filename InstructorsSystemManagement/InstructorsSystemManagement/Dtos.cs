using Models;
using System.ComponentModel.DataAnnotations;

namespace InstructorsSystemManagement
{
    public class Dtos
    {
        public record UpdatedInstructorDto([Required] string Name, [Required] string DeptName, IList<Course> courses = null);

        public record CreatedInstructorDto([Required] string Name,[Required] string DeptName , IList<Course> courses=null );


        public record UpdatedCourseDto([Required] string Title, [Required] int Credits, IList<Course> instructors = null);

        public record CreatedCourseDto([Required] string Title, [Required] int Credits, IList<Course> instructors = null);


        public record UpdatedDepartmentDto([Required] string Name, [Required] string building);

        public record CreatedDepartmentDto([Required] string Name, [Required] string building);
    }
}
