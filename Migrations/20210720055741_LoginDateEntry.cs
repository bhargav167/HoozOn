using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HoozOn.Migrations
{
    public partial class LoginDateEntry : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "LoginTime",
                table: "SocialAuthentication",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "SocialAuthentication",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Status_Message",
                table: "SocialAuthentication",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Success",
                table: "SocialAuthentication",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LoginTime",
                table: "SocialAuthentication");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "SocialAuthentication");

            migrationBuilder.DropColumn(
                name: "Status_Message",
                table: "SocialAuthentication");

            migrationBuilder.DropColumn(
                name: "Success",
                table: "SocialAuthentication");
        }
    }
}
