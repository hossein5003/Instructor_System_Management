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
            _departmentRepository.Add(department);

            return CreatedAtAction(nameof(GetDepartment), new { id = department.Id }, department);
        }

        [HttpGet]
        public ActionResult<Department> GetDepartment(Guid id)
        {
            var department = _departmentRepository.Get(id);

            if (department == null)
                return NotFound();

            return department;
        }

        [HttpDelete]
        public IActionResult Delete(Guid id)
        {
            var department = _departmentRepository.Get(id);

            if (department == null)
                return NotFound();

            _departmentRepository.Remove(department);
            return NoContent();
        }

        [HttpPut]
        public IActionResult Update(Guid id, UpdatedDepartmentDto departmentDto)
        {
            var department = _departmentRepository.Get(id);

            if (department == null)
                return NotFound();


            _departmentRepository.Update(departmentDto.AsDepartment(id));
            return NoContent();
        }
    }
}
