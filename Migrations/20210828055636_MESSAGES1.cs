using Microsoft.EntityFrameworkCore.Migrations;

namespace HoozOn.Migrations
{
    public partial class MESSAGES1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Message_Users_RecipientId",
                table: "Message");

            migrationBuilder.DropForeignKey(
                name: "FK_Message_Users_SenderId",
                table: "Message");

            migrationBuilder.AddForeignKey(
                name: "FK_Message_SocialAuthentication_RecipientId",
                table: "Message",
                column: "RecipientId",
                principalTable: "SocialAuthentication",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Message_SocialAuthentication_SenderId",
                table: "Message",
                column: "SenderId",
                principalTable: "SocialAuthentication",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Message_SocialAuthentication_RecipientId",
                table: "Message");

            migrationBuilder.DropForeignKey(
                name: "FK_Message_SocialAuthentication_SenderId",
                table: "Message");

            migrationBuilder.AddForeignKey(
                name: "FK_Message_Users_RecipientId",
                table: "Message",
                column: "RecipientId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Message_Users_SenderId",
                table: "Message",
                column: "SenderId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
