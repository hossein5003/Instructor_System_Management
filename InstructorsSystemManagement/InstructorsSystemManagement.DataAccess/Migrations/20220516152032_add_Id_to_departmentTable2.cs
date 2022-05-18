using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InstructorsSystemManagement.DataAccess.Migrations
{
    public partial class add_Id_to_departmentTable2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DeptName",
                table: "Departments",
                newName: "Name");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Departments",
                newName: "DeptName");
        }
    }
}
