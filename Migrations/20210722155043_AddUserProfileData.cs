using Microsoft.EntityFrameworkCore.Migrations;

namespace HoozOn.Migrations
{
    public partial class AddUserProfileData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_RolesIdentity_RoleId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_RoleId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "RoleId",
                table: "Users");

            migrationBuilder.AddColumn<int>(
                name: "SocialAuthenticationId",
                table: "Users",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "SocialAuthentication",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_SocialAuthenticationId",
                table: "Users",
                column: "SocialAuthenticationId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_SocialAuthentication_SocialAuthenticationId",
                table: "Users",
                column: "SocialAuthenticationId",
                principalTable: "SocialAuthentication",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_SocialAuthentication_SocialAuthenticationId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_SocialAuthenticationId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "SocialAuthenticationId",
                table: "Users");

            migrationBuilder.AddColumn<int>(
                name: "RoleId",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "SocialAuthentication",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.CreateIndex(
                name: "IX_Users_RoleId",
                table: "Users",
                column: "RoleId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_RolesIdentity_RoleId",
                table: "Users",
                column: "RoleId",
                principalTable: "RolesIdentity",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
