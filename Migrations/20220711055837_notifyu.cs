using Microsoft.EntityFrameworkCore.Migrations;

namespace HoozOn.Migrations
{
    public partial class notifyu : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "ActiveNotification",
                table: "JobUserChat",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ActiveNotification",
                table: "JobUserChat");
        }
    }
}
