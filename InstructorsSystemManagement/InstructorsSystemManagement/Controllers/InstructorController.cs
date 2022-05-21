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
    public class InstructorController : ControllerBase
    {
        private readonly IInstructorRepository _instructorRepository;
        public InstructorController(IInstructorRepository instructorRepository)
        {
            _instructorRepository = instructorRepository;
        }

        [HttpGet]
        public IEnumerable<Instructor> GetAll()
        {
            var x = _instructorRepository.GetAll();
            return x;
        }

        [HttpPost]
        public IActionResult Create(CreatedInstructorDto instructorDto)
        {
            var instructor = instructorDto.AsInstructor();
            var courses = instructorDto.courses;
            
            _instructorRepository.Add(instructor);
            _instructorRepository.AttachCourse(courses, instructor);

            return CreatedAtAction(nameof(GetInstructor), new { id = instructor.Id }, instructor);
        }

        [HttpGet("{id}")]
        public ActionResult<Instructor> GetInstructor(Guid id)
        {
            var instructor= _instructorRepository.Get(id);

            if (instructor == null)
                return NotFound();

            return instructor;
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            var instructor = _instructorRepository.Get(id);

            if (instructor == null)
                return NotFound();

            _instructorRepository.Remove(instructor);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Update(Guid id , UpdatedInstructorDto instructorDto)
        {
            var instructor = _instructorRepository.Get(id);

            if (instructor == null)
                return NotFound();

            
            _instructorRepository.Update(instructorDto.AsInstructor(id));
            return NoContent();
        }
    }
}
