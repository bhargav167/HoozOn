using Microsoft.EntityFrameworkCore.Migrations;

namespace HoozOn.Migrations
{
    public partial class fbgf : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AboutUs",
                table: "SocialAuthentication",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Latitude",
                table: "SocialAuthentication",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Longitude",
                table: "SocialAuthentication",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MobileNumber",
                table: "SocialAuthentication",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "SocialAuthentication",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserAddress",
                table: "SocialAuthentication",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "WebSiteUrl",
                table: "SocialAuthentication",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AboutUs",
                table: "SocialAuthentication");

            migrationBuilder.DropColumn(
                name: "Latitude",
                table: "SocialAuthentication");

            migrationBuilder.DropColumn(
                name: "Longitude",
                table: "SocialAuthentication");

            migrationBuilder.DropColumn(
                name: "MobileNumber",
                table: "SocialAuthentication");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "SocialAuthentication");

            migrationBuilder.DropColumn(
                name: "UserAddress",
                table: "SocialAuthentication");

            migrationBuilder.DropColumn(
                name: "WebSiteUrl",
                table: "SocialAuthentication");
        }
    }
}
