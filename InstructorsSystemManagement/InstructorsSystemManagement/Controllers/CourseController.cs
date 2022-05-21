using InstructorsSystemManagement.DataAccess.Repository.IRepository;
using InstructorsSystemManagement.Extentiions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;
using static InstructorsSystemManagement.Dtos;

namespace InstructorsSystemManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        private readonly ICourseRepository _courseRepository;
        public CourseController(ICourseRepository courseRepository)
        {
            _courseRepository = courseRepository;
        }

        [HttpGet]
        public IEnumerable<Course> GetAll()
        {
            return _courseRepository.GetAll();
        }

        [HttpPost]
        public IActionResult Create(CreatedCourseDto courseDto)
        {
            var course = courseDto.AsCourse();
            var instructors = courseDto.instructors;

            _courseRepository.Add(course);
            _courseRepository.AttachInstructor(instructors, course);

            return CreatedAtAction(nameof(GetCourse), new { id = course.Id }, course);
        }

        [HttpGet("{id}")]
        public ActionResult<Course> GetCourse(Guid id)
        {
            var course = _courseRepository.Get(id);

            if (course == null)
                return NotFound();

            return course;
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            var course = _courseRepository.Get(id);

            if (course == null)
                return NotFound();

            _courseRepository.Remove(course);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Update(Guid id, UpdatedCourseDto courseDto)
        {
            var course = _courseRepository.Get(id);

            if (course == null)
                return NotFound();


            _courseRepository.Update(courseDto.AsCourse(id));
            return NoContent();
        }
    }
}

