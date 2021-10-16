using Microsoft.EntityFrameworkCore.Migrations;

namespace HoozOn.Migrations
{
    public partial class MessagedUsers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MessagedUser",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SenderId = table.Column<int>(nullable: false),
                    RecipientId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MessagedUser", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MessagedUser_SocialAuthentication_RecipientId",
                        column: x => x.RecipientId,
                        principalTable: "SocialAuthentication",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MessagedUser_SocialAuthentication_SenderId",
                        column: x => x.SenderId,
                        principalTable: "SocialAuthentication",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_MessagedUser_RecipientId",
                table: "MessagedUser",
                column: "RecipientId");

            migrationBuilder.CreateIndex(
                name: "IX_MessagedUser_SenderId",
                table: "MessagedUser",
                column: "SenderId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MessagedUser");
        }
    }
}
