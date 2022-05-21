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
    public class DepartmentController : ControllerBase
    {
        private readonly IDepartmentRepository _departmentRepository;
        public DepartmentController(IDepartmentRepository departmentRepository)
        {
            _departmentRepository = departmentRepository;
        }

        [HttpGet]
        public IEnumerable<Department> GetAll()
        {
            return _departmentRepository.GetAll();
        }

        [HttpPost]
        public IActionResult Create(CreatedDepartmentDto departmentDto)
        {
            var department = departmentDto.AsDepartment();

            if (_departmentRepository.Get(department.Name) != null)
                return BadRequest();

            _departmentRepository.Add(department);

            return CreatedAtAction(nameof(GetDepartment),new {id=department.Name}, department);
        }

        [HttpGet("{id}")]
        public ActionResult<Department> GetDepartment(string name)
        {
            var department = _departmentRepository.Get(name);

            if (department == null)
                return NotFound();

            return department;
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string name)
        {
            var department = _departmentRepository.Get(name);

            if (department == null)
                return NotFound();

            _departmentRepository.Remove(department);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Update(string name, UpdatedDepartmentDto departmentDto)
        {
            var department = _departmentRepository.Get(name);

            if (department == null)
                return NotFound();


            _departmentRepository.Update(departmentDto.AsDepartment());
            return NoContent();
        }
    }
}
