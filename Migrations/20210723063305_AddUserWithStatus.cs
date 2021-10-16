using Microsoft.EntityFrameworkCore.Migrations;

namespace HoozOn.Migrations
{
    public partial class AddUserWithStatus : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Status_Message",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Success",
                table: "Users",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Status_Message",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Success",
                table: "Users");
        }
    }
}
