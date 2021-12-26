using Microsoft.EntityFrameworkCore.Migrations;

namespace HoozOn.Migrations
{
    public partial class City : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "City",
                table: "SocialAuthentication",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "City",
                table: "Jobs",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "City",
                table: "SocialAuthentication");

            migrationBuilder.DropColumn(
                name: "City",
                table: "Jobs");
        }
    }
}
