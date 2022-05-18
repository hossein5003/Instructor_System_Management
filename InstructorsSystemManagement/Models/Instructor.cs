using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class Instructor
    {
        public Guid Id { get; set; }
        [Required]
        public string Name { get; set; }

        public IList<Course>? Courses { get; set; }
        
        public string DeptName { get; set; }
        [ForeignKey("DeptName")]
        public Department Department { get; set; }
    }
}
