using Microsoft.EntityFrameworkCore.Migrations;

namespace HoozOn.Migrations
{
    public partial class njkf : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Country",
                table: "SocialAuthentication",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Pincode",
                table: "SocialAuthentication",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "State",
                table: "SocialAuthentication",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Country",
                table: "SocialAuthentication");

            migrationBuilder.DropColumn(
                name: "Pincode",
                table: "SocialAuthentication");

            migrationBuilder.DropColumn(
                name: "State",
                table: "SocialAuthentication");
        }
    }
}
