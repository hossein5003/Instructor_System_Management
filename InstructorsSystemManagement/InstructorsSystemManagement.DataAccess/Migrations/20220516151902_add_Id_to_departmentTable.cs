using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InstructorsSystemManagement.DataAccess.Migrations
{
    public partial class add_Id_to_departmentTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Departments",
                newName: "DeptName");

            migrationBuilder.AddColumn<Guid>(
                name: "Id",
                table: "Departments",
                type: "char(36)",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                collation: "ascii_general_ci");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Id",
                table: "Departments");

            migrationBuilder.RenameColumn(
                name: "DeptName",
                table: "Departments",
                newName: "Name");
        }
    }
}
