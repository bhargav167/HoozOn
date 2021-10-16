using Microsoft.EntityFrameworkCore.Migrations;

namespace HoozOn.Migrations
{
    public partial class messageknownfor : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "RecipientUsername",
                table: "Message",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SenderUsername",
                table: "Message",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RecipientUsername",
                table: "Message");

            migrationBuilder.DropColumn(
                name: "SenderUsername",
                table: "Message");
        }
    }
}
