using Models;
using System.ComponentModel.DataAnnotations;

namespace InstructorsSystemManagement
{
    public class Dtos
    {
        public record UpdatedInstructorDto([Required] string Name, [Required] string DeptName, IList<Course> courses,[Required] int Age);

        public record CreatedInstructorDto([Required] string Name,[Required] string DeptName , IList<Course> courses , [Required] int Age);


        public record UpdatedCourseDto([Required] string Title, [Required] int Credits, IList<Instructor> instructors, [Required] string DeptName);

        public record CreatedCourseDto([Required] string Title, [Required] int Credits, IList<Instructor> instructors, [Required] string DeptName);


        public record UpdatedDepartmentDto([Required] string Name, [Required] string building);

        public record CreatedDepartmentDto([Required] string Name, [Required] string building);

        public record UserDto([Required] string Name, [Required] string password,[Required] string email);

        public record LoginDto([Required] string Name, [Required] string password);
    }
}
